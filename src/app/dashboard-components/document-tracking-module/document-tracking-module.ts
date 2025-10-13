import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentTrackingRoutingModule } from './document-tracking-routing-module';
import { AllDocumentTrackingsComponent } from './all-document-trackings-component/all-document-trackings-component';
import { AllDocumentTrackingTableComponent } from './all-document-trackings-component/all-document-tracking-table-component/all-document-tracking-table-component';
import { DocumentTrackingViewComponent } from './_base/document-tracking-view-component/document-tracking-view-component';
import { BaseDocumentTrackingsComponent } from './_base/base-document-trackings-component/base-document-trackings-component';
import { DocumentTrackingFormComponent } from './document-tracking-form-component/document-tracking-form-component';
import { DocumentTrackingDialogFormComponent } from './document-tracking-dialog-form-component/document-tracking-dialog-form-component';
import { ComponentsModule } from '../../components/components-module';


@NgModule({
  declarations: [
    BaseDocumentTrackingsComponent,
    AllDocumentTrackingsComponent,
    AllDocumentTrackingTableComponent,
    DocumentTrackingViewComponent,
    DocumentTrackingFormComponent,
    DocumentTrackingDialogFormComponent
  ],
  imports: [
    CommonModule,
    DocumentTrackingRoutingModule,
    ComponentsModule
  ]
})
export class DocumentTrackingModule { }
