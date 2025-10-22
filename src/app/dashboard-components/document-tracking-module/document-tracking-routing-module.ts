import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDocumentTrackingsComponent } from './all-document-trackings-component/all-document-trackings-component';
import { environment } from '../../../environment/environment';

const routes: Routes = [
  {
    path: '',
    redirectTo: environment.routes.AllDocumentTrackings,
    pathMatch: 'full'
  },
  {
    path: environment.routes.AllDocumentTrackings,  
    component: AllDocumentTrackingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTrackingRoutingModule { }
