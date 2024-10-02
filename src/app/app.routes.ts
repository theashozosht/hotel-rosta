import { Routes } from '@angular/router';
import { authGuard, sessionGuard } from '@core/guards';

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
            { path: 'room/:id', loadComponent: () => import('./pages/home/room/room.component').then((m) => m.RoomComponent) },
            {
                path: 'reservation',
                loadComponent: () =>
                    import(
                        './pages/home/hotel-reservation/hotel-reservation.component'
                    ).then((m) => m.HotelReservationComponent),
            },
            {
                path: 'reserve',
                children: [
                    {
                        path: 'list',
                        loadComponent: () =>
                            import(
                                './pages/home/reserve/reserve-list.component'
                            ).then((m) => m.ReserveCrudComponent),
                    },
                    {
                        path: 'form',
                        loadComponent: () =>
                            import(
                                './pages/home/reserve/form/form.component'
                            ).then((m) => m.ReserveFormComponent),
                    },
                    {
                        path: 'form/:reserveCode',
                        loadComponent: () =>
                            import(
                                './pages/home/reserve/form/form.component'
                            ).then((m) => m.ReserveFormComponent),
                    }
                ]
            },
            {
                path: 'passenger',
                children: [
                    {
                        path: 'list',
                        loadComponent: () =>
                            import(
                                './pages/home/passenger/passenger-list.component'
                            ).then((m) => m.PassengerListComponent),
                    },
                    {
                        path: 'form',
                        loadComponent: () =>
                            import(
                                './pages/home/passenger/passenger-form.component'
                            ).then((m) => m.PassengerFormComponent),
                    },
                    {
                        path: 'form/:nationalID',
                        loadComponent: () =>
                            import(
                                './pages/home/passenger/passenger-form.component'
                            ).then((m) => m.PassengerFormComponent),
                    },

                ]
            },
            {
                path: 'agency',
                children: [
                    {
                        path: 'list',
                        loadComponent: () =>
                            import(
                                './pages/home/agency/agency-list.component'
                            ).then((m) => m.AgencyListComponent),
                    },
                    {
                        path: 'form',
                        loadComponent: () =>
                            import(
                                './pages/home/agency/agency-form.component'
                            ).then((m) => m.AgencyFormComponent),
                    },
                    {
                        path: 'form/:nationalID',
                        loadComponent: () =>
                            import(
                                './pages/home/agency/agency-form.component'
                            ).then((m) => m.AgencyFormComponent),
                    },

                ]
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
