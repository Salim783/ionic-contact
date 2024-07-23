import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { AddContactPage } from '../add-contact/add-contact.page';
import { addIcons } from 'ionicons';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';

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
  paletteToggle = false;

  constructor(
    private contactService: ContactService,
    private modalController: ModalController,
    private router: Router
  ) {
    addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline });
  }

  async ngOnInit() {
    await this.contactService.init();
    this.contacts = this.contactService.getContacts();
    this.filteredContacts = this.contacts;

    // Utiliser matchMedia pour vérifier la préférence de l'utilisateur
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialiser la palette sombre basée sur la valeur initiale
    // de la requête media prefers-color-scheme
    this.initializeDarkPalette(prefersDark.matches);

    // Écouter les changements de la requête media prefers-color-scheme
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  // Cocher/décocher le toggle et mettre à jour la palette basée sur isDark
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Écouter les changements du toggle pour basculer la palette sombre
  toggleChange(ev: CustomEvent) {
    this.toggleDarkPalette(ev.detail.checked);
  }

  // Ajouter ou supprimer la classe "ion-palette-dark" sur l'élément html
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
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
