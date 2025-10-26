import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing-module';
import { ComponentsModule } from '../../../components/components-module';
import { GroupFormDialog } from './group-table/group-form-dialog/group-form-dialog';
import { GroupForm } from './group-table/group-form/group-form';
import { GroupTableComponent } from './group-table/group-table-component';
import { GroupTableViewComponent } from './group-table-view-component/group-table-view-component';
import { GroupViewComponent } from './group-view-component/group-view-component';


@NgModule({
  declarations: [
    GroupTableComponent,
    GroupTableViewComponent,
    GroupViewComponent
    
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    ComponentsModule
  ]
})
export class GroupModule { }
