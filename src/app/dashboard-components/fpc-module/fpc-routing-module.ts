import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment';
import { AllFpcsComponent } from './all-fpcs-component/all-fpcs-component';
import { ActiveFpcsComponent } from './active-fpcs-component/active-fpcs-component';
import { ActivePrivateFpcsComponent } from './active-private-fpcs-component/active-private-fpcs-component';
import { ActivePublicFpcsComponent } from './active-public-fpcs-component/active-public-fpcs-component';

const routes: Routes = [
  {
    path: environment.routes.AllFPCs,
    component: AllFpcsComponent,
  },
  {
    path: environment.routes.ActiveFPCs,
    component: ActiveFpcsComponent,
  },{
    path: environment.routes.ActivePrivateFPCs,
    component: ActivePrivateFpcsComponent,
  },{
    path: environment.routes.ActivePublicFPCs,
    component: ActivePublicFpcsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FpcRoutingModule { }
