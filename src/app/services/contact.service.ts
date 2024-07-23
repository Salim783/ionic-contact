import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    const storedContacts = await this._storage.get('contacts');
    this.contacts = storedContacts || [];
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContact(id: number): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  async addContact(contact: Contact): Promise<void> {
    this.contacts.push(contact);
    await this._storage?.set('contacts', this.contacts);
  }

  async updateContact(contact: Contact): Promise<void> {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      this.contacts[index] = contact;
      await this._storage?.set('contacts', this.contacts);
    }
  }

  async deleteContact(id: number): Promise<void> {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    await this._storage?.set('contacts', this.contacts);
  }
}
