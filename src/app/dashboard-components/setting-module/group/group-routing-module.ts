import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupTableComponent } from './group-table/group-table-component';
import { GroupTableViewComponent } from './group-table-view-component/group-table-view-component';

const routes: Routes = [
  {
    path: '',
    component: GroupTableViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
