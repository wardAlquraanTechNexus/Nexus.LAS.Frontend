import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { MainDashboardComponent } from './main-dashboard-component/main-dashboard-component';
import { ComponentsModule } from '../../components/components-module';
import { GlobalCardsComponent } from './global-cards-component/global-cards-component';
import { ExpiredDocumentsComponent } from './expired-documents-component/expired-documents-component';


@NgModule({
  declarations: [
    MainDashboardComponent,
    GlobalCardsComponent,
    ExpiredDocumentsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule
  ]
})
export class DashboardModule { }
