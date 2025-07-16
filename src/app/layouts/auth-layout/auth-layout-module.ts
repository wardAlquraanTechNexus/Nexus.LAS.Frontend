import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing-module';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthLayoutComponent } from './auth-layout-component/auth-layout-component';
import { ComponentsModule } from "../../components/components-module";

@NgModule({
  declarations: [
    AuthLayoutComponent

  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    ComponentsModule,
]
})
export class AuthLayoutModule { }
