import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponentRoutingModule } from './dashboard-component-routing-module';
import { ComponentsModule } from '../components/components-module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    DashboardComponentRoutingModule,
    ComponentsModule,
    
]
})
export class DashboardComponentModule { }
