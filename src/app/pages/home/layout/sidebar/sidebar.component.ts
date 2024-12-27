import { Component, ElementRef, inject } from '@angular/core';
import { LayoutService } from '../services/app-layout.service';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { AppMenuitemComponent } from './menu/menu.component';
import { StaticName } from '@core/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    AppMenuitemComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private _router = inject(Router)
  model: any[] = [];

  constructor(public layoutService: LayoutService, public el: ElementRef) { }

  ngOnInit() {
    this.model = [
      {
        label: 'صفحات اصلی',
        items: [
          { label: 'داشبورد', icon: 'pi pi-fw pi-home text-xl', routerLink: ['/dashboard/home'] },
          { label: 'لیست اتاق‌ها', icon: 'pi pi-fw pi-table text-xl', routerLink: ['/dashboard/reservation'] },
          {
            label: 'رزرو', items: [
              { label: 'لیست رزرو', icon: 'pi pi-fw pi-building text-xl', routerLink: ['/dashboard/reserve/list'] },
              { label: 'ثبت رزرو', icon: 'pi pi-user-plus text-xl', routerLink: ['/dashboard/reserve/form'] },
            ]
          },
          {
            label: 'مسافران', items: [
              { label: 'لیست مسافران', icon: 'pi pi-fw pi-address-book text-xl', routerLink: ['/dashboard/passenger/list'] },
              { label: 'ثبت مسافر', icon: 'pi pi-user-plus text-xl', routerLink: ['/dashboard/passenger/form'] },
            ]
          },
          {
            label: 'آژانس', items: [
              { label: 'لیست آژانس', icon: 'pi pi-fw pi-warehouse text-xl', routerLink: ['/dashboard/agency/list'] },
              { label: 'ثبت آژانس', icon: 'pi pi-user-plus text-xl', routerLink: ['/dashboard/agency/form'] },
            ]
          },
          {
            label: 'ریجستر', items: [
              { label: 'لیست ریجستر', icon: 'pi pi-fw pi-wallet text-xl', routerLink: ['/dashboard/register/list'] },
              { label: 'ثبت ریجستر', icon: 'pi pi-user-plus text-xl', routerLink: ['/dashboard/agency/form'] },
            ]
          },
          { label: 'خروج از حساب', icon: 'pi pi-fw pi-sign-out text-xl', hasCallBack: true, callBack: this.logOut.bind(this) },
        ]
      },
    ];
  }

  logOut(): void {
    localStorage.removeItem(StaticName.localStorage.session);
    this._router.navigate(['/auth/login'])
  }
}
