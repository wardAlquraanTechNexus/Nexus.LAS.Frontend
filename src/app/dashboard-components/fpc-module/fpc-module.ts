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
import { FpcOverviewComponent } from './fpc-components/fpc-overview-component/fpc-overview-component';
import { FpcOdsComponent } from './fpc-components/fpc-ods-component/fpc-ods-component';
import { FpcOdFormComponent } from './fpc-components/fpc-ods-component/fpc-od-form-component/fpc-od-form-component';
import { FpcOdDialogFormComponent } from './fpc-components/fpc-ods-component/fpc-od-dialog-form-component/fpc-od-dialog-form-component';
import { FpcOdActionsComponent } from './fpc-components/fpc-od-actions-component/fpc-od-actions-component';
import { FpcOdActionFormComponent } from './fpc-components/fpc-od-actions-component/fpc-od-action-form-component/fpc-od-action-form-component';
import { FpcOdActionDialogFormComponent } from './fpc-components/fpc-od-actions-component/fpc-od-action-dialog-form-component/fpc-od-action-dialog-form-component';
import { ActiveFpcsComponent } from './active-fpcs-component/active-fpcs-component';
import { ActiveFpcsTableComponent } from './active-fpcs-component/active-fpcs-table-component/active-fpcs-table-component';
import { ActivePublicFpcsComponent } from './active-public-fpcs-component/active-public-fpcs-component';
import { ActivePublicFpcsTableComponent } from './active-public-fpcs-component/active-public-fpcs-table-component/active-public-fpcs-table-component';
import { ActivePrivateFpcsComponent } from './active-private-fpcs-component/active-private-fpcs-component';
import { ActivePrivateFpcsTableComponent } from './active-private-fpcs-component/active-private-fpcs-table-component/active-private-fpcs-table-component';


@NgModule({
  declarations: [
    BaseFpcsComponent,
    FpcTableViewComponent,
    AllFpcsComponent,
    AllFpcsTableComponent,
    FpcDialogFormComponent,
    FpcFormComponent,
    FpcOverviewComponent,
    FpcOdsComponent,
    FpcOdFormComponent,
    FpcOdDialogFormComponent,
    FpcOdActionsComponent,
    FpcOdActionFormComponent,
    FpcOdActionDialogFormComponent,
    ActiveFpcsComponent,
    ActiveFpcsTableComponent,
    ActivePublicFpcsComponent,
    ActivePublicFpcsTableComponent,
    ActivePrivateFpcsComponent,
    ActivePrivateFpcsTableComponent
  ],
  imports: [
    CommonModule,
    FpcRoutingModule,
    ComponentsModule
  ]
})
export class FpcModule { }
