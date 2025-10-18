import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment.prod';
import { MainDashboardComponent } from './main-dashboard-component/main-dashboard-component';

const routes: Routes = [
  {
    path: "",
    component: MainDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
