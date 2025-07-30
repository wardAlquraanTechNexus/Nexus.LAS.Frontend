import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponentRoutingModule } from './dashboard-component-routing-module';
import { ComponentsModule } from '../components/components-module';
import { AllPersons } from './person-components/all-persons/all-persons';
import { ActivePersons } from './person-components/active-persons/active-persons';
import { AddPerson } from './person-components/add-person/add-person';
import { PersonAddressDetails } from './person-components/shared-person-components/person-address-details/person-address-details';
import { PersonEmailDetails } from './person-components/shared-person-components/person-email-details/person-email-details';
import { PersonPhoneDetails } from './person-components/shared-person-components/person-phone-details/person-phone-details';
import { EditPerson } from './person-components/edit-person/edit-person';
import { PersonDetailsForm } from './person-components/shared-person-components/person-details-form/person-details-form';
import { PersonIdDocumentsTableForm } from './person-components/shared-person-documents-components/person-id-documents-table-form/person-Id-documents-table-form';
import { PersonOtherDocumentsTableForm } from './person-components/shared-person-documents-components/person-other-documents-table-form/person-other-documents-table-form';
import { PersonDocumentsGroup } from './person-components/shared-person-documents-components/person-documents-group/person-documents-group';
import { PersonDocumentFormDialouge } from './person-components/shared-person-documents-components/person-documents-group/person-document-form-dialouge/person-document-form-dialouge';
import { PersonIdDocumentForm } from './person-components/shared-person-documents-components/person-id-document-form/person-id-document-form';
import { PersonOtherDocumentForm } from './person-components/shared-person-documents-components/person-other-document-form/person-other-document-form';
import { PersonIdDetailView } from './person-components/person-id-detail-view/person-id-detail-view';
import { EditPersonIdDetailForm } from './person-components/person-id-detail-view/edit-person-id-detail-form/edit-person-id-detail-form';
import { PersonOtherDocumentView } from './person-components/person-other-document-view/person-other-document-view';
import { EditPersonOtherDocumentForm } from './person-components/person-other-document-view/edit-person-other-document-form/edit-person-other-document-form';
import { PersonView } from './person-components/person-view/person-view';


@NgModule({
  declarations: [
    AllPersons,
    PersonAddressDetails,
    PersonEmailDetails,
    PersonPhoneDetails,
    PersonDetailsForm,
    ActivePersons,
    AddPerson,
    EditPerson,
    PersonDocumentsGroup,
    PersonIdDocumentsTableForm,
    PersonOtherDocumentsTableForm,
    PersonDocumentFormDialouge,
    PersonIdDetailView,
    EditPersonIdDetailForm,
    PersonOtherDocumentView,
    EditPersonOtherDocumentForm,
    PersonView
  ],
  imports: [
    CommonModule,
    DashboardComponentRoutingModule,
    ComponentsModule,
    
]
})
export class DashboardComponentModule { }
