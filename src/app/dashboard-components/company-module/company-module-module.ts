import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-module-routing-module';
import { AllCompaniesComponent } from './all-companies-component/all-companies-component';
import { ComponentsModule } from '../../components/components-module';
import { CompanyForm } from './company-form/company-form';
import { CompanyFormDialog } from './company-form-dialog/company-form-dialog';



@NgModule({
  declarations: [
    AllCompaniesComponent,
    CompanyForm,
    CompanyFormDialog
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ComponentsModule,

  ]
})
export class CompanyModule { }
