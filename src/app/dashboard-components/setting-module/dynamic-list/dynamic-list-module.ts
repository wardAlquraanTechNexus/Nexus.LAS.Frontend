import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicListRoutingModule } from './dynamic-list-routing-module';
import { DynamicListTable } from './dynamic-list-table/dynamic-list-table';


@NgModule({
  declarations: [
    DynamicListTable
  ],
  imports: [
    CommonModule,
    DynamicListRoutingModule
  ]
})
export class DynamicListModule { }
