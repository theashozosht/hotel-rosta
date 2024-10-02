import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AgencyDataAccessService } from '@core/services';
import { HttpClientModule } from '@angular/common/http';
import { AgencyDataAccess, AgencyStatus, BaseResponse, ContractTypes } from '@core/types';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-provider-list',
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
  providers: [MessageService, AgencyDataAccessService],
  templateUrl: './agency-list.component.html',
  styleUrl: './agency-list.component.scss'
})
export class AgencyListComponent {
  agency: AgencyDataAccess[] = [];
  cacheAgency!: AgencyDataAccess; 
  cols: any[] = [
    { field: 'agencyName', header: 'نام آژانس' },
    { field: 'agencyCode', header: 'کد آژانس' },
    { field: 'manager', header: 'مدیر مسئول' },
    { field: 'coordinator', header: 'مسئول هماهنگی' },
    { field: 'telephone', header: 'تلفن ثابت' },
    { field: 'phoneNumber', header: 'تلفن همراه' },
    { field: 'creditLeft', header: 'سقف اعتبار' },
    { field: 'contractType', header: 'نوع قرارداد' },
    { field: 'color', header: 'رنگ اختصاصی' },
  ];
  contractTypes: any[] = [
    { label: 'اتاق', value: ContractTypes.Room },
    { label: 'اتاق با صبحانه', value: ContractTypes.RoomWithBreakfast },
  ];
  agencyStatuses: Array<{ label: string, value: AgencyStatus }> = [
    { label: 'باز', value: AgencyStatus.Open },
    { label: 'بسته', value: AgencyStatus.NotAvailable },
    { label: 'هیچکدام', value: AgencyStatus.Closed }
  ]

  rowsPerPageOptions = [5, 10, 20];
  providerDialog: boolean = false;
  deleteProviderDialog: boolean = false;

  constructor(private messageService: MessageService, private agencyService: AgencyDataAccessService) {
    this.getAllAgencies()
  }

  getAllAgencies() {
    this.agencyService.findAll().subscribe((res: BaseResponse<AgencyDataAccess[]>) => {
      this.agency = res.result
    })
  }

  deleteProvider(provider: AgencyDataAccess) {
    this.deleteProviderDialog = true;
    this.cacheAgency = { ...provider };
  }

  confirmDelete() {
    this.deleteProviderDialog = false;
    this.agencyService.findByIdAndDelete(this.cacheAgency.agencyCode + '').subscribe((res: BaseResponse<AgencyDataAccess>) => {
      this.messageService.add({ severity: 'success', summary: 'موفق', detail: 'آژانس حذف با موفقیت حذف گردید', life: 3000 });
      this.cacheAgency = {} as AgencyDataAccess;
      this.getAllAgencies()
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'خطا', detail: 'در فرایند حذف آژانس به مشکل برخوردیم', life: 3000 });
      this.cacheAgency = {} as AgencyDataAccess;

    })
  }

  hideDialog() {
    this.providerDialog = false;
  }


  contractTranslator(status: ContractTypes): string | number {
    if (status === ContractTypes.Room) {
      return 'اتاق'
    }
    if (status === ContractTypes.RoomWithBreakfast) {
      return 'اتاق با صبحانه'
    }
    return status
  }
}
