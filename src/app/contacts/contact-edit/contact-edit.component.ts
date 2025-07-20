import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact | null = null;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  invalidGroupContactMessage: string = "";

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        const foundContact = this.contactService.getContact(id);
        this.originalContact = foundContact === undefined ? null : foundContact;
        if (!this.originalContact) {
          this.router.navigate(['/contacts']);
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        this.groupContacts = this.contact.group ?? [];
      } else {
        this.editMode = false;
        this.contact = new Contact('', '', '', '', []);
        this.contact.id = '';
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const value = form.value;

    const newContact = new Contact(
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );
    newContact.id = this.contact?.id ?? '0';

    if (this.editMode && this.originalContact) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  addToGroup(event: CdkDragDrop<Contact[]>) {
    const selectedContact = event.item.data as Contact;
    if (this.isInvalidContact(selectedContact)) {
      this.invalidGroupContactMessage = "This contact is already in the group or is the same contact.";
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContactMessage = "";
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) return true;
    if (this.contact && newContact.id === this.contact.id) return true;
    return this.groupContacts.some(c => c.id === newContact.id);
  }

  onRemoveItem(index: number) {
    if (index >= 0 && index < this.groupContacts.length) {
      this.groupContacts.splice(index, 1);
    }
  }
}
