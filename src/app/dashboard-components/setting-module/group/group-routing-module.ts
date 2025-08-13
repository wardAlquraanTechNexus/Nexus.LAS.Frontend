import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupTable } from './group-table/group-table';

const routes: Routes = [
  {
    path:'',
    component:GroupTable
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
