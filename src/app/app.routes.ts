import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout-component';
import { LoginComponent } from './auth-components/login-component/login-component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout-component/auth-layout-component';

export const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: () => import('./layouts/admin-layout/admin-layout-module').then(m => m.AdminLayoutModule)
        }]
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [{
            path: '',
            loadChildren: () => import('./layouts/auth-layout/auth-layout-module').then(m => m.AuthLayoutModule)
        }]
    }
];
