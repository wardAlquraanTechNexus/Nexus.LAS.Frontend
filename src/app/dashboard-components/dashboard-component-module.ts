import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponentRoutingModule } from './dashboard-component-routing-module';
import { ComponentsModule } from '../components/components-module';
import { MenuDialog } from './setting-module/menu/menu-table-component/menu-dialog/menu-dialog';
import { MenuForm } from './setting-module/menu/menu-table-component/menu-form/menu-form';

@NgModule({
  declarations: [
    MenuDialog,
    MenuForm

  ],
  imports: [
    CommonModule,
    DashboardComponentRoutingModule,
    ComponentsModule,
]
})
export class DashboardComponentModule { }
