import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from './register-component/register-component';
import { AuthBrandingComponent } from './shared/auth-branding/auth-branding.component';
import { ComponentsModule } from '../components/components-module';
import { AuthComponentsRoutingModule } from './auth-components-routing-module';
import { MenuService } from '../services/menu-service';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthBrandingComponent
  ],
  imports: [
    CommonModule,
    AuthComponentsRoutingModule,
    ComponentsModule
  ],
  providers:[
    MenuService
  ]
})
export class AuthComponentsModule { }
