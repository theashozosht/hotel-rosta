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
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  protected roomsData: Array<any> = []
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
    of([
      {
        roomNo: 101,
        name: 'یاسین سطوتی',
        remainingDays:1,
        hasClient: true,
        providersName: null
      },
      {
        roomNo: 102,
        name: 'یاسین سطوتی',
        remainingDays: 8,
        hasClient: true,
        providersName: null
      },
      {
        roomNo: 103,
        name: 'یاسین سطوتی',
        remainingDays: 5,
        hasClient: true,
        providersName: null
      },
      {
        roomNo: 201,
        name: 'یاسین سطوتی',
        remainingDays: 2,
        hasClient: true,
        providersName: 'جاباما'
      },
      {
        roomNo: 202,
        name: null,
        remainingDays: null,
        hasClient: false,
        providersName: 'جاباما'
      },
      {
        roomNo: 203,
        name: null,
        remainingDays: null,
        hasClient: false,
        providersName: 'ادمین'
      },
      {
        roomNo: 301,
        name: null,
        remainingDays: null,
        hasClient: false,
        providersName: 'جاباما'
      },
      {
        roomNo: 302,
        name: 'یاسین سطوتی',
        remainingDays: 0,
        hasClient: true,
        providersName: null
      },
      {
        roomNo: 303,
        name: null,
        remainingDays: null,
        hasClient: false,
        providersName: 'ادمین'
      },
    ])  .subscribe(res => {
      this.roomsData = res
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
}
