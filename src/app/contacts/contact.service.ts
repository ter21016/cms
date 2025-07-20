import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private contactsUrl = 'http://localhost:3000/contacts';
  private contacts: Contact[] = [];

  constructor(private http: HttpClient) {}

  //#region "CRUD"
  getContacts() {
    this.http
      .get<{ message: string; contacts: Contact[] }>(this.contactsUrl)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.contacts = res.contacts;
          this.sortAndSend();
        },
        error: (err) => {
          console.error('Error getting contacts:', err);
          console.error('Error details:', err?.error || err);
        },
      });
  }

  addContact(newContact: Contact) {
    if (!newContact || !newContact.name) {
      console.error('Missing required fields');
      return;
    }

    this.http
      .post<{ message: string; contact: Contact }>(
        this.contactsUrl,
        {
          name: newContact.name,
          email: newContact.email,
          phone: newContact.phone,
          imageUrl: newContact.imageUrl,
          group: newContact.group,
        }, // don't send 'id'
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.contacts.push(res.contact);
          this.sortAndSend();
        },
        error: (err) => {
          console.error('Error adding contact:', err);
          console.error('Error details:', err?.error || err);
        },
      });
  }

  updateContact(original: Contact, newContact: Contact) {
    if (!newContact || !original) return;
    const pos = this.contacts.indexOf(original);
    if (pos < 0) return;

    newContact.id = original.id;
    this.http
      .put<{ message: string }>(`${this.contactsUrl}/${original.id}`, newContact, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.contacts[pos] = newContact;
          this.sortAndSend();
        },
        error: (err) => {
          console.error('Error updating contact:', err);
          console.error('Error details:', err?.error || err);
        },
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.http
      .delete<{ message: string }>(`${this.contactsUrl}/${contact.id}`)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        },
        error: (err) => {
          console.error('Error deleting contact:', err);
          console.error('Error details:', err?.error || err);
        },
      });
  }
  //#endregion "CRUD"

  //#region "Helpers"
  getContact(id: string): Contact | undefined {
    return this.contacts.find((c) => c.id === id);
  }

  sortAndSend() {
    this.contacts.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice());
  }
  //#endregion "Helpers"
}

