import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-item',
  standalone: false,
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;

  constructor() {}

  ngOnInit(): void {}
}
