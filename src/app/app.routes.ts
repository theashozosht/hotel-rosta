import { Routes } from '@angular/router';
import { authGuard, sessionGuard } from './core/guards/session.guard';

export const routes: Routes = [
    {
        path: 'auth',
        canActivate: [authGuard],
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./pages/authentication/login/login.component').then(
                        (m) => m.LoginComponent
                    ),
            },
            {
                path: '403',
                loadComponent: () =>
                    import('./pages/global/403/403.component').then(
                        (m) => m.AccessDeniedComponent
                    ),
            },
            {
                path: '**',
                loadComponent: () =>
                    import('./pages/global/404/404.component').then(
                        (m) => m.NotFoundComponent
                    ),
            },
        ],
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./pages/home/layout/layout.component').then(
                (m) => m.LayoutComponent
            ),
        canActivate: [sessionGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                loadComponent: () =>
                    import('./pages/home/home.component').then((m) => m.HomeComponent),
            },
            {
                path: 'reservation',
                loadComponent: () =>
                    import(
                        './pages/home/hotel-reservation/hotel-reservation.component'
                    ).then((m) => m.HotelReservationComponent),
            },
            {
                path: 'passenger-crud',
                loadComponent: () =>
                    import(
                        './pages/home/passenger-crud/passenger-crud.component'
                    ).then((m) => m.PassengerCrudComponent),
            },
            {
                path: 'provider-crud',
                loadComponent: () =>
                    import(
                        './pages/home/provider-crud/provider-crud.component'
                    ).then((m) => m.ProviderCrudComponent),
            },
        ],
    },
    {
        path: 'denied',
        loadComponent: () =>
            import('./pages/global/403/403.component').then(
                (m) => m.AccessDeniedComponent
            ),
    },
    { path: '**', redirectTo: 'auth/login' },
];
