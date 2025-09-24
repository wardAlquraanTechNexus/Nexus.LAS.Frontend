import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyRoutingModule } from './property-routing-module';
import { BasePropertiesComponent } from './_base/base-properties-component/base-properties-component';
import { AllPropertiesComponent } from './all-properties-component/all-properties-component';
import { AllPropertiesTableComponent } from './all-properties-component/all-properties-table-component/all-properties-table-component';
import { ComponentsModule } from '../../components/components-module';
import { PropertyFormComponent } from './property-form-component/property-form-component';
import { PropertyDialogFormComponent } from './property-dialog-form-component/property-dialog-form-component';
import { PropertyViewComponent } from './_base/property-view-component/property-view-component';
import { PropertyOverviewComponent } from './property-details-components/property-overview-component/property-overview-component';
import { PropertyLinksComponent } from './property-details-components/property-links-component/property-links-component';
import { PropertyLinkFormComponent } from './property-details-components/property-links-component/property-link-form-component/property-link-form-component';
import { PropertyLinkDialogFormComponent } from './property-details-components/property-links-component/property-link-dialog-form-component/property-link-dialog-form-component';
import { PropertyOwnersComponent } from './property-details-components/property-owners-component/property-owners-component';
import { PropertyOwnerFormComponent } from './property-details-components/property-owners-component/property-owner-form-component/property-owner-form-component';
import { PropertyOwnerDialogFormComponent } from './property-details-components/property-owners-component/property-owner-dialog-form-component/property-owner-dialog-form-component';
import { PropertyDocumentsComponent } from './property-details-components/property-documents-component/property-documents-component';
import { PropertyDocumentDialogFormComponent } from './property-details-components/property-documents-component/property-document-dialog-form-component/property-document-dialog-form-component';
import { PropertyDocumentDialogViewComponent } from './property-details-components/property-documents-component/property-document-dialog-view-component/property-document-dialog-view-component';
import { PropertyDocumentFormComponent } from './property-details-components/property-documents-component/property-document-form-component/property-document-form-component';
import { ActivePropertiesComponent } from './active-properties-component/active-properties-component';
import { ActivePropertiesTableComponent } from './active-properties-component/active-properties-table-component/active-properties-table-component';
import { ActivePrivatePropertiesComponent } from './active-private-properties-component/active-private-properties-component';
import { ActivePrivatePropertiesTableComponent } from './active-private-properties-component/active-private-properties-table-component/active-private-properties-table-component';
import { ActivePublicPropertiesComponent } from './active-public-properties-component/active-public-properties-component';
import { ActivePublicPropertiesTableComponent } from './active-public-properties-component/active-public-properties-table-component/active-public-properties-table-component';



@NgModule({
  declarations: [
    BasePropertiesComponent,
    PropertyViewComponent,
    AllPropertiesComponent,
    AllPropertiesTableComponent,
    PropertyFormComponent,
    PropertyDialogFormComponent,
    PropertyOverviewComponent,
    PropertyLinksComponent,
    PropertyLinkDialogFormComponent,
    PropertyLinkFormComponent,
    PropertyOwnersComponent,
    PropertyOwnerFormComponent,
    PropertyOwnerDialogFormComponent,
    PropertyDocumentsComponent,
    PropertyDocumentDialogFormComponent,
    PropertyDocumentDialogViewComponent,
    PropertyDocumentFormComponent,
    ActivePropertiesComponent,
    ActivePropertiesTableComponent,
    ActivePrivatePropertiesComponent,
    ActivePrivatePropertiesTableComponent,
    ActivePublicPropertiesComponent,
    ActivePublicPropertiesTableComponent
  ],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    ComponentsModule
  ]
})
export class PropertyModule { }
