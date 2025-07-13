import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from './register-component/register-component';

const routes: Routes = [
  {
    path:"",
    component: LoginComponent
  },
  {
    path:"register",
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthComponentsRoutingModule { }
