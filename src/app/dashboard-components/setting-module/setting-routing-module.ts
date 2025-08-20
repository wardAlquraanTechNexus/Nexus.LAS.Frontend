import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment';
import { authGuard } from '../../guards/auth-guard';
import { GroupSettingComponent } from './setting-components/group-setting-component/group-setting-component';
import { UserSettingsComponent } from './setting-components/user-settings-component/user-settings-component';

const routes: Routes = [
  {
    path:"",
    component: GroupSettingComponent,
    canActivate: [authGuard]
  },
  {
    path:environment.routes.UserSettings,
    component: UserSettingsComponent,
    canActivate: [authGuard]
  },
  {
    path: environment.routes.DynamicList,
    loadChildren: () => import('./dynamic-list/dynamic-list-module').then(m => m.DynamicListModule),
    canActivate: [authGuard]
  },
  {
    path: environment.routes.Menus,
    loadChildren: () => import('./menu/menu-module').then(m => m.MenuModule),
    canActivate: [authGuard]
  },
  {
    path: environment.routes.Users,
    loadChildren: () => import('./user/user-module').then(m => m.UserModule),
    canActivate: [authGuard]
  },
  {
    path: environment.routes.UserGroups,
    loadChildren: () => import('./user-group/user-group-module').then(m => m.UserGroupModule),
    canActivate: [authGuard]
  }
  ,
  {
    path: environment.routes.Groups,
    loadChildren: () => import('./group/group-module').then(m => m.GroupModule),
    canActivate: [authGuard]
  },
  {
    path: environment.routes.GroupsMenus,
    loadChildren: () => import('./group-menu/group-menu-module').then(m => m.GroupMenuModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
