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
      this.contact = this.contactService.getContact(params['id']);
    });
  }

  onDelete() {
    if (this.contact) {
      this.contactService.deleteContact(this.contact);

      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
