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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseResponse, PassengerDataAccess, PaymentStatus } from '@core/types';
import { JalaliPipe } from '@core/pipes';
import moment  from 'jalali-moment';
import { RouterModule } from '@angular/router';
moment.locale('fa')

@Component({
  selector: 'app-passenger-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
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
    JalaliPipe,
    RouterModule,
    HttpClientModule
    ],
  providers: [MessageService, PassengerDataAccessService],
  templateUrl: './passenger-list.component.html',
  styleUrl: './passenger-list.component.scss'
})
export class PassengerListComponent {
  deletePassengerDialog: boolean = false;
  passengers: PassengerDataAccess[] = [];
  passenger: PassengerDataAccess = {} as PassengerDataAccess;
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
  passengerDialogEdit = false;
  submitted = false;

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
    this.submitted = false;
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
