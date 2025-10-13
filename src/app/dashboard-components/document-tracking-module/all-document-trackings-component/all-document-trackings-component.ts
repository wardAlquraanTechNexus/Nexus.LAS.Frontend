import { Component } from '@angular/core';
import { DocumentTrackingViewComponent } from '../_base/document-tracking-view-component/document-tracking-view-component';

@Component({
  selector: 'app-all-document-trackings-component',
  standalone: false,
  templateUrl: './all-document-trackings-component.html',
  styleUrls: ['./all-document-trackings-component.scss']
})
export class AllDocumentTrackingsComponent extends DocumentTrackingViewComponent {

}