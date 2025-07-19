import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponentRoutingModule } from './dashboard-component-routing-module';
import { ComponentsModule } from '../components/components-module';
import { SharedTable } from './shared-components/shared-table/shared-table';
import { AllPersons } from './person-components/all-persons/all-persons';
import { ActivePersons } from './person-components/active-persons/active-persons';
import { AddPerson } from './person-components/add-person/add-person';
import { AddPersonDetails } from './person-components/add-person/add-person-details/add-person-details';
import { AddPersonContactDetails } from './person-components/add-person/add-person-contact-details/add-person-contact-details';
import { AddPersonEmailDetails } from './person-components/add-person/add-person-contact-details/add-person-email-details/add-person-email-details';
import { AddPersonPhoneDetails } from './person-components/add-person/add-person-contact-details/add-person-phone-details/add-person-phone-details';
import { AddPersonAddressDetails } from './person-components/add-person/add-person-contact-details/add-person-address-details/add-person-address-details';
import { PersonAddressDetails } from './person-components/shared-person-components/person-address-details/person-address-details';
import { PersonEmailDetails } from './person-components/shared-person-components/person-email-details/person-email-details';
import { PersonPhoneDetails } from './person-components/shared-person-components/person-phone-details/person-phone-details';


@NgModule({
  declarations: [
    SharedTable,
    AllPersons,
    PersonAddressDetails,
    PersonEmailDetails,
    PersonPhoneDetails,
    ActivePersons,
    AddPerson,
    AddPersonDetails,
    AddPersonContactDetails,
    AddPersonEmailDetails,
    AddPersonPhoneDetails,
    AddPersonAddressDetails,
  ],
  imports: [
    CommonModule,
    DashboardComponentRoutingModule,
    ComponentsModule,
  ]
})
export class DashboardComponentModule { }
