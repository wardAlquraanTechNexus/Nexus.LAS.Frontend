import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment';
import { AddDocumentTracking } from '../document-tracking-components/add-document-tracking/add-document-tracking';
import { AddFpc } from '../fpc-components/add-fpc/add-fpc';
import { AddLawFirm } from '../law-firm-components/add-law-firm/add-law-firm';
import { AddRealEstate } from '../real-estate-components/add-real-estate/add-real-estate';
import { AddTransaction } from '../transaction-components/add-transaction/add-transaction';
import { ActivePersons } from './active-persons/active-persons';
import { ActivePrivatePersons } from './active-private-persons/active-private-persons';
import { ActivePublicPersons } from './active-public-persons/active-public-persons';
import { AllPersons } from './all-persons/all-persons';
import { PersonOtherDocumentView } from './person-other-document-view/person-other-document-view';
import { PersonViewComponent } from './person-view-component/person-view-component';
import { PersonDialogFormComponent } from './person-dialog-form-component/person-dialog-form-component';
import { PersonIdDetailViewComponent } from './person-id-detail-view/person-id-detail-view-component';

const routes: Routes = [
    {
      path: environment.routes.AllPersons,
      component: AllPersons,
    },
    {
      path: environment.routes.ActivePersons,
      component: ActivePersons,
    },
    {
      path: environment.routes.ActivePublicPersons,
      component: ActivePublicPersons,
    },
    {
      path: environment.routes.ActivePrivatePersons,
      component: ActivePrivatePersons,
    },
    {
      path: environment.routes.AddPerson,
      component: PersonDialogFormComponent,
    },
    {
      path: environment.routes.ViewPersons,
      component: PersonViewComponent,
    }
    ,
    {
      path: environment.routes.AddRealEstate,
      component: AddRealEstate,
    },
    {
      path: environment.routes.AddLawFirm,
      component: AddLawFirm,
    },
    {
      path: environment.routes.AddTransaction,
      component: AddTransaction,
    },
    {
      path: environment.routes.AddDocumentTracking,
      component: AddDocumentTracking,
    },
    {
      path: environment.routes.AddFpc,
      component: AddFpc,
    }
    ,
    {
      path: environment.routes.ViewPersonIdDetail,
      component: PersonIdDetailViewComponent,
    }
    ,
    {
      path: environment.routes.ViewPersonOtherDocument,
      component: PersonOtherDocumentView,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
