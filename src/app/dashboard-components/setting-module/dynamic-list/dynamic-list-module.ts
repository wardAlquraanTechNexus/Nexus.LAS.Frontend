import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicListRoutingModule } from './dynamic-list-routing-module';
import { DynamicListTable } from './dynamic-list-table/dynamic-list-table';
import { ComponentsModule } from '../../../components/components-module';
import { SharedTreeComponent } from '../../../components/shared-tree-component/shared-tree-component';
import { DynamicListDialog } from './dynamic-list-table/dynamic-list-dialog/dynamic-list-dialog';
import { DynamicListForm } from './dynamic-list-table/dynamic-list-form/dynamic-list-form';


@NgModule({
  declarations: [
    DynamicListTable,
    DynamicListDialog,
    DynamicListForm
  ],
  imports: [
    CommonModule,
    DynamicListRoutingModule,
    ComponentsModule
  ]
})
export class DynamicListModule { }
