import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponentRoutingModule } from './dashboard-component-routing-module';
import { ComponentsModule } from '../components/components-module';
import { SharedTable } from './shared-components/shared-table/shared-table';
import { AllPersons } from './person-components/all-persons/all-persons';
import { ActivePersons } from './person-components/active-persons/active-persons';


@NgModule({
  declarations: [
    SharedTable,
    AllPersons,
    ActivePersons
  ],
  imports: [
    CommonModule,
    DashboardComponentRoutingModule,
    ComponentsModule
  ]
})
export class DashboardComponentModule { }
