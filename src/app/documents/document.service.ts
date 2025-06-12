import {  EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  selectedDocumentEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject <Document[]>();

  private documents: Document[] = [];
  private maxDocumentId: number;


  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();

  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    return this.documents.find((d) => d.id === id) ?? null;
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((d) => {
      if (+d.id > maxId) maxId = +d.id;
    });
    return maxId;
  }

  addDocument(newDoc: Document) {
    if (!newDoc) return;
    this.maxDocumentId++;
    newDoc.id = `${this.maxDocumentId}`;
    this.documents.push(newDoc);
    this.documentListChangedEvent.next(this.documents.slice());

  }

  updateDocument(originalDoc: Document, newDoc: Document) {
    if (!originalDoc || !newDoc) return;
    const pos = this.documents.indexOf(originalDoc);
    if (pos < 0) return;
    newDoc.id = originalDoc.id;
    this.documents[pos] = newDoc;
    this.documentListChangedEvent.next(this.documents.slice());
  }
}

