import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { PassengerDataAccessService } from '@core/services';
import { HttpClientModule } from '@angular/common/http';
import {  PassengerDataAccessDTO, PaymentStatus } from '@core/types';
import { JalaliPipe } from '@core/pipes';
import moment from 'jalali-moment';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
moment.locale('fa')

@Component({
  selector: 'app-register-crud',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputNumberModule,
    ToastModule,
    ToolbarModule,
    RouterModule,
    DropdownModule,
    HttpClientModule,
    JalaliPipe
  ],
  providers: [MessageService, PassengerDataAccessService],
  templateUrl: './passenger-form.component.html',
  styleUrl: './passenger-form.component.scss'
})
export class PassengerFormComponent {
  private _messageService = inject(MessageService);
  private _passengerService = inject(PassengerDataAccessService);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  protected passengerFormGroup = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    nationalID: new FormControl<string>('', Validators.required),
    nationalityType: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    birthDate: new FormControl<string>('', Validators.required),
    lastEndDate: new FormControl<string>('', Validators.required),
    lastRegisterNumber: new FormControl<number>(0, Validators.required),
    paymentStatus: new FormControl<{
      name: string,
      code: PaymentStatus
    }>({ name: 'پیش فرض', code: PaymentStatus.None }, Validators.required),
  })

  protected readonly paymentStatus: Array<{ name: string, code: PaymentStatus }> = [
    { name: 'پیش فرض', code: PaymentStatus.None },
    { name: 'پرداخت شده', code: PaymentStatus.Settled },
    { name: 'مسافر', code: PaymentStatus.PayOffForProvider }
  ];
  private nationalIdFromRoute!: string;

  constructor() {
    this.nationalIdFromRoute = this._activatedRoute.snapshot.params['nationalID']
    if (this.nationalIdFromRoute) {
      this.getById(+this.nationalIdFromRoute)
    }
  }

  getById(nationalID: number) {
    this._passengerService.findById(nationalID.toString()).subscribe(res => {
      if (res.result) {
        this.passengerFormGroup.setValue({
          firstName: res.result.firstName,
          lastName: res.result.lastName,
          nationalID: res.result.nationalID,
          nationalityType: res.result.nationalityType,
          phoneNumber: res.result.phoneNumber,
          birthDate: moment(res.result.birthDate).locale('fa').format('YYYY-MM-DD'),
          lastEndDate: res.result.lastEndDate ? moment(res.result.birthDate).locale('fa').format('YYYY-MM-DD') : moment(new Date).locale('fa').format('YYYY-MM-DD'),
          lastRegisterNumber: res.result.lastRegisterNumber ?? 0,
          paymentStatus: res.result.paymentStatus ?
            { code: res.result.paymentStatus, name: this.paymentStatusTranslator(res.result.paymentStatus).name } :
            { name: 'پیش فرض', code: PaymentStatus.None }
        })
      } else {
        this._messageService.add({ severity: 'error', summary: ' مسافر', detail: ' مسافر با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });

      }
    }, err => {
      this._messageService.add({ severity: 'error', summary: ' مسافر', detail: ' مسافر با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });

    })
  }

  saveInformation() {
    this.passengerFormGroup.markAllAsTouched();

    if (this.passengerFormGroup.invalid) {
      this._messageService.add({ severity: 'error', summary: 'اطلاعات ناقص', detail: 'اطلاعات فرم را مجددا چک کنید و از صحت آن اطمینان حاصل فرمایید', life: 3000 });
      return;
    }


    const passengerEntity: PassengerDataAccessDTO = {
      firstName: this.passengerFormGroup.value.firstName ?? '',
      lastName: this.passengerFormGroup.value.lastName ?? '',
      nationalID: this.passengerFormGroup.value.nationalID ?? '',
      nationalityType: this.passengerFormGroup.value.nationalityType ?? '',
      phoneNumber: this.passengerFormGroup.value.phoneNumber ?? '',
      birthDate: this.passengerFormGroup.value.birthDate ? moment(this.passengerFormGroup.value.birthDate, 'jYYYY-jMM-DD').toDate() : new Date(),
      lastEndDate: this.passengerFormGroup.value.lastEndDate ? moment(this.passengerFormGroup.value.lastEndDate, 'jYYYY-jMM-DD').toDate() : new Date(),
      lastRegisterNumber: this.passengerFormGroup.value.lastRegisterNumber ?? 0,
      paymentStatus: this.passengerFormGroup.value.paymentStatus?.code ?? PaymentStatus.None,
    }
    if (this.nationalIdFromRoute) this.updatePassenger(this.nationalIdFromRoute, passengerEntity)
    else this.createPassenger(passengerEntity)
  }

  createPassenger(passengerEntity: PassengerDataAccessDTO) {
    this._passengerService.create(passengerEntity).subscribe((res) => {
      if (res.result) {
        this._messageService.add({ severity: 'success', summary: 'ثبت مسافر', detail: 'مسافر با شماره ' + res.result.nationalID + 'با موفقیت انجام شد', life: 3000 })
      } else {
        this._messageService.add({ severity: 'error', summary: 'ثبت مسافر', detail: 'ثبت مسافر با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });

      }
    }, err => {
      this._messageService.add({ severity: 'error', summary: 'ثبت مسافر', detail: 'ثبت رزرو با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });
    })
  }

  updatePassenger(nationalID: string, passengerEntity: PassengerDataAccessDTO) {
    this._passengerService.findByIdAndUpdate(nationalID, passengerEntity).subscribe((res) => {
      if (res.result) {
        this._messageService.add({ severity: 'success', summary: 'ثبت مسافر', detail: 'مسافر با شماره ' + res.result.nationalID + 'با موفقیت انجام شد', life: 3000 })
      } else {
        this._messageService.add({ severity: 'error', summary: 'ثبت مسافر', detail: 'ثبت مسافر با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });

      }
    }, err => {
      this._messageService.add({ severity: 'error', summary: 'ثبت مسافر', detail: 'ثبت رزرو با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });
    })
  }

  paymentStatusTranslator(paymentStatus: PaymentStatus): {
    name: string;
    code: PaymentStatus;
  } {
    const agency = this.paymentStatus.find(agency => agency.code === paymentStatus)
    if (agency)
      return agency
    else
      return {
        name: '',
        code: PaymentStatus.None
      }
  }
}
