import { Contact } from '../contacts/contact.model';

export class Message {
  public id: string;
  constructor(
    public subject: string,
    public msgText: string,
    public sender: string | Contact
  ) {}
}
