import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RegisterDataAccessService } from '@core/services';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BaseResponse, ContractTypes, PaymentMethods, RegisterDataAccess } from '@core/types';
@Component({
  selector: 'app-register-crud',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [MessageService, RegisterDataAccessService],
  templateUrl: './register-list.component.html',
  styleUrl: './register-list.component.scss'
})
export class RegisterListComponent {
  private _registerService = inject(RegisterDataAccessService)
  private _messageService = inject(MessageService)
  register: RegisterDataAccess[] = [];
  cacheRegister!: RegisterDataAccess;
  cols: any[] = [
    { field: "registerId", name: "شماره ریجستر" },
    { field: "startDate", name: "تاریخ شروع" },
    { field: "endDate", name: "تاریخ پایان" },
    { field: "paymentMethod", name: "نوع پرداخت" },
    { field: "contractType", name: "نوع قرارداد" },
    { field: "price", name: "قیمت" },
    { field: "paidPrice", name: "پرداخت شده" },
    { field: "reservedBy", name: "مسئول رزرو" },
    { field: "telephoneNumber", name: "تلفن ثابت" },
    { field: "phoneNumber", name: "شماره همراه" },
  ];
  contractTypes: any[] = [
    { label: 'اتاق', value: ContractTypes.Room },
    { label: 'اتاق با صبحانه', value: ContractTypes.RoomWithBreakfast },
  ];
  paymentMethods: Array<{ label: string, value: PaymentMethods }> = [
    { label: 'نقد', value: PaymentMethods.Cash },
    { label: 'کارت', value: PaymentMethods.Deposit },
    { label: 'کارت به کارت', value: PaymentMethods.TransferedWithCard },
    { label: 'ATM', value: PaymentMethods.ATM }
  ]

  rowsPerPageOptions = [5, 10, 20];
  registerDialog: boolean = false;
  deleteRegisterDialog: boolean = false;

  constructor() {
    this.getAllRegisters()
  }

  getAllRegisters() {
    this._registerService.findAll().subscribe((res: BaseResponse<RegisterDataAccess[]>) => {
      this.register = res.result
    })
  }

  deleteRegister(register: RegisterDataAccess) {
    this.deleteRegisterDialog = true;
    this.cacheRegister = { ...register };
  }

  confirmDelete() {
    this.deleteRegisterDialog = false;
    this._registerService.findByIdAndDelete(this.cacheRegister.registerId + '').subscribe((res: BaseResponse<RegisterDataAccess>) => {
      this._messageService.add({ severity: 'success', summary: 'موفق', detail: 'آژانس حذف با موفقیت حذف گردید', life: 3000 });
      this.cacheRegister = {} as RegisterDataAccess;
      this.getAllRegisters()
    }, error => {
      this._messageService.add({ severity: 'error', summary: 'خطا', detail: 'در فرایند حذف آژانس به مشکل برخوردیم', life: 3000 });
      this.cacheRegister = {} as RegisterDataAccess;

    })
  }

  hideDialog() {
    this.registerDialog = false;
  }

  contractTypeTranslator(contractType: ContractTypes) {
    const contractTypeItem = this.contractTypes.find(item => item.value === contractType)
    if(contractTypeItem) return contractTypeItem.label
    else return 'پیش فرض'
  }
  paymentMethodTranslator(paymentMethod: PaymentMethods) {
    const paymentMethodItem = this.paymentMethods.find(item => item.value === paymentMethod)
    if(paymentMethodItem) return paymentMethodItem.label
    else return 'پیش فرض'
  }
}
