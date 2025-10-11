import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentTrackingRoutingModule } from './document-tracking-routing-module';
import { AllDocumentTrackingsComponent } from './all-document-trackings-component/all-document-trackings-component';
import { AllDocumentTrackingTableComponent } from './all-document-trackings-component/all-document-tracking-table-component/all-document-tracking-table-component';
import { DocumentTrackingViewComponent } from './_base/document-tracking-view-component/document-tracking-view-component';
import { BaseDocumentTrackingsComponent } from './_base/base-document-trackings-component/base-document-trackings-component';


@NgModule({
  declarations: [
    BaseDocumentTrackingsComponent,
    AllDocumentTrackingsComponent,
    AllDocumentTrackingTableComponent,
    DocumentTrackingViewComponent,
  ],
  imports: [
    CommonModule,
    DocumentTrackingRoutingModule
  ]
})
export class DocumentTrackingModule { }
