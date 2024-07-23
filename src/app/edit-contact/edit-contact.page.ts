import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
  contactForm: FormGroup;
  contactId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  ngOnInit() {
    this.contactId = +this.route.snapshot.paramMap.get('id')!;
    const contact = this.contactService.getContact(this.contactId);
    if (contact) {
      this.contactForm.patchValue(contact);
    }
  }

  saveContact() {
    if (this.contactForm.valid) {
      const updatedContact: Contact = {
        id: this.contactId,
        ...this.contactForm.value
      };
      this.contactService.updateContact(updatedContact).then(() => {
        this.router.navigate(['/contacts']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/contacts']);
  }
}
