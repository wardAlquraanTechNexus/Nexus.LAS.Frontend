import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-module-routing-module';
import { AllCompaniesComponent } from './all-companies-component/all-companies-component';
import { ComponentsModule } from '../../components/components-module';
import { CompanyForm } from './company-form/company-form';
import { CompanyFormDialog } from './company-form-dialog/company-form-dialog';
import { AllCompaniesTable } from './all-companies-component/all-companies-table/all-companies-table';
import { CompanyTableView } from './_base/company-table-view/company-table-view';
import { CompanyViewComponent } from './company-view-component/company-view-component';
import { CompanyOverviewComponent } from './company-details-components/company-overview-component/company-overview-component';
import { CompanyPersonInChargeComponent } from './company-details-components/company-person-in-charge-component/company-person-in-charge-component';
import { CompanyPersonInChargeDialogFormComponent } from './company-details-components/company-person-in-charge-component/company-person-in-charge-dialog-form-component/company-person-in-charge-dialog-form-component';
import { CompanyPersonInChargeFormComponent } from './company-details-components/company-person-in-charge-component/company-person-in-charge-form-component/company-person-in-charge-form-component';
import { CompanyChamperOfCommerceComponent } from './company-details-components/company-champer-of-commerce-component/company-champer-of-commerce-component';
import { CompanyLicenseComponent } from './company-details-components/company-license-component/company-license-component';
import { CompanyLicenseFormComponent } from './company-details-components/company-license-component/company-license-form-component/company-license-form-component';
import { CompanyLicenseFormDialogComponent } from './company-details-components/company-license-component/company-license-form-dialog-component/company-license-form-dialog-component';
import { CompanyChamperOfCommerceFormComponent } from './company-details-components/company-champer-of-commerce-component/company-champer-of-commerce-form-component/company-champer-of-commerce-form-component';
import { CompanyChamperOfCommerceFormDialogComponent } from './company-details-components/company-champer-of-commerce-component/company-champer-of-commerce-form-dialog-component/company-champer-of-commerce-form-dialog-component';
import { CompanyActivityComponent } from './company-details-components/company-activity-component/company-activity-component';
import { CompanyActivityFormComponent } from './company-details-components/company-activity-component/company-activity-form-component/company-activity-form-component';
import { CompanyActivityFormDialogComponent } from './company-details-components/company-activity-component/company-activity-form-dialog-component/company-activity-form-dialog-component';
import { CompanyCapitalComponent } from './company-details-components/company-capital-component/company-capital-component';
import { CompanyCapitalFormComponent } from './company-details-components/company-capital-component/company-capital-form-component/company-capital-form-component';
import { CompanyCapitalDialogFormComponent } from './company-details-components/company-capital-component/company-capital-dialog-form-component/company-capital-dialog-form-component';
import { CompanyShareholderComponent } from './company-details-components/company-shareholder-component/company-shareholder-component';
import { CompanyShareholderFormComponent } from './company-details-components/company-shareholder-component/company-shareholder-form-component/company-shareholder-form-component';
import { CompanyShareholderDialogFormComponent } from './company-details-components/company-shareholder-component/company-shareholder-dialog-form-component/company-shareholder-dialog-form-component';
import { CompanyAddressComponent } from './company-details-components/company-address-component/company-address-component';
import { CompanyAddressFormComponent } from './company-details-components/company-address-component/company-address-form-component/company-address-form-component';
import { CompanyAddressDialogFormComponent } from './company-details-components/company-address-component/company-address-dialog-form-component/company-address-dialog-form-component';
import { CompanyEmailComponent } from './company-details-components/company-email-component/company-email-component';
import { CompanyEmailFormComponent } from './company-details-components/company-email-component/company-email-form-component/company-email-form-component';
import { CompanyEmailDialogFormComponent } from './company-details-components/company-email-component/company-email-dialog-form-component/company-email-dialog-form-component';
import { CompanyPhoneComponent } from './company-details-components/company-phone-component/company-phone-component';
import { CompanyPhoneFormComponent } from './company-details-components/company-phone-component/company-phone-form-component/company-phone-form-component';
import { CompanyPhoneDialogFormComponent } from './company-details-components/company-phone-component/company-phone-dialog-form-component/company-phone-dialog-form-component';
import { CompanyContractComponent } from './company-details-components/company-contract-component/company-contract-component';
import { CompanyContractFormComponent } from './company-details-components/company-contract-component/company-contract-form-component/company-contract-form-component';
import { CompanyContractFormDialogComponent } from './company-details-components/company-contract-component/company-contract-form-dialog-component/company-contract-form-dialog-component';



@NgModule({
  declarations: [
    AllCompaniesComponent,
    AllCompaniesTable,
    CompanyTableView,
    CompanyForm,
    CompanyFormDialog,
    CompanyViewComponent,
    CompanyOverviewComponent,
    CompanyPersonInChargeComponent,
    CompanyPersonInChargeDialogFormComponent,
    CompanyPersonInChargeFormComponent,
    CompanyChamperOfCommerceComponent,
    CompanyLicenseComponent,
    CompanyLicenseFormComponent,
    CompanyLicenseFormDialogComponent,
    CompanyChamperOfCommerceFormComponent,
    CompanyChamperOfCommerceFormDialogComponent,
    CompanyActivityComponent,
    CompanyActivityFormComponent,
    CompanyActivityFormDialogComponent,
    CompanyCapitalComponent,
    CompanyCapitalFormComponent,
    CompanyCapitalDialogFormComponent,
    CompanyShareholderComponent,
    CompanyShareholderFormComponent,
    CompanyShareholderDialogFormComponent,
    CompanyAddressComponent,
    CompanyAddressFormComponent,
    CompanyAddressDialogFormComponent,
    CompanyEmailComponent,
    CompanyEmailFormComponent,
    CompanyEmailDialogFormComponent,
    CompanyPhoneComponent,
    CompanyPhoneFormComponent,
    CompanyPhoneDialogFormComponent,
    CompanyContractComponent,
    CompanyContractFormComponent,
    CompanyContractFormDialogComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ComponentsModule,

  ]
})
export class CompanyModule { }
