import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyRoutingModule } from './property-routing-module';
import { BasePropertiesComponent } from './_base/base-properties-component/base-properties-component';
import { PropertyTableView } from './_base/property-table-view/property-table-view';
import { AllPropertiesComponent } from './all-properties-component/all-properties-component';
import { AllPropertiesTableComponent } from './all-properties-component/all-properties-table-component/all-properties-table-component';
import { ComponentsModule } from '../../components/components-module';
import { PropertyFormComponent } from './property-form-component/property-form-component';
import { PropertyDialogFormComponent } from './property-dialog-form-component/property-dialog-form-component';



@NgModule({
  declarations: [
    BasePropertiesComponent,
    PropertyTableView,
    AllPropertiesComponent,
    AllPropertiesTableComponent,
    PropertyFormComponent,
    PropertyDialogFormComponent
  ],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    ComponentsModule
  ]
})
export class PropertyModule { }
