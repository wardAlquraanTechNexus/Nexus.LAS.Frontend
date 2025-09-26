import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawFirmRoutingModule } from './law-firm-routing-module';
import { BaseLawFirmsComponent } from './_base/base-law-firms-component/base-law-firms-component';
import { LawFirmViewComponent } from './_base/law-firm-view-component/law-firm-view-component';
import { AllLawFirmsTableComponent } from './all-law-firms-component/all-law-firms-table-component/all-law-firms-table-component';
import { AllLawFirmsComponent } from './all-law-firms-component/all-law-firms-component';
import { ComponentsModule } from '../../components/components-module';


@NgModule({
  declarations: [
    BaseLawFirmsComponent,
    LawFirmViewComponent,
    AllLawFirmsTableComponent,
    AllLawFirmsComponent
  ],
  imports: [
    CommonModule,
    LawFirmRoutingModule,
    ComponentsModule
  ]
})
export class LawFirmModule { }
