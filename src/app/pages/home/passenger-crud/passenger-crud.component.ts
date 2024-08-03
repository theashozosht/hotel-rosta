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
import { PassengerListResponse, PassengerPaymentStatus } from './models';
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
    DialogModule],
  providers: [MessageService],
  templateUrl: './passenger-crud.component.html',
  styleUrl: './passenger-crud.component.scss'
})
export class PassengerCrudComponent {
  passengerDialog: boolean = false;
  deletePassengerDialog: boolean = false;
  passengers: PassengerListResponse[] = [];
  passenger: PassengerListResponse = {} as PassengerListResponse;
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    of([
      {
        passengerName: 'یاسین سطوتی',
        passengerID: '0640785131',
        birthDate: '1380/06/17',
        phoneNumber: '09356186063',
        fromDate: '1402/04/15',
        toDate: '1402/04/20',
        lastRegisterId: '201532',
        status: PassengerPaymentStatus.FullPaid,
      },
      {
        passengerName: 'ادریس یاسینی',
        passengerID: '1234567890',
        birthDate: '1380/06/17',
        phoneNumber: '09152349388',
        fromDate: '1402/04/15',
        toDate: '1402/04/20',
        lastRegisterId: '441545',
        status: PassengerPaymentStatus.PaymentWithProvider,
      },
    ]).subscribe(res => this.passengers = res)

    this.cols = [
      { field: 'passengerName', header: 'نام مسافر' },
      { field: 'passengerID', header: 'شماره شناسنامه' },
      { field: 'birthDate', header: 'تاریخ تولد' },
      { field: 'phoneNumber', header: 'شماره همراه' },
      { field: 'fromDate', header: 'تاریخ شروع' },
      { field: 'toDate', header: 'تاریخ اتمام' },
      { field: 'lastRegisterId', header: 'شماره آخرین ریجستر' },
      { field: 'status', header: 'وضعیت' },
    ];

    this.statuses = [
      { label: 'تسویه کامل شده', value: PassengerPaymentStatus.FullPaid },
      { label: 'تسویه با آژانس', value: PassengerPaymentStatus.PaymentWithProvider },
    ];
  }

  openNew() {
    this.passenger = {} as PassengerListResponse;
    this.submitted = false;
    this.passengerDialog = true;
  }


  editPassenger(passenger: PassengerListResponse) {
    this.passenger = { ...passenger };
    this.passengerDialog = true;
  }

  deletePassenger(passenger: PassengerListResponse) {
    this.deletePassengerDialog = true;
    this.passenger = { ...passenger };
  }

  confirmDelete() {
    this.deletePassengerDialog = false;
    this.passengers = this.passengers.filter(val => val.passengerID !== this.passenger.passengerID);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Passenger Deleted', life: 3000 });
    this.passenger = {} as PassengerListResponse;
  }

  hideDialog() {
    this.passengerDialog = false;
    this.submitted = false;
  }

  savePassenger() {
  }

  findIndexById(passengerID: string): number {
    let index = -1;
    for (let i = 0; i < this.passengers.length; i++) {
      if (this.passengers[i].passengerID === passengerID) {
        index = i;
        break;
      }
    }
    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  statusTranslator(status: PassengerPaymentStatus): string {
    if (status === PassengerPaymentStatus.FullPaid) {
      return 'تسویه کامل'
    }
    if (status === PassengerPaymentStatus.PaymentWithProvider) {
      return 'تسویه با آژانس'
    }
    return status
  }
}
