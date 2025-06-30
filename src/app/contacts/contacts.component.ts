import { Component, EventEmitter, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { ContactListComponent } from "./contact-list/contact-list.component";

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],

})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });

  }

}

