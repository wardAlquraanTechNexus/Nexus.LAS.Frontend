import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing-module';
import { UserTable } from './user-table/user-table';
import { ComponentsModule } from '../../../components/components-module';


@NgModule({
  declarations: [
    UserTable
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComponentsModule
  ]
})
export class UserModule { }
