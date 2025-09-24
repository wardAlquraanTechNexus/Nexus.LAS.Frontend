import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment';
import { AllPropertiesComponent } from './all-properties-component/all-properties-component';
import { ActivePropertiesComponent } from './active-properties-component/active-properties-component';
import { ActivePublicPropertiesComponent } from './active-public-properties-component/active-public-properties-component';
import { ActivePrivatePropertiesComponent } from './active-private-properties-component/active-private-properties-component';

const routes: Routes = [
  {
    path: environment.routes.AllProperties,
    component: AllPropertiesComponent,
  },
  {
    path: environment.routes.ActiveProperties,
    component: ActivePropertiesComponent,
  },
  {
    path: environment.routes.ActivePublicProperties,
    component: ActivePublicPropertiesComponent,
  },
  {
    path: environment.routes.ActivePrivateProperties,
    component: ActivePrivatePropertiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
