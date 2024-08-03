import { Component, ElementRef, inject } from '@angular/core';
import { LayoutService } from '../services/app-layout.service';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { AppMenuitemComponent } from './menu/menu.component';
import { StaticName } from '../../../../core/constants/static-name';
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
          { label: 'مسافران', icon: 'pi pi-fw pi-id-card text-xl', routerLink: ['/dashboard/passenger-crud'] },
          { label: 'آژانس‌ها', icon: 'pi pi-fw pi-link text-xl', routerLink: ['/dashboard/provider-crud'] },
          { label: 'خروج از حساب', icon: 'pi pi-fw pi-sign-out text-xl', hasCallBack: true, callBack: this.logOut.bind(this)  },
        ]
      },
    ];
  }

  logOut(): void {
    console.log('here')
    localStorage.removeItem(StaticName.localStorage.session);
    this._router.navigate(['/auth/login'])
  }
}
