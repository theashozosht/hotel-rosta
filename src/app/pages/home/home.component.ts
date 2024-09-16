import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { delay, of } from 'rxjs';
import { RoomDataAccessService } from '@core/services';
import { RoomDataAccess } from '@core/types';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ToastModule,
    HttpClientModule,
    RouterModule,
    RouterLink
  
  ],
  providers: [ConfirmationService, MessageService,  RoomDataAccessService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private _roomsService = inject(RoomDataAccessService)
  
  protected roomsData: Array<RoomDataAccess> = []
  protected skipDateChecker: boolean = false;
  passengerForm = new FormGroup({
    passengerArray: new FormArray([
      new FormGroup({
        passengerName: new FormControl('', [Validators.required]),
        price: new FormControl<number>(0, [Validators.required]),
        roomNo: new FormControl<number>(0, [Validators.required]),
        providerName: new FormControl('', [Validators.required]),
        passengerId: new FormControl<number>(0, [Validators.required]),
        fromDate: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
        ]),
        toDate: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
        ]),
        invoiceNo: new FormControl<number>(0, [Validators.required]),
      }),
    ]),
  });

  ngOnInit(): void {
    this._roomsService.findAll().subscribe(res => {
      this.roomsData = res.result
    })
  }

  confirm(event: Event) {
    if (this.passengerForm.errors !== null) {
      this.messageService.add({
        severity: 'error',
        summary: 'نادرست',
        detail: 'اطلاعات وارد شده نادرست می‌باشد',
      });
      return;
    }
    // this.confirmationService.confirm({
    //   key: 'confirmForm',
    //   target: event.target || new EventTarget(),
    //   message: 'از صحت اطلاعات وارد شده مطمئن هستید ؟',
    //   icon: 'pi pi-exclamation-triangle',
    //   acceptLabel: 'بلی',
    //   rejectLabel: 'خیر',
    //   accept: () => {
    //     this.sendToApi();
    //     // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
    //   },
    //   reject: () => { },
    // });
    this.sendToApi()
  }

  sendToApi(): void {
    for (
      let i = 0;
      i < this.passengerForm.controls.passengerArray.controls.length;
      i++
    ) {
      const {
        passengerName,
        price,
        roomNo,
        providerName,
        passengerId,
        fromDate,
        toDate,
      } = this.passengerForm.controls.passengerArray.controls[i].value;
    }
  }

  daysRemaining(dateStart: Date, dateEnd: Date): number {
    let date1 = new Date(dateStart);
    let date2 = new Date(dateEnd);

    let Difference_In_Time =
        date2.getTime() - date1.getTime();

    let Difference_In_Days =
        Math.round
            (Difference_In_Time / (1000 * 3600 * 24)) + 5;

    return Difference_In_Days 
  }
}
