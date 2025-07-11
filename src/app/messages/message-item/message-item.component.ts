import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';

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
    const contact = this.contactService.getContact(this.message.sender);
    if (contact) {
      this.messageSender = contact.name;
    }
  }
}
