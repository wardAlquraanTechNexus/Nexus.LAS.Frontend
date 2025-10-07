import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment';
import { AllFpcsComponent } from './all-fpcs-component/all-fpcs-component';

const routes: Routes = [
  {
    path: environment.routes.AllFPCs,
    component: AllFpcsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FpcRoutingModule { }
