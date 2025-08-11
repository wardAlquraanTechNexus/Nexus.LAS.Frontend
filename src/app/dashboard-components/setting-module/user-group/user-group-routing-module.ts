import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGroupTable } from './user-group-table/user-group-table';

const routes: Routes = [
  {
    path:"",
    component: UserGroupTable
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupRoutingModule { }
