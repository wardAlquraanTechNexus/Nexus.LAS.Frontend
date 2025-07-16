import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing-module';
import { ComponentsModule } from '../../components/components-module';
import { Sidebar } from '../../components/sidebar/sidebar';
import { AdminLayoutComponent } from './admin-layout/admin-layout-component';


@NgModule({
  declarations: [
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    ComponentsModule,
  ]
})
export class AdminLayoutModule { }
