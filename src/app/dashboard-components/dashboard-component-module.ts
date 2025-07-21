import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponentRoutingModule } from './dashboard-component-routing-module';
import { ComponentsModule } from '../components/components-module';
import { AllPersons } from './person-components/all-persons/all-persons';
import { ActivePersons } from './person-components/active-persons/active-persons';
import { AddPerson } from './person-components/add-person/add-person';
import { PersonAddressDetails } from './person-components/shared-person-components/person-address-details/person-address-details';
import { PersonEmailDetails } from './person-components/shared-person-components/person-email-details/person-email-details';
import { PersonPhoneDetails } from './person-components/shared-person-components/person-phone-details/person-phone-details';
import { EditPerson } from './person-components/edit-person/edit-person';
import { PersonDetails } from './person-components/shared-person-components/person-details/person-details';


@NgModule({
  declarations: [
    AllPersons,
    PersonAddressDetails,
    PersonEmailDetails,
    PersonPhoneDetails,
    PersonDetails,
    ActivePersons,
    AddPerson,
    EditPerson,
  ],
  imports: [
    CommonModule,
    DashboardComponentRoutingModule,
    ComponentsModule,

  ]
})
export class DashboardComponentModule { }
