import { CommonModule } from "@angular/common";
import { PersonRoutingModule } from "./person-module-routing";
import { ComponentsModule } from "../../components/components-module";
import { NgModule } from "@angular/core";
import { BasePersonsComponent } from "./_base/base-persons-component/base-persons-component";
import { ActivePersons } from "./active-persons/active-persons";
import { ActivePrivatePersons } from "./active-private-persons/active-private-persons";
import { ActivePublicPersons } from "./active-public-persons/active-public-persons";
import { AllPersons } from "./all-persons/all-persons";
import { EditPerson } from "./edit-person/edit-person";
import { EditPersonIdDetailForm } from "./person-id-detail-view/edit-person-id-detail-form/edit-person-id-detail-form";
import { EditPersonIdDetailView } from "./person-id-detail-view/edit-person-id-detail-view/edit-person-id-detail-view";
import { PersonIdDetailView } from "./person-id-detail-view/person-id-detail-view";
import { EditPersonOtherDocumentForm } from "./person-other-document-view/edit-person-other-document-form/edit-person-other-document-form";
import { EditPersonOtherDocumentView } from "./person-other-document-view/edit-person-other-document-view/edit-person-other-document-view";
import { PersonOtherDocumentView } from "./person-other-document-view/person-other-document-view";
import { PersonView } from "./person-view/person-view";
import { PersonAddressDetails } from "./shared-person-components/person-address-details/person-address-details";
import { PersonAddressDialog } from "./shared-person-components/person-address-details/person-address-dialog/person-address-dialog";
import { PersonAddressForm } from "./shared-person-components/person-address-details/person-address-form/person-address-form";
import { PersonEmailDetails } from "./shared-person-components/person-email-details/person-email-details";
import { PersonEmailDialog } from "./shared-person-components/person-email-details/person-email-dialog/person-email-dialog";
import { PersonEmailForm } from "./shared-person-components/person-email-details/person-email-form/person-email-form";
import { PersonPhoneDetails } from "./shared-person-components/person-phone-details/person-phone-details";
import { PersonPhoneDialog } from "./shared-person-components/person-phone-details/person-phone-dialog/person-phone-dialog";
import { PersonPhoneForm } from "./shared-person-components/person-phone-details/person-phone-form/person-phone-form";
import { PersonDocumentFormDialog } from "./shared-person-documents-components/person-documents-group/person-document-form-dialog/person-document-form-dialog";
import { PersonDocumentsGroup } from "./shared-person-documents-components/person-documents-group/person-documents-group";
import { PersonOtherDocumentsTableComponent } from "./shared-person-documents-components/person-other-documents-table-component/person-other-documents-table-component";
import { SharedRegisterNoteTable } from "../shared-components/shared-register-note/shared-register-note-table/shared-register-note-table";
import { SharedRegisterNoteForm } from "../shared-components/shared-register-note/shared-register-note-form/shared-register-note-form";
import { SharedRegisterNoteFormDialog } from "../shared-components/shared-register-note/shared-register-note-form-dialog/shared-register-note-form-dialog";
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

@NgModule({
    declarations: [
        BasePersonsComponent,
        AllPersons,
        PersonAddressDetails,
        PersonEmailDetails,
        PersonPhoneDetails,
        ActivePersons,
        ActivePrivatePersons,
        ActivePublicPersons,
        EditPerson,
        PersonDocumentsGroup,
        PersonIdDocumentsTableComponent,
        PersonIdDocumentFormDialogComponent,
        PersonIdDocumentViewComponent,
        PersonIdDocumentFormComponent,
        PersonOtherDocumentsTableComponent,
        PersonDocumentFormDialog,
        PersonIdDetailView,
        EditPersonIdDetailForm,
        PersonOtherDocumentView,
        EditPersonOtherDocumentForm,
        PersonView,
        EditPersonIdDetailView,
        EditPersonOtherDocumentView,
        PersonOtherDocumentFormComponent,
        PersonEmailDialog,
        PersonEmailForm,
        PersonPhoneForm,
        PersonPhoneDialog,
        PersonAddressForm,
        PersonAddressDialog,
        AllPersonTable,
        ActivePersonsTable,
        ActivePrivatePersonsTable,
        ActivePublicPersonsTable,
        PersonOtherDocumentDialogFormComponent,
        PersonOtherDocumentDialogViewComponent
    ],
    imports: [
        CommonModule,
        PersonRoutingModule,
        ComponentsModule,

    ]
})
export class PersonModule { }