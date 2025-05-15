import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Test 1', 'This is the first test.', 'Jessica Terry'),
    new Message('2', 'Test 2', 'This is the second test.', 'Anna Lee'),
    new Message('3', 'Test 3', 'This is the third test.', 'John Doe'),
  ];

  constructor() {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
