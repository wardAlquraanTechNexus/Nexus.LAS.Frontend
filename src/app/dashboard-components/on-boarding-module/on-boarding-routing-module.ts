import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnBoardMainComponent } from './on-board-main-component/on-board-main-component';

const routes: Routes = [
  {
    path: '',
    component: OnBoardMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnBoardingRoutingModule { }
