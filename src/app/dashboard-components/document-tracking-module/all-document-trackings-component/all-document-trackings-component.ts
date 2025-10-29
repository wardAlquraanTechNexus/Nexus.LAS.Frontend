import { Component } from '@angular/core';
import { DocumentTrackingViewComponent } from '../_base/document-tracking-view-component/document-tracking-view-component';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';
import { EntityIDc } from '../../../enums/entity-idc';

@Component({
  selector: 'app-all-document-trackings-component',
  standalone: false,
  templateUrl: './all-document-trackings-component.html',
  styleUrls: ['./all-document-trackings-component.scss']
})
export class AllDocumentTrackingsComponent extends BaseTableViewComponent {
  idc = EntityIDc.DocumentTracking;
}