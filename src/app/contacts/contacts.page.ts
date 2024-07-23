import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { AddContactPage } from '../add-contact/add-contact.page';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  visibleDetails: { [key: number]: boolean } = {};

  constructor(
    private contactService: ContactService,
    private modalController: ModalController,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.contactService.init();
    this.contacts = this.contactService.getContacts();
    this.filteredContacts = this.contacts;
  }

  async openAddContactModal() {
    const modal = await this.modalController.create({
      component: AddContactPage
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.added) {
        this.contacts = this.contactService.getContacts();
        this.filteredContacts = this.contacts;
      }
    });

    return await modal.present();
  }

  toggleDetails(contact: Contact) {
    this.visibleDetails[contact.id] = !this.visibleDetails[contact.id];
  }

  isDetailsVisible(contact: Contact): boolean {
    return this.visibleDetails[contact.id] || false;
  }

  viewDetails(contact: Contact) {
    this.toggleDetails(contact);
  }

  editContact(contact: Contact) {
    this.router.navigate(['/edit-contact', contact.id]);
  }

  saveSelectedContact(contact: Contact) {
    this.contactService.updateContact(contact).then(() => {
      this.contacts = this.contactService.getContacts();
      this.filteredContacts = this.contacts;
      this.visibleDetails[contact.id] = false;
    });
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).then(() => {
      this.contacts = this.contactService.getContacts();
      this.filteredContacts = this.contacts;
    });
  }

  filterContacts(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredContacts = this.contacts.filter(contact => {
      return (
        contact.nom.toLowerCase().includes(searchTerm) ||
        contact.prenom.toLowerCase().includes(searchTerm) ||
        contact.tel.includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm)
      );
    });
  }
}
