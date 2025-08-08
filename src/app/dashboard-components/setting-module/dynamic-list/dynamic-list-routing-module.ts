import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { DynamicListTable } from './dynamic-list-table/dynamic-list-table';

const routes: Routes = [
  {
    path: "",
    component:DynamicListTable 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicListRoutingModule { }
