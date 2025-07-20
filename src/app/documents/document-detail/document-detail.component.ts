import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})

export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document: Document | null = null;



  constructor(
    private docService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private windRef: WindRefService) {

    }

  ngOnInit(): void {
    this.nativeWindow = this.windRef.getNativeWindow();



    this.route.params.subscribe((params: Params) => {

      const documentId = params['id'];
      const foundDocument = this.docService.getDocument(documentId);
      if (foundDocument) {
        this.document = foundDocument;
      }
    });
  }

  onView() {
    if (this.document && this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    if (this.document) {
      this.docService.deleteDocument(this.document);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

}
