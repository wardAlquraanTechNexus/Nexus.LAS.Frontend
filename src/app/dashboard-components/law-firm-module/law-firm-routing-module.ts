import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment';
import { AllLawFirmsComponent } from './all-law-firms-component/all-law-firms-component';
import { ActiveLawFirmsComponent } from './active-law-firms-component/active-law-firms-component';
import { ActivePublicLawFirmsComponent } from './active-public-law-firms-component/active-public-law-firms-component';
import { ActivePrivateLawFirmsComponent } from './active-private-law-firms-component/active-private-law-firms-component';

const routes: Routes = [
    {
      path: environment.routes.AllLawFirms,
      component: AllLawFirmsComponent,
    },
    {
      path: environment.routes.ActiveLawFirms,
      component: ActiveLawFirmsComponent,
    },
    {
      path: environment.routes.ActivePublicLawFirms,
      component: ActivePublicLawFirmsComponent,
    },
    {
      path: environment.routes.ActivePrivateLawFirms,
      component: ActivePrivateLawFirmsComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawFirmRoutingModule { }
