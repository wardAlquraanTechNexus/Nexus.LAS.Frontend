import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard-component/main-dashboard-components';
import { AllPersons } from './person-components/all-persons/all-persons';
import { ActivePersons } from './person-components/active-persons/active-persons';
import { ActivePrivatePersons } from './person-components/active-private-persons/active-private-persons';
import { AddPerson } from './person-components/add-person/add-person';
import { environment } from '../../environment/environment';
import { AddCompany } from './company-components/add-company/add-company';
import { AddRealEstate } from './real-estate-components/add-real-estate/add-real-estate';
import { AddLawFirm } from './law-firm-components/add-law-firm/add-law-firm';
import { AddTransaction } from './transaction-components/add-transaction/add-transaction';
import { AddDocumentTracking } from './document-tracking-components/add-document-tracking/add-document-tracking';
import { AddFpc } from './fpc-components/add-fpc/add-fpc';
import { EditPerson } from './person-components/edit-person/edit-person';
import { PersonIdDetailView } from './person-components/person-id-detail-view/person-id-detail-view';
import { PersonOtherDocumentView } from './person-components/person-other-document-view/person-other-document-view';
import { PersonView } from './person-components/person-view/person-view';

const routes: Routes = [
  {
    path: environment.routes.dashboard,
    component: MainDashboardComponent,
  },
  {
    path: environment.routes.AllPersons,
    component: AllPersons,
  },
  {
    path: environment.routes.ActivePersons,
    component: ActivePersons,
  },
  {
    path: environment.routes.ActivePrivatePersons,
    component: ActivePrivatePersons,
  },
  {
    path: environment.routes.AddPerson,
    component: AddPerson,
  },
  {
    path: environment.routes.EditPerson,
    component: EditPerson,
  }
  ,
  {
    path: environment.routes.ViewPersons,
    component: PersonView,
  }
  ,
  {
    path: environment.routes.AddCompany,
    component: AddCompany,
  },
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
    component: PersonIdDetailView,
  }
  ,
  {
    path: environment.routes.ViewPersonOtherDocument,
    component: PersonOtherDocumentView,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardComponentRoutingModule { }
