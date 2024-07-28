import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
export class HomeComponent {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
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
      }),
    ]),
  });

  confirm(event: Event) {
    if (this.passengerForm.errors !== null) {
      this.messageService.add({
        severity: 'error',
        summary: 'نادرست',
        detail: 'اطلاعات وارد شده نادرست می‌باشد',
      });
      return;
    }
    this.confirmationService.confirm({
      key: 'confirmForm',
      target: event.target || new EventTarget(),
      message: 'از صحت اطلاعات وارد شده مطمئن هستید ؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بلی',
      rejectLabel: 'خیر',
      accept: () => {
        this.sendToApi();
        // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {},
    });
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
