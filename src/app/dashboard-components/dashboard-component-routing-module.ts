import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard-component/main-dashboard-components';
import { environment } from '../../environment/environment';
import { authGuard } from '../guards/auth-guard';

const routes: Routes = [
  {
    path: environment.routes.dashboard,
    component: MainDashboardComponent,
  },
  {
    path: environment.routes.Persons,
    loadChildren: () => import('./person-module/person-module').then(m => m.PersonModule),
    canActivate: [authGuard]
  },
  {
    path: environment.routes.Companies,
    loadChildren: () => import('./company-module/company-module-module').then(m => m.CompanyModule),
    canActivate: [authGuard]
  },
  {
    path: environment.routes.Setting,
    loadChildren: () => import('./setting-module/setting-module').then(m => m.SettingModule),
    canActivate: [authGuard]
  },
  {
    path: environment.routes.Properties,
    loadChildren: () => import('./property-module/property-module').then(m => m.PropertyModule),
    canActivate: [authGuard]
  },
  {
    path: environment.routes.LawFirms,
    loadChildren: () => import('./law-firm-module/law-firm-module').then(m => m.LawFirmModule),
    canActivate: [authGuard]
  },
  {
    path: environment.routes.Transactions,
    loadChildren: () => import('./transaction-module/transaction-module').then(m => m.TransactionModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardComponentRoutingModule { }
