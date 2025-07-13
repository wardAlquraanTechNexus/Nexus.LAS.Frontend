import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard-component/main-dashboard-components';

const routes: Routes = [
  {
    path: "",
    component: MainDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardComponentRoutingModule { }
