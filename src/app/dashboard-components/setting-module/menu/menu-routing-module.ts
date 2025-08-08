import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuTableComponent } from './menu-table-component/menu-table-component';

const routes: Routes = [
  {
    path:"",
    component: MenuTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
