import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  selectedDocumentEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private documentsUrl = 'http://localhost:3000/documents';
  private documents: Document[] = [];

  constructor(private http: HttpClient) {}

  //#region "CRUD"
  getDocuments() {
    this.http
      .get<{ message: string; documents: Document[] }>(this.documentsUrl)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.documents = res.documents;
          this.sortAndSend();
        },
        error: (err) => {
          console.error('Error getting documents:', err);
          console.error('Error details:', err?.error || err);
        },
      });
  }

  addDocument(newDoc: Document) {
  if (!newDoc || !newDoc.name || !newDoc.url) {
    console.error('Missing required fields');
    return;
  }

  this.http
    .post<{ message: string; document: Document }>(
      this.documentsUrl,
      {
        name: newDoc.name,
        description: newDoc.description,
        url: newDoc.url,
      }, // don't send 'id'
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    )
    .subscribe({
      next: (res) => {
        console.log(res.message);
        this.documents.push(res.document);
        this.sortAndSend();
      },
      error: (err) => {
        console.error('Error adding document:', err);
        console.error('Error details:', err?.error || err);
      },
    });
}

  updateDocument(original: Document, newDoc: Document) {
    if (!newDoc || !original) return;
    const pos = this.documents.indexOf(original);
    if (pos < 0) return;

    newDoc.id = original.id;
    this.http
      .put<{ message: string }>(`${this.documentsUrl}/${original.id}`, newDoc, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.documents[pos] = newDoc;
          this.sortAndSend();
        },
        error: (err) => {
          console.error('Error updating document:', err);
          console.error('Error details:', err?.error || err);
        },
      });
  }

  deleteDocument(doc: Document) {
    if (!doc) return;
    const pos = this.documents.indexOf(doc);
    if (pos < 0) return;
    this.http
      .delete<{ message: string }>(`${this.documentsUrl}/${doc.id}`)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.documents.splice(pos, 1);
          this.sortAndSend();
        },
        error: (err) => {
          console.error('Error deleting document:', err);
          console.error('Error details:', err?.error || err);
        },
      });
  }
  //#endregion "CRUD"

  //#region "Helpers"
  getDocument(id: string): Document | undefined {
    return this.documents.find((d) => d.id === id);
  }

  sortAndSend() {
    this.documents.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice());
  }
  //#endregion "Helpers"
}
