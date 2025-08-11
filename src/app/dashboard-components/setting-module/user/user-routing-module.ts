import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { UserTable } from './user-table/user-table';

const routes: Routes = [
  {
    path: "",
    component: UserTable
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
