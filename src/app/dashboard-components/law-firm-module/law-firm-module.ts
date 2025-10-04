import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawFirmRoutingModule } from './law-firm-routing-module';
import { BaseLawFirmsComponent } from './_base/base-law-firms-component/base-law-firms-component';
import { LawFirmViewComponent } from './_base/law-firm-view-component/law-firm-view-component';
import { AllLawFirmsTableComponent } from './all-law-firms-component/all-law-firms-table-component/all-law-firms-table-component';
import { AllLawFirmsComponent } from './all-law-firms-component/all-law-firms-component';
import { ComponentsModule } from '../../components/components-module';
import { LawFirmOverviewComponent } from './law-firm-components/law-firm-overview-component/law-firm-overview-component';
import { LawFirmPersonsComponent } from './law-firm-components/law-firm-persons-component/law-firm-persons-component';
import { LawFirmPersonFormComponent } from './law-firm-components/law-firm-persons-component/law-firm-person-form-component/law-firm-person-form-component';
import { LawFirmPersonDialogFormComponent } from './law-firm-components/law-firm-persons-component/law-firm-person-dialog-form-component/law-firm-person-dialog-form-component';
import { LawFirmBranchesComponent } from './law-firm-components/law-firm-branches-component/law-firm-branches-component';
import { LawFirmBranchFormComponent } from './law-firm-components/law-firm-branches-component/law-firm-branch-form-component/law-firm-branch-form-component';
import { LawFirmBranchDialogFormComponent } from './law-firm-components/law-firm-branches-component/law-firm-branch-dialog-form-component/law-firm-branch-dialog-form-component';
import { LawFirmCounselsComponent } from './law-firm-components/law-firm-counsels-component/law-firm-counsels-component';
import { LawFirmCounselFormComponent } from './law-firm-components/law-firm-counsels-component/law-firm-counsel-form-component/law-firm-counsel-form-component';
import { LawFirmCounselDialogFormComponent } from './law-firm-components/law-firm-counsels-component/law-firm-counsel-dialog-form-component/law-firm-counsel-dialog-form-component';
import { LawFirmExpertisesComponent } from './law-firm-components/law-firm-expertises-component/law-firm-expertises-component';
import { LawFirmExpertiseFormComponent } from './law-firm-components/law-firm-expertises-component/law-firm-expertise-form-component/law-firm-expertise-form-component';
import { LawFirmExpertiseDialogFormComponent } from './law-firm-components/law-firm-expertises-component/law-firm-expertise-dialog-form-component/law-firm-expertise-dialog-form-component';
import { ActiveLawFirmsComponent } from './active-law-firms-component/active-law-firms-component';
import { ActivePrivateLawFirmsComponent } from './active-private-law-firms-component/active-private-law-firms-component';
import { ActivePublicLawFirmsComponent } from './active-public-law-firms-component/active-public-law-firms-component';
import { ActiveLawFirmsTableComponent } from './active-law-firms-component/active-law-firms-table-component/active-law-firms-table-component';
import { ActivePrivateLawFirmsTableComponent } from './active-private-law-firms-component/active-private-law-firms-table-component/active-private-law-firms-table-component';
import { ActivePublicLawFirmsTableComponent } from './active-public-law-firms-component/active-public-law-firms-table-component/active-public-law-firms-table-component';
import { LawFirmInvoicesComponent } from './law-firm-components/law-firm-invoices-component/law-firm-invoices-component';


@NgModule({
  declarations: [
    BaseLawFirmsComponent,
    LawFirmViewComponent,
    AllLawFirmsTableComponent,
    ActiveLawFirmsTableComponent,
    ActivePrivateLawFirmsTableComponent,
    ActivePublicLawFirmsTableComponent,
    AllLawFirmsComponent,
    ActiveLawFirmsComponent,
    ActivePrivateLawFirmsComponent,
    ActivePublicLawFirmsComponent,
    LawFirmOverviewComponent,
    LawFirmPersonsComponent,
    LawFirmPersonFormComponent,
    LawFirmPersonDialogFormComponent,
    LawFirmBranchesComponent,
    LawFirmBranchFormComponent,
    LawFirmBranchDialogFormComponent,
    LawFirmCounselsComponent,
    LawFirmCounselFormComponent,
    LawFirmCounselDialogFormComponent,
    LawFirmExpertisesComponent,
    LawFirmExpertiseFormComponent,
    LawFirmExpertiseDialogFormComponent,
    LawFirmInvoicesComponent
  ],
  imports: [
    CommonModule,
    LawFirmRoutingModule,
    ComponentsModule
  ]
})
export class LawFirmModule { }
