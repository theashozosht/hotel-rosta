import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: 'login', loadComponent:
                    () => import('./pages/authentication/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: '403',
                loadComponent:
                    () => import('./pages/global/403/403.component').then(m => m.AccessDeniedComponent)
            },
            {
                path: '**',
                loadComponent:
                    () => import('./pages/global/404/404.component').then(m => m.NotFoundComponent)
            }
        ]
    },
    {
        path: 'dashboard',
        loadComponent:
            () => import('./pages/home/layout/layout.component').then(m => m.LayoutComponent),
            children: [
                {
                    path: 'home',
                    loadComponent: 
                    () => import('./pages/home/home.component').then(m => m.HomeComponent),
                }
            ]
    },
    {
        path: 'denied',
        loadComponent:
            () => import('./pages/global/403/403.component').then(m => m.AccessDeniedComponent)

    },
    { path: '**', redirectTo: 'auth/login' },
];
