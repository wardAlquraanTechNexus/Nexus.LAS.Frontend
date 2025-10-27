import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing-module';
import { ComponentsModule } from '../../../components/components-module';
import { UserFormComponent } from './user-table/user-form-component/user-form-component';
import { UserDialogFormComponent } from './user-table/user-dialog-form-component/user-dialog-form-component';
import { UserTableComponent } from './user-table/user-table-component';
import { GroupsByUserComponent } from './groups-by-user-component/groups-by-user-component';


@NgModule({
  declarations: [
    UserTableComponent,
    UserFormComponent,
    UserDialogFormComponent,
    GroupsByUserComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComponentsModule
  ]
})
export class UserModule { }
