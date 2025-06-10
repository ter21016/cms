import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})

export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document: Document | undefined;



  constructor(
    private docService: DocumentService,
    private windRef: WindRefService,
    private router: Router,
    private route: ActivatedRoute) {

    }

  ngOnInit(): void {



    this.route.params.subscribe((params: Params) => {

      this.nativeWindow = this.windRef.getNativeWindow();
      let documentResult = this.docService.getDocument(params['id']);
      if (documentResult) {
        this.document = documentResult;
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

