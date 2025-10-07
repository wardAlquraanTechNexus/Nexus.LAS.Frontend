import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FpcRoutingModule } from './fpc-routing-module';
import { BaseFpcsComponent } from './_base/base-fpcs-component/base-fpcs-component';
import { FpcTableViewComponent } from './_base/fpc-table-view-component/fpc-table-view-component';
import { AllFpcsComponent } from './all-fpcs-component/all-fpcs-component';
import { AllFpcsTableComponent } from './all-fpcs-component/all-fpcs-table-component/all-fpcs-table-component';
import { FpcDialogFormComponent } from './fpc-dialog-form-component/fpc-dialog-form-component';
import { FpcFormComponent } from './fpc-form-component/fpc-form-component';
import { ComponentsModule } from '../../components/components-module';


@NgModule({
  declarations: [
    BaseFpcsComponent,
    FpcTableViewComponent,
    AllFpcsComponent,
    AllFpcsTableComponent,
    FpcDialogFormComponent,
    FpcFormComponent
  ],
  imports: [
    CommonModule,
    FpcRoutingModule,
    ComponentsModule
  ]
})
export class FpcModule { }
