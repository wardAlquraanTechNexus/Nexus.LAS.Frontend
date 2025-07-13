import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from './register-component/register-component';
import { ComponentsModule } from '../components/components-module';
import { AuthComponentsRoutingModule } from './auth-components-routing-module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthComponentsRoutingModule,
    ComponentsModule
  ]
})
export class AuthComponentsModule { }
