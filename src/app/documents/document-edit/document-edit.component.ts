import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.originalDocument = this.documentService.getDocument(params['id']);
      } else {
        this.originalDocument = null;
      }
      if (this.originalDocument) {
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      } else {
        this.editMode = false;
        this.document = new Document("", "", "", "");
      }
    });
  }

  onSubmit(form: NgForm) {
     const value = form.value;
    let doc = new Document(
      "0",
      value.name,
      value.description,
      value.url
    );
    if(this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument!, doc);
    } else {
      this.documentService.addDocument(doc);
    };
    this.editMode = false;
    this.router.navigate(['/documents']);
  }

  onCancel(): void {
    this.router.navigate(['/documents']);
  }

}
