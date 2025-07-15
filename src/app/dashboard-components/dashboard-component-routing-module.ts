import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard-component/main-dashboard-components';
import { ActivePersons } from './active-persons/active-persons';
import { NotActivePersons } from './not-active-persons/not-active-persons';
import { AllPersons } from './all-persons/all-persons';

const routes: Routes = [
  {
    path: "dashboard",
    component: MainDashboardComponent,
  },
  {
    path: "Persons/All-Persons",
    component: AllPersons,
  },
  {
    path: "Persons/Active-Persons",
    component: ActivePersons,
  },
  {
    path: "Persons/Active-Persons",
    component: NotActivePersons,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardComponentRoutingModule { }
