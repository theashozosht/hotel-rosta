import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { PassengerDataAccessService } from '@core/services';
import { HttpClientModule } from '@angular/common/http';
import { BaseResponse, PassengerDataAccess, PaymentStatus } from '@core/types';
import { JalaliPipe } from '@core/pipes';
import moment  from 'jalali-moment';
moment.locale('fa')

@Component({
  selector: 'app-passenger-list',
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
    ReactiveFormsModule,
    FormsModule,
    JalaliPipe,
    HttpClientModule],
  providers: [MessageService, PassengerDataAccessService],
  templateUrl: './passenger-list.component.html',
  styleUrl: './passenger-list.component.scss'
})
export class PassengerListComponent {
  passengerDialogCreate: boolean = false;
  passengerDialogEdit: boolean = false;
  deletePassengerDialog: boolean = false;
  public get formDialog(): boolean {
    return this.passengerDialogCreate || this.passengerDialogEdit;
  }
  public set formDialog(value: boolean) {
    this.passengerDialogCreate = value;
    this.passengerDialogEdit = value;
  }
  passengers: PassengerDataAccess[] = [];
  passenger: PassengerDataAccess = {} as PassengerDataAccess;
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  private _passengerService = inject(PassengerDataAccessService)
  protected passengerForm = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    nationalID: new FormControl<string>('', [Validators.required]),
    nationalityType: new FormControl<string>('', [Validators.required]),
    phoneNumber: new FormControl<string>('', [Validators.required]),
    birthDate: new FormControl<Date>(new Date(), [Validators.required]),
    lastEndDate: new FormControl<Date>(new Date(), []),
    lastRegisterNumber: new FormControl<number>(0, []),
    paymentStatus: new FormControl<PaymentStatus>(PaymentStatus.None, []),
  })

  constructor(private messageService: MessageService) {
    this.getPassengers();
  }

  getPassengers() {
    this._passengerService.findAll().subscribe((res: BaseResponse<PassengerDataAccess[]>) => {
      if (res.result.length > 0)
        this.passengers = res.result
      else
        this.messageService.add({ severity: 'error', summary: 'خطا', detail: 'سرویس با خطا مواجه شده لطفاْ بعداْ تلاش کنید', life: 3000 });
    })
  }

  ngOnInit() {
    this.cols = [
      { filed: "firstName", header: 'نام مسافر' },
      { filed: "nationalID", header: 'شماره شناسنامه' },
      { filed: "phoneNumber", header: 'تلفن همراه' },
      { filed: "birthDate", header: 'تاریخ تولد' },
      { filed: "lastEndDate", header: 'آخرین روز' },
      { filed: "lastRegisterNumber", header: 'آخرین شماره ریجستر' },
      { filed: "paymentStatus", header: 'وضعیت پرداخت' }
    ];

    this.statuses = [
      { label: 'تسویه کامل شده', value: PaymentStatus.Settled },
      { label: 'تسویه با آژانس', value: PaymentStatus.PayOffForProvider },
    ];
  }

  openNew() {
    this.passengerForm = new FormGroup({
      firstName: new FormControl<string>('', [Validators.required]),
      lastName: new FormControl<string>('', [Validators.required]),
      nationalID: new FormControl<string>('', [Validators.required]),
      nationalityType: new FormControl<string>('', [Validators.required]),
      phoneNumber: new FormControl<string>('', [Validators.required]),
      birthDate: new FormControl<Date>(new Date(), [Validators.required]),
      lastEndDate: new FormControl<Date>(new Date(), []),
      lastRegisterNumber: new FormControl<number>(0, []),
      paymentStatus: new FormControl<PaymentStatus>(PaymentStatus.None, []),
    });
    this.submitted = false;
    this.passengerDialogCreate = true;
  }


  editPassenger(passenger: PassengerDataAccess) {
    const formControls = this.passengerForm.controls;
    formControls.firstName.setValue(passenger.firstName)
    formControls.lastName.setValue(passenger.firstName)
    formControls.lastEndDate.setValue(passenger.lastEndDate ?? new Date)
    formControls.birthDate.setValue(passenger.birthDate)
    formControls.lastRegisterNumber.setValue(passenger.lastRegisterNumber ?? 0)
    formControls.nationalID.setValue(passenger.nationalID)
    formControls.paymentStatus.setValue(this.statusReverseTranslator(passenger.paymentStatus + ''))
    formControls.phoneNumber.setValue(passenger.phoneNumber)

    this.passengerDialogEdit = true
  }

  deletePassenger(passenger: PassengerDataAccess) {
    this.deletePassengerDialog = true;
    this.passenger = { ...passenger };
  }

  confirmDelete() {
    this.deletePassengerDialog = false;
    this._passengerService.findByIdAndDelete(this.passenger.nationalID).subscribe(res => {
      if (res.result) {
        this.messageService.add({ severity: 'success', summary: 'حذف مسافر', detail: 'مسافر با موفقیت حذف گردید', life: 3000 });
        this.getPassengers();
      } else
        this.messageService.add({ severity: 'error', summary: 'حذف مسافر', detail: 'حذف مسافر با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });
    })
    this.passenger = {} as PassengerDataAccess;
  }

  hideDialog() {
    this.passengerDialogEdit = false;
    this.passengerDialogCreate = false;
    this.submitted = false;
  }

  saveForm() {
    if (this.passengerDialogEdit) {
      this.updatePassenger();
    }
    if (this.passengerDialogCreate) {
      this.savePassenger()
    }
  }

  savePassenger() {
    this.passengerForm.updateValueAndValidity();
    if (this.passengerForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'اضافه کردن مسافر', detail: 'فیلد‌های ورود اطلاعات با خطا مواجه شدن، لطفاْ دوباره سعی کنید', life: 3000 });
      return;
    }
    const passengerPayload: PassengerDataAccess = {
      firstName: this.passengerForm.value.firstName ?? '',
      lastName: this.passengerForm.value.lastName ?? '',
      nationalID: this.passengerForm.value.nationalID ?? '',
      nationalityType: this.passengerForm.value.nationalityType ?? '',
      phoneNumber: this.passengerForm.value.phoneNumber ?? '',
      birthDate: this.passengerForm.value.birthDate ? moment(this.passengerForm.value.birthDate, 'jYYYY-jMM-DD').toDate() : moment().toDate(),
      lastEndDate:  moment(this.passengerForm.value.lastEndDate ?? '', 'jYYYY-jMM-DD').toDate() ?? moment().toDate(),
      lastRegisterNumber: this.passengerForm.value.lastRegisterNumber ? +this.passengerForm.value.lastRegisterNumber : 0,
      paymentStatus: this.statusReverseTranslator(this.passengerForm.value.paymentStatus + '') ?? PaymentStatus.None,
    }
    this._passengerService.create(passengerPayload).subscribe(res => {
      if (res.result) {
        this.messageService.add({ severity: 'success', summary: 'اضافه کردن مسافر', detail: 'مسافر با موفقیت ذخیره گردید', life: 3000 });
        this.getPassengers();
      }
      else
        this.messageService.add({ severity: 'error', summary: 'اضافه کردن مسافر', detail: 'اضافه کردن مسافر با خطا مواجه شد، لطفاْ دوباره سعی کنید', life: 3000 });
    })
  }

  updatePassenger() {
    this.passengerForm.updateValueAndValidity();
    if (this.passengerForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'اضافه کردن مسافر', detail: 'فیلد‌های ورود اطلاعات با خطا مواجه شدن، لطفاْ دوباره سعی کنید', life: 3000 });
      return;
    }
    const passengerPayload: PassengerDataAccess = {
      firstName: this.passengerForm.value.firstName ?? '',
      lastName: this.passengerForm.value.lastName ?? '',
      nationalID: this.passengerForm.value.nationalID ?? '',
      nationalityType: this.passengerForm.value.nationalityType ?? '',
      phoneNumber: this.passengerForm.value.phoneNumber ?? '',
      birthDate: this.passengerForm.value.birthDate ? moment(this.passengerForm.value.birthDate, 'jYYYY-jMM-DD').toDate() : moment().toDate(),
      lastEndDate: moment(this.passengerForm.value.lastEndDate ?? '', 'jYYYY-jMM-DD').toDate() ?? moment().toDate(),
      lastRegisterNumber: this.passengerForm.value.lastRegisterNumber ? +this.passengerForm.value.lastRegisterNumber : 0,
      paymentStatus: this.statusReverseTranslator(this.passengerForm.value.paymentStatus + '') ?? PaymentStatus.None,
    }
    this._passengerService.findByIdAndUpdate(passengerPayload.nationalID, passengerPayload).subscribe(res => {
      if (res.result) {
        this.messageService.add({ severity: 'success', summary: 'اضافه کردن مسافر', detail: 'مسافر با موفقیت ذخیره گردید', life: 3000 });
        this.getPassengers();
      }
      else
        this.messageService.add({ severity: 'error', summary: 'اضافه کردن مسافر', detail: 'اضافه کردن مسافر با خطا مواجه شد، لطفاْ دوباره سعی کنید', life: 3000 });
    })
  }

  findIndexById(passengerID: string): number {
    let index = -1;
    // for (let i = 0; i < this.passengers.length; i++) {
    //   if (this.passengers[i].passengerID === passengerID) {
    //     index = i;
    //     break;
    //   }
    // }
    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    // table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  statusTranslator(status: PaymentStatus): string {
    if (status === PaymentStatus.Settled)
      return 'تسویه کامل'
    if (status === PaymentStatus.PayOffForProvider)
      return 'تسویه با آژانس'
    return '-'
  }

  statusReverseTranslator(status: string): PaymentStatus {
    if (status === this.statusTranslator(PaymentStatus.Settled))
      return PaymentStatus.Settled
    if (status === this.statusTranslator(PaymentStatus.PayOffForProvider))
      return PaymentStatus.PayOffForProvider
    return PaymentStatus.None
  }
}
