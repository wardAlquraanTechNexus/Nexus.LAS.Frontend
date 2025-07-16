import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout-component/auth-layout-component';
import { LoginComponent } from '../../auth-components/login-component/login-component';
import { RegisterComponent } from '../../auth-components/register-component/register-component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('../../auth-components/auth-components-module').then(m => m.AuthComponentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
