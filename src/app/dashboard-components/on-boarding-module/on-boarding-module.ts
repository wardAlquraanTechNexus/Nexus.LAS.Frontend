import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnBoardingRoutingModule } from './on-boarding-routing-module';
import { OnBoardMainComponent } from './on-board-main-component/on-board-main-component';
import { ComponentsModule } from '../../components/components-module';


@NgModule({
  declarations: [
    OnBoardMainComponent
  ],
  imports: [
    CommonModule,
    OnBoardingRoutingModule,
    ComponentsModule
  ]
})
export class OnBoardingModule { }
