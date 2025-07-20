import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor (private contactService: ContactService) {}
  // This component does not need to subscribe to any events or services

  ngOnInit(): void {
    // If sender is a string ID, look up the contact
    if (typeof this.message.sender === 'string') {
      const contact = this.contactService.getContact(this.message.sender);
      if (contact) {
        this.messageSender = contact.name;
      }
    }
  }

  getSenderName(): string {
    // If sender is populated as a Contact object
    if (typeof this.message.sender === 'object' && this.message.sender.name) {
      return (this.message.sender as Contact).name;
    }
    // If sender is a string ID and we looked up the name
    return this.messageSender || 'Unknown';
  }
}
