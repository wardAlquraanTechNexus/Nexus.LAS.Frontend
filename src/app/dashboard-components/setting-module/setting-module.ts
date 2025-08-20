import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing-module';
import { GroupSettingComponent } from './setting-components/group-setting-component/group-setting-component';
import { ComponentsModule } from '../../components/components-module';
import { GroupFormDialog } from './group/group-table/group-form-dialog/group-form-dialog';
import { GroupForm } from './group/group-table/group-form/group-form';
import { UserSettingsComponent } from './setting-components/user-settings-component/user-settings-component';



@NgModule({
  declarations: [
    GroupSettingComponent,
    GroupFormDialog,
    GroupForm,
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ComponentsModule
  ]
})
export class SettingModule { }
