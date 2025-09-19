import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment';
import { AllPropertiesComponent } from './all-properties-component/all-properties-component';

const routes: Routes = [
  {
    path: environment.routes.AllProperties,
    component: AllPropertiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
