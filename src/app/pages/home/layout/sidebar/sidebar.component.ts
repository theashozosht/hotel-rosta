import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../services/app-layout.service';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { AppMenuitemComponent } from './menu/menu.component';

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


  model: any[] = [];

  constructor(public layoutService: LayoutService, public el: ElementRef) { }

  ngOnInit() {
    this.model = [
      {
        label: 'صفحات اصلی',
        items: [
          { label: 'داشبورد', icon: 'pi pi-fw pi-home text-xl', routerLink: ['/dashboard/home'] },
          { label: 'لیست اتاق‌ها', icon: 'pi pi-fw pi-table text-xl', routerLink: ['/dashboard/reservation'] },
        ]
      },
    ];
  }
}
