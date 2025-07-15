import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing-module';
import { ComponentsModule } from '../../components/components-module';
import { Sidebar } from '../../components/sidebar/sidebar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    ComponentsModule,
    Sidebar
  ]
})
export class AdminLayoutModule { }
