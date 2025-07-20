import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | null = null;
  edit: string|any[]|null|undefined;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
     this.route.params.subscribe((params: Params) => {
      const contactId = params['id'];
      console.log('Contact Detail - Looking for contact with ID:', contactId);
      this.contact = this.contactService.getContact(contactId) ?? null;
      console.log('Contact Detail - Found contact:', this.contact);
    });
  }

  onDelete() {
    if (this.contact) {
      this.contactService.deleteContact(this.contact);

      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
