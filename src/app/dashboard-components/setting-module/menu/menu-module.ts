import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing-module';
import { ComponentsModule } from '../../../components/components-module';
import { MenuTableComponent } from './menu-table-component/menu-table-component';
import { SharedTreeComponent } from '../../../components/shared-tree-component/shared-tree-component';


@NgModule({
  declarations: [
    MenuTableComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ComponentsModule
  ]
})
export class MenuModule { }
