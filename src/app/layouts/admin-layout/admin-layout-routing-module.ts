import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';

const routes: Routes = [
   {
    path: '',
    loadChildren: () => import('../../dashboard-components/dashboard-component-module').then(m => m.DashboardComponentModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
