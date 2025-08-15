import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupMenuRoutingModule } from './group-menu-routing-module';
import { GroupMenuTable } from './group-menu-table/group-menu-table';
import { GroupMenuForm } from './group-menu-table/group-menu-form/group-menu-form';
import { GroupMenuFormDialog } from './group-menu-table/group-menu-form-dialog/group-menu-form-dialog';
import { ComponentsModule } from '../../../components/components-module';


@NgModule({
  declarations: [
    GroupMenuTable,
    GroupMenuForm,
    GroupMenuFormDialog
  ],
  imports: [
    CommonModule,
    GroupMenuRoutingModule,
    ComponentsModule
  ]
})
export class GroupMenuModule { }
