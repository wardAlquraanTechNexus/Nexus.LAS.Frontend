import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing-module';
import { GroupTable } from './group-table/group-table';
import { ComponentsModule } from '../../../components/components-module';
import { GroupFormDialog } from './group-table/group-form-dialog/group-form-dialog';
import { GroupForm } from './group-table/group-form/group-form';


@NgModule({
  declarations: [
    GroupTable,
    GroupFormDialog,
    GroupForm
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    ComponentsModule
  ]
})
export class GroupModule { }
