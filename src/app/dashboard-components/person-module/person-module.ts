import { CommonModule } from "@angular/common";
import { PersonRoutingModule } from "./person-module-routing";
import { ComponentsModule } from "../../components/components-module";
import { NgModule } from "@angular/core";
import { BasePersonsComponent } from "./_base/base-persons-component/base-persons-component";
import { ActivePersons } from "./active-persons/active-persons";
import { ActivePrivatePersons } from "./active-private-persons/active-private-persons";
import { ActivePublicPersons } from "./active-public-persons/active-public-persons";
import { AllPersons } from "./all-persons/all-persons";
import { EditPersonIdDetailForm } from "./person-id-detail-view/edit-person-id-detail-form/edit-person-id-detail-form";
import { EditPersonOtherDocumentForm } from "./person-other-document-view/edit-person-other-document-form/edit-person-other-document-form";
import { EditPersonOtherDocumentView } from "./person-other-document-view/edit-person-other-document-view/edit-person-other-document-view";
import { PersonOtherDocumentView } from "./person-other-document-view/person-other-document-view";
import { PersonViewComponent } from "./person-view-component/person-view-component";
import { PersonEmailDialogComponent } from "./shared-person-components/person-email-details/person-email-dialog-component/person-email-dialog-component";
import { PersonEmailFormComponent } from "./shared-person-components/person-email-details/person-email-form-component/person-email-form-component";
import { PersonPhoneDialogComponent } from "./shared-person-components/person-phone-details/person-phone-dialog-component/person-phone-dialog-component";
import { PersonOtherDocumentsTableComponent } from "./shared-person-documents-components/person-other-documents-table-component/person-other-documents-table-component";
import { AllPersonTable } from "./all-persons/all-person-table/all-person-table";
import { ActivePersonsTable } from "./active-persons/active-persons-table/active-persons-table";
import { ActivePrivatePersonsTable } from "./active-private-persons/active-private-persons-table/active-private-persons-table";
import { ActivePublicPersonsTable } from "./active-public-persons/active-public-persons-table/active-public-persons-table";
import { PersonIdDocumentsTableComponent } from "./shared-person-documents-components/person-id-documents-table-component/person-id-documents-table-component";
import { PersonIdDocumentFormDialogComponent } from "./shared-person-documents-components/person-id-documents-table-component/person-id-document-form-dialog-component/person-id-document-form-dialog-component";
import { PersonIdDocumentFormComponent } from "./shared-person-documents-components/person-id-documents-table-component/person-id-document-form-component/person-id-document-form-component";
import { PersonIdDocumentViewComponent } from "./shared-person-documents-components/person-id-documents-table-component/person-id-document-view-component/person-id-document-view-component";
import { PersonOtherDocumentFormComponent } from "./shared-person-documents-components/person-other-documents-table-component/person-other-document-form-component/person-other-document-form-component";
import { PersonOtherDocumentDialogFormComponent } from "./shared-person-documents-components/person-other-documents-table-component/person-other-document-dialog-form-component/person-other-document-dialog-form-component";
import { PersonOtherDocumentDialogViewComponent } from "./shared-person-documents-components/person-other-documents-table-component/person-other-document-dialog-view-component/person-other-document-dialog-view-component";
import { PersonOverviewComponent } from "./shared-person-components/person-overview-component/person-overview-component";
import { PersonInChargeComponent } from "./shared-person-components/person-in-charge-component/person-in-charge-component";
import { PersonBoardMembershipComponent } from "./shared-person-components/person-board-membership-component/person-board-membership-component";
import { PersonAccountSignatoryComponent } from "./shared-person-components/person-account-signatory-component/person-account-signatory-component";
import { PersonEmailComponent } from "./shared-person-components/person-email-details/person-email-component";
import { PersonPhoneFormComponent } from "./shared-person-components/person-phone-details/person-phone-form-component/person-phone-form-component";
import { PersonPhoneComponent } from "./shared-person-components/person-phone-details/person-phone-component";
import { PersonAddressDialogComponent } from "./shared-person-components/person-address-details/person-address-dialog-component/person-address-dialog-component";
import { PersonAddressFormComponent } from "./shared-person-components/person-address-details/person-address-form-component/person-address-form-component";
import { PersonAddressComponent } from "./shared-person-components/person-address-details/person-address-component";
import { PersonIdDetailViewComponent } from "./person-id-detail-view/person-id-detail-view-component";

@NgModule({
    declarations: [
        BasePersonsComponent,
        AllPersons,
        PersonAddressComponent,
        PersonEmailComponent,
        PersonPhoneComponent,
        ActivePersons,
        ActivePrivatePersons,
        ActivePublicPersons,
        PersonIdDocumentsTableComponent,
        PersonIdDocumentFormDialogComponent,
        PersonIdDocumentViewComponent,
        PersonIdDocumentFormComponent,
        PersonOtherDocumentsTableComponent,
        PersonIdDetailViewComponent,
        EditPersonIdDetailForm,
        PersonOtherDocumentView,
        EditPersonOtherDocumentForm,
        PersonViewComponent,
        EditPersonOtherDocumentView,
        PersonOtherDocumentFormComponent,
        PersonEmailDialogComponent,
        PersonEmailFormComponent,
        PersonPhoneFormComponent,
        PersonPhoneDialogComponent,
        PersonAddressFormComponent,
        PersonAddressDialogComponent,
        AllPersonTable,
        ActivePersonsTable,
        ActivePrivatePersonsTable,
        ActivePublicPersonsTable,
        PersonOtherDocumentDialogFormComponent,
        PersonOtherDocumentDialogViewComponent,
        PersonOverviewComponent,
        PersonInChargeComponent,
        PersonBoardMembershipComponent,
        PersonAccountSignatoryComponent
    ],
    imports: [
    CommonModule,
    PersonRoutingModule,
    ComponentsModule,
]
})
export class PersonModule { }