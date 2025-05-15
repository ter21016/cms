import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter();

  documents = [
    new Document('1', 'Records and Reports', 'This is test 1.', 'https://www.churchofjesuschrist.org/study/manual/general-handbook/33-records-and-reports?lang=eng/1'),
    new Document('2', 'Priesthood Principles', 'This is test 2.', 'https://www.churchofjesuschrist.org/study/manual/general-handbook/3-priesthood-principles?lang=eng#p1/2'),
    new Document('3', 'Relief Society', 'This is test 3.', 'https://www.churchofjesuschrist.org/study/manual/general-handbook/9-relief-society?lang=eng#title_number2/3'),
    new Document('4', 'Test 4', 'This is test 4.', 'https://www.example.com/4'),
    new Document('5', 'Test 5', 'This is test 5.', 'https://www.example.com/5'),
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
