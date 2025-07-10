import { Routes } from '@angular/router';
import { Dashboard } from './shared/dashboard/dashboard';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [loginGuard]
    }
];
