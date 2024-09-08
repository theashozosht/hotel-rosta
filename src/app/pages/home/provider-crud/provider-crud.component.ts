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
import { ColorPickerModule } from 'primeng/colorpicker';
import { AgencyDataAccessService } from '@core/services';
import { HttpClientModule } from '@angular/common/http';
import { AgencyDataAccess, AgencyStatus, BaseResponse, ContractTypes } from '@core/types';

@Component({
  selector: 'app-provider-crud',
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
    ColorPickerModule,
    HttpClientModule
  ],
  providers: [MessageService, AgencyDataAccessService],
  templateUrl: './provider-crud.component.html',
  styleUrl: './provider-crud.component.scss'
})
export class ProviderCrudComponent {
  providers: AgencyDataAccess[] = [];
  provider: AgencyDataAccess = {} as AgencyDataAccess;
  selectedProviders: any[] = [];
  submitted: boolean = false;
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
      this.providers = res.result
    })
  }

  openNew() {
    this.provider = {} as AgencyDataAccess;
    this.submitted = false;
    this.providerDialog = true;
  }
  editMode: boolean = false

  editProvider(provider: AgencyDataAccess) {
    this.provider = { ...provider };
    this.editMode = true
    this.providerDialog = true;
  }

  deleteProvider(provider: AgencyDataAccess) {
    this.deleteProviderDialog = true;
    this.provider = { ...provider };
  }

  confirmDelete() {
    this.deleteProviderDialog = false;
    this.agencyService.findByIdAndDelete(this.provider.agencyCode + '').subscribe((res: BaseResponse<AgencyDataAccess>) => {
      this.messageService.add({ severity: 'success', summary: 'موفق', detail: 'آژانس حذف با موفقیت حذف گردید', life: 3000 });
      this.provider = {} as AgencyDataAccess;
      this.getAllAgencies()
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'خطا', detail: 'در فرایند حذف آژانس به مشکل برخوردیم', life: 3000 });
      this.provider = {} as AgencyDataAccess;

    })
  }

  hideDialog() {
    this.providerDialog = false;
    this.editMode = false;
    this.submitted = false;
  }

  saveProvider() {
    if (this.editMode) {
      this.updateAgency()
    } else {
      this.saveAgency()
    }
  }

  updateAgency() {
    const agencyStatusEnum = this.agencyStatuses.findIndex(agency => agency.label === this.provider.agencyStatus as any)
    const contractTypeEnum = this.contractTypes.findIndex(contarct => contarct.label === this.provider.contractType as any)
    if (agencyStatusEnum !== -1)
      this.provider.agencyStatus = this.agencyStatuses[agencyStatusEnum].value

    if (contractTypeEnum !== -1)
      this.provider.contractType = this.contractTypes[contractTypeEnum].value

    this.agencyService.findByIdAndUpdate(this.provider.agencyCode + '', {...this.provider, agencyCode: this.provider.agencyCode + ''}).subscribe((res: BaseResponse<AgencyDataAccess>) => {
      this.messageService.add({ severity: 'success', summary: 'موفق', detail: 'آژانس حذف با موفقیت اضافه گردید', life: 3000 });
      this.getAllAgencies()
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'خطا', detail: 'در فرایند اضافه کردن آژانس به مشکل برخوردیم', life: 3000 });
    })

  }

  saveAgency() {
    const agencyStatusEnum = this.agencyStatuses.findIndex(agency => agency.label === this.provider.agencyStatus as any)
    const contractTypeEnum = this.contractTypes.findIndex(contarct => contarct.label === this.provider.contractType as any)
    if (agencyStatusEnum !== -1)
      this.provider.agencyStatus = this.agencyStatuses[agencyStatusEnum].value

    if (contractTypeEnum !== -1)
      this.provider.contractType = this.contractTypes[contractTypeEnum].value

    this.agencyService.create(this.provider).subscribe((res: BaseResponse<AgencyDataAccess>) => {
      this.messageService.add({ severity: 'success', summary: 'موفق', detail: 'آژانس حذف با موفقیت اضافه گردید', life: 3000 });
      this.getAllAgencies()
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'خطا', detail: 'در فرایند اضافه کردن آژانس به مشکل برخوردیم', life: 3000 });
    })

  }

  findIndexById(agencyName: string): number {
    let index = -1;
    for (let i = 0; i < this.providers.length; i++) {
      if (this.providers[i].agencyName === agencyName) {
        index = i;
        break;
      }
    }
    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
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
