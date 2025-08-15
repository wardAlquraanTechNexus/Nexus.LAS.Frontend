import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupMenuTable } from './group-menu-table/group-menu-table';

const routes: Routes = [
  {
    path:"",
    component:GroupMenuTable
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupMenuRoutingModule { }
