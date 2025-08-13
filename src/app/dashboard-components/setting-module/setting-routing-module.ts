import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicListModule } from './dynamic-list/dynamic-list-module';
import { environment } from '../../../environment/environment';
import { authGuard } from '../../guards/auth-guard';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
