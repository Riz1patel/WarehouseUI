import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Layout } from './pages/auth/layout/layout';
import { ClientList } from './pages/clients/client-list/client-list';
import { ClientForm } from './pages/clients/client-form/client-form';
import { authGuardGuard } from './core/guards/auth-guard-guard';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"login",
        pathMatch:'full'

    },
    {
        path:'login',
        component:Login
    },
    {
        path:'admin',
        component:Layout,
        children:[
            {
                path:'client-list',
                component:ClientList,
                canActivate:[authGuardGuard]
            },
            {
                path:'client-form',
                component:ClientForm
            }
        ]
    }
];
