import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment';
import { AllCompaniesComponent } from './all-companies-component/all-companies-component';
import { ActiveCompaniesComponent } from './active-companies-component/active-companies-component';
import { ActivePublicCompaniesComponent } from './active-public-companies-component/active-public-companies-component';
import { ActivePrivateCompaniesComponent } from './active-private-companies-component/active-private-companies-component';

const routes: Routes = [
  {
    path: environment.routes.AllCompanies,
    component: AllCompaniesComponent,
  },
  {
    path: environment.routes.ActiveCompanies,
    component: ActiveCompaniesComponent,
  },
  {
    path: environment.routes.ActivePublicCompanies,
    component: ActivePublicCompaniesComponent,
  },
  {
    path: environment.routes.ActivePrivateCompanies,
    component: ActivePrivateCompaniesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
