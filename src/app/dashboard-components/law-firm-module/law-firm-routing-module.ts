import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment';
import { AllLawFirmsComponent } from './all-law-firms-component/all-law-firms-component';

const routes: Routes = [
    {
      path: environment.routes.AllLawFirms,
      component: AllLawFirmsComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawFirmRoutingModule { }
