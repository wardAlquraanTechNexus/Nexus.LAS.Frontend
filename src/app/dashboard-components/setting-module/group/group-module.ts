import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing-module';
import { ComponentsModule } from '../../../components/components-module';
import { GroupFormDialog } from './group-table/group-form-dialog/group-form-dialog';
import { GroupForm } from './group-table/group-form/group-form';
import { GroupTableComponent } from './group-table/group-table-component';
import { GroupTableViewComponent } from './group-table-view-component/group-table-view-component';
import { GroupViewComponent } from './group-view-component/group-view-component';
import { UsersByGroupComponent } from './group-components/users-by-group-component/users-by-group-component';
import { MenusByGroupComponent } from './group-components/menus-by-group-component/menus-by-group-component';
import { GroupMenuFormComponent } from './group-components/menus-by-group-component/group-menu-form-component/group-menu-form-component';
import { GroupMenuDialogFormComponent } from './group-components/menus-by-group-component/group-menu-dialog-form-component/group-menu-dialog-form-component';


@NgModule({
  declarations: [
    GroupTableComponent,
    GroupTableViewComponent,
    GroupViewComponent,
    UsersByGroupComponent,
    MenusByGroupComponent,
    GroupMenuFormComponent,
    GroupMenuDialogFormComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    ComponentsModule
  ]
})
export class GroupModule { }
