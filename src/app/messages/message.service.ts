import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();

  private messagesUrl = 'http://localhost:3000/messages';
  private messages: Message[] = [];

  constructor(private http: HttpClient) {}

  //#region "CRUD"
  getMessages() {
    this.http
      .get<{ message: string; messageObjs: Message[] }>(this.messagesUrl)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.messages = res.messageObjs;
          this.sortAndSend();
        },
        error: (err) => {
          console.error('Error getting messages:', err);
          console.error('Error details:', err?.error || err);
        },
      });
  }

  addMessage(newMessage: Message) {
    if (!newMessage || !newMessage.subject || !newMessage.msgText) {
      console.error('Missing required fields');
      return;
    }

    this.http
      .post<{ message: string; messageObj: Message }>(
        this.messagesUrl,
        {
          subject: newMessage.subject,
          msgText: newMessage.msgText,
          sender: newMessage.sender,
        }, // don't send 'id'
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.messages.push(res.messageObj);
          this.sortAndSend();
        },
        error: (err) => {
          console.error('Error adding message:', err);
          console.error('Error details:', err?.error || err);
        },
      });
  }

  updateMessage(original: Message, newMessage: Message) {
    if (!newMessage || !original) return;
    const pos = this.messages.indexOf(original);
    if (pos < 0) return;

    newMessage.id = original.id;
    this.http
      .put<{ message: string }>(`${this.messagesUrl}/${original.id}`, newMessage, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.messages[pos] = newMessage;
          this.sortAndSend();
        },
        error: (err) => {
          console.error('Error updating message:', err);
          console.error('Error details:', err?.error || err);
        },
      });
  }

  deleteMessage(message: Message) {
    if (!message) return;
    const pos = this.messages.indexOf(message);
    if (pos < 0) return;
    this.http
      .delete<{ message: string }>(`${this.messagesUrl}/${message.id}`)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.messages.splice(pos, 1);
          this.sortAndSend();
        },
        error: (err) => {
          console.error('Error deleting message:', err);
          console.error('Error details:', err?.error || err);
        },
      });
  }

  getMessage(id: string): Message | undefined {
    return this.messages.find((m) => m.id === id);
  }
  //#endregion "CRUD"

  //#region "Helpers"
  sortAndSend() {
    this.messages.sort((a, b) => {
      if (a.subject < b.subject) return -1;
      if (a.subject > b.subject) return 1;
      return 0;
    });
    this.messageChangedEvent.next(this.messages.slice());
  }
  //#endregion "Helpers"
}
