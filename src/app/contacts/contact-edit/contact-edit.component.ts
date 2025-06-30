import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  groupContacts: any[] = [];

  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onRemoveItem(index: number) {}

  onCancel(): void {}
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}
