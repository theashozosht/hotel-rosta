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
import { of } from 'rxjs';
import { ProviderContractType, ProviderListResponse } from './models';

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
    ColorPickerModule
  ],
  providers: [MessageService],
  templateUrl: './provider-crud.component.html',
  styleUrl: './provider-crud.component.scss'
})
export class ProviderCrudComponent {
  providers: ProviderListResponse[] = [];
  provider: ProviderListResponse = {} as ProviderListResponse;
  selectedProviders: any[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  contractTypes: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  providerDialog: boolean = false;
  deleteProviderDialog: boolean = false;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    of([
      {
        providerName: 'جاباما',
        manager: 'آقای محمدی',
        coordinator: 'آقای حسینی',
        address: 'مشهد، بلوار جلال آل احمد، جلال آل احمد ۵۰',
        telephone: '05136145566',
        phoneNumber: '09356186063',
        color: '#55d6b0',
        creditLimit: 90_000_000,
        contractType: ProviderContractType.ContractTypeOfOne,
      },
      {
        providerName: 'جاباما',
        manager: 'آقای محمدی',
        coordinator: 'آقای حسینی',
        address: 'مشهد، بلوار جلال آل احمد، جلال آل احمد ۵۰',
        telephone: '05136145566',
        phoneNumber: '09356186063',
        color: '#9855d6',
        creditLimit: 90_000_000,
        contractType: ProviderContractType.ContractTypeOfTwo,
      },
    ]).subscribe(res => this.providers = res)

    this.cols = [
      { field: 'providerName', header: 'نام آژانس' },
      { field: 'manager', header: 'مدیر مسئول' },
      { field: 'coordinator', header: 'مسئول هماهنگی' },
      { field: 'telephone', header: 'تلفن ثابت' },
      { field: 'phoneNumber', header: 'تلفن همراه' },
      { field: 'creditLimit', header: 'سقف اعتبار' },
      { field: 'contractType', header: 'نوع قرارداد' },
      { field: 'color', header: 'رنگ اختصاصی' },
      { field: 'address', header: 'آدرس' },
    ];

    this.contractTypes = [
      { label: 'تسویه کامل شده', value: ProviderContractType.ContractTypeOfOne },
      { label: 'تسویه با آژانس', value: ProviderContractType.ContractTypeOfTwo },
    ];
  }

  openNew() {
    this.provider = {} as ProviderListResponse;
    this.submitted = false;
    this.providerDialog = true;
  }


  editProvider(provider: ProviderListResponse) {
    this.provider = { ...provider };
    this.providerDialog = true;
  }

  deleteProvider(provider: ProviderListResponse) {
    this.deleteProviderDialog = true;
    this.provider = { ...provider };
  }

  confirmDelete() {
    this.deleteProviderDialog = false;
    this.providers = this.providers.filter(val => val.providerName !== this.provider.providerName);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Provider Deleted', life: 3000 });
    this.provider = {} as ProviderListResponse;
  }

  hideDialog() {
    this.providerDialog = false;
    this.submitted = false;
  }

  saveProvider() {
  }

  findIndexById(providerName: string): number {
    let index = -1;
    for (let i = 0; i < this.providers.length; i++) {
      if (this.providers[i].providerName === providerName) {
        index = i;
        break;
      }
    }
    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  contractTranslator(status: ProviderContractType): string {
    if (status === ProviderContractType.ContractTypeOfOne) {
      return 'قرارداد نوع اول'
    }
    if (status === ProviderContractType.ContractTypeOfTwo) {
      return 'قرارداد نوع دوم'
    }
    return status
  }
}
