import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea'
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { RadioButtonModule } from 'primeng/radiobutton';
import { of } from 'rxjs';
import { ReserveList } from './models/interfaces/reserve.interface';
import { JalaliPipe } from '@core/pipes';

@Component({
  selector: 'app-register-crud',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    JalaliPipe
  ],
  providers: [MessageService],
  templateUrl: './reserve-list.component.html',
  styleUrl: './reserve-list.component.scss'
})
export class ReserveCrudComponent {

  reserves: ReserveList[] = [];

  reserve: ReserveList = {} as ReserveList;

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    of([
      {
        reserveCode: 1,
        roomNumber: 101,
        roomDescription: 'توضیحات',
        hasAlternatePassengers: false,
        passengers: { firstName: 'یاسین ', lastName: 'سطوتی' },
        startDate: new Date(),
        endDate: new Date(),
        reservedBy: 'محمد محمدی',
        receivedBy: 'حسین حسینی '
      },
      {
        reserveCode: 2,
        roomNumber: 102,
        roomDescription: '  توضیحات اضافه',
        hasAlternatePassengers: false,
        passengers: { firstName: 'یاسین ', lastName: 'سطوتی' },
        startDate: new Date(),
        endDate: new Date(),
        reservedBy: 'محمد محمدی',
        receivedBy: 'حسین حسینی '
      }
    ]).subscribe(res => this.reserves = res)

    this.cols = [
      { field: 'reserveCode', header: 'کد رزرو' },
      { field: 'roomNumber', header: 'شماره اتاق' },
      { field: 'passengers', header: 'نام مسافر' },
      { field: 'startDate', header: 'شروع رزرو' },
      { field: 'endDate', header: 'اتمام رزرو' },
      { field: 'reservedBy', header: 'کاربر ورود' },
      { field: 'receivedBy', header: 'کاربر خروج' },
    ];

    // this.statuses = [
    //   { label: 'تسویه کامل شده', value: PassengerPaymentStatus.FullPaid },
    //   { label: 'تسویه با آژانس', value: PassengerPaymentStatus.PaymentWithProvider },
    // ];
  }
  editReserve(...arg: any): any { }
  deleteReserve(...arg: any): any { }

  findIndexById(reserveCode: string): number {
    let index = -1;
    for (let i = 0; i < this.reserves.length; i++) {
      if (this.reserves[i].reserveCode === +reserveCode) {
        index = i;
        break;
      }
    }
    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
