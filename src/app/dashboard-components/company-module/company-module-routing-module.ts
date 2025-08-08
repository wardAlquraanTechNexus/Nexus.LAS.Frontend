import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment';
import { AllCompaniesComponent } from './all-companies-component/all-companies-component';

const routes: Routes = [
  {
    path: environment.routes.AllCompanies,
    component: AllCompaniesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
