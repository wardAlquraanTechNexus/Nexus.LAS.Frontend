import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-module-routing-module';
import { AllCompaniesComponent } from './all-companies-component/all-companies-component';
import { ComponentsModule } from '../../components/components-module';



@NgModule({
  declarations: [
    AllCompaniesComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ComponentsModule,

  ]
})
export class CompanyModule { }
