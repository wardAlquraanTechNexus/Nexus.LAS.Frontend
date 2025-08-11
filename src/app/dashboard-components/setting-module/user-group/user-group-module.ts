import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserGroupRoutingModule } from './user-group-routing-module';
import { UserGroupTable } from './user-group-table/user-group-table';
import { ComponentsModule } from '../../../components/components-module';
import { UserGroupFormDialog } from './user-group-form-dialog/user-group-form-dialog';
import { UserGroupForm } from './user-group-form/user-group-form';


@NgModule({
  declarations: [
    UserGroupTable,
    UserGroupFormDialog,
    UserGroupForm
  ],
  imports: [
    CommonModule,
    UserGroupRoutingModule,
    ComponentsModule
  ]
})
export class UserGroupModule { }
