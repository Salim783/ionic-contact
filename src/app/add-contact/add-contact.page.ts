import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage {
  contactForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {
    this.contactForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  addContact() {
    if (this.contactForm.valid) {
      const newContact: Contact = {
        id: new Date().getTime(),
        ...this.contactForm.value
      };
      this.contactService.addContact(newContact).then(() => {
        this.modalController.dismiss({ added: true });
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  get nom() {
    return this.contactForm.get('nom')!;
  }

  get prenom() {
    return this.contactForm.get('prenom')!;
  }

  get tel() {
    return this.contactForm.get('tel')!;
  }

  get email() {
    return this.contactForm.get('email')!;
  }
}
