import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
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
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyDataAccess, AgencyDataAccessDTO, AgencyStatus, ContractTypes } from '@core/types';

@Component({
  selector: 'app-provider-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    ColorPickerModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [MessageService, AgencyDataAccessService],
  templateUrl: './agency-form.component.html',
  styleUrl: './agency-form.component.scss'
})
export class AgencyFormComponent {
  private _messageService = inject(MessageService);
  private _agencyService = inject(AgencyDataAccessService);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  protected agencyFormGroup = new FormGroup({
    agencyName: new FormControl<string>('', Validators.required),
    agencyCode: new FormControl<string>('', Validators.required),
    agencyStatus: new FormControl<{ name: string, code: number }>({
      name: 'باز',
      code: AgencyStatus.Open
    }, Validators.required),
    contractType: new FormControl<{ name: string, code: number }>({
      name: 'اتاق',
      code: ContractTypes.Room
    }, Validators.required),
    // hasCredit: new FormControl<boolean>(false, Validators.required),
    creditLeft: new FormControl<number>(0, Validators.required),
    manager: new FormControl<string>('', Validators.required),
    coordinator: new FormControl<string>('', Validators.required),
    address: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    color: new FormControl<string>('', Validators.required),
    telephone: new FormControl<string>('', []),
  })

  protected readonly contractTypes: Array<{ name: string, code: ContractTypes }> = [
    { name: 'بدون قرارداد', code: ContractTypes.None },
    { name: 'اتاق', code: ContractTypes.Room },
    { name: 'اتاق با صبحانه', code: ContractTypes.RoomWithBreakfast }
  ];
  protected readonly agencyStatus: Array<{ name: string, code: AgencyStatus }> = [
    { name: 'باز', code: AgencyStatus.Open },
    { name: 'غیرفعال', code: AgencyStatus.NotAvailable },
    { name: 'بسته', code: AgencyStatus.Closed },
  ];
  private nationalIdFromRoute!: string;

  constructor() {
    this.nationalIdFromRoute = this._activatedRoute.snapshot.params['nationalID']
    if (this.nationalIdFromRoute) {
      this.getById(+this.nationalIdFromRoute)
    }
  }

  getById(nationalID: number) {
    this._agencyService.findById(nationalID.toString()).subscribe(res => {
      if (res.result) {
        this.agencyFormGroup.setValue({
          agencyName: res.result.agencyName,
          agencyCode: res.result.agencyCode.toString(),
          agencyStatus: this.agencyStatusTranslator(res.result.agencyStatus),
          contractType: this.contractTypeTranslator(res.result.contractType),
          creditLeft: res.result.creditLeft,
          manager: res.result.manager,
          coordinator: res.result.coordinator,
          address: res.result.address,
          phoneNumber: res.result.phoneNumber,
          color: res.result.color,
          telephone: res.result.telephone ?? null
        })
      } else {
        this._messageService.add({ severity: 'error', summary: ' آژانس', detail: ' آژانس با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });

      }
    }, err => {
      this._messageService.add({ severity: 'error', summary: ' آژانس', detail: ' آژانس با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });

    })
  }

  saveInformation() {
    this.agencyFormGroup.markAllAsTouched();

    if (this.agencyFormGroup.invalid) {
      this._messageService.add({ severity: 'error', summary: 'اطلاعات ناقص', detail: 'اطلاعات فرم را مجددا چک کنید و از صحت آن اطمینان حاصل فرمایید', life: 3000 });
      return;
    }


    const agencyEntity: AgencyDataAccessDTO = {
      agencyName: this.agencyFormGroup.value.agencyName ?? '',
      agencyCode: this.agencyFormGroup.value.agencyCode ?? '',
      agencyStatus: this.agencyFormGroup.value.agencyStatus?.code ?? 0,
      contractType: this.agencyFormGroup.value.contractType?.code ?? 0,
      hasCredit: this.agencyFormGroup.value.creditLeft && this.agencyFormGroup.value.creditLeft > 0 ? true : false,
      creditLeft: this.agencyFormGroup.value.creditLeft ?? 0,
      manager: this.agencyFormGroup.value.manager ?? '',
      coordinator: this.agencyFormGroup.value.coordinator ?? '',
      address: this.agencyFormGroup.value.address ?? '',
      phoneNumber: this.agencyFormGroup.value.phoneNumber ?? '',
      color: this.agencyFormGroup.value.color ?? '',
    }
    if (this.nationalIdFromRoute) this.updateAgency(this.nationalIdFromRoute, agencyEntity)
    else this.createAgency(agencyEntity)
  }

  createAgency(agencyEntity: AgencyDataAccessDTO) {
    this._agencyService.create(agencyEntity).subscribe((res) => {
      if (res.result) {
        this._messageService.add({ severity: 'success', summary: 'ثبت آژانس', detail: 'آژانس با شماره ' + res.result.agencyCode + 'با موفقیت انجام شد', life: 3000 })
      } else {
        this._messageService.add({ severity: 'error', summary: 'ثبت آژانس', detail: 'ثبت آژانس با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });

      }
    }, err => {
      this._messageService.add({ severity: 'error', summary: 'ثبت آژانس', detail: 'ثبت رزرو با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });
    })
  }

  updateAgency(nationalID: string, agencyEntity: AgencyDataAccessDTO) {
    this._agencyService.findByIdAndUpdate(nationalID, agencyEntity).subscribe((res) => {
      if (res.result) {
        this._messageService.add({ severity: 'success', summary: 'ثبت آژانس', detail: 'آژانس با شماره ' + res.result.agencyCode + 'با موفقیت انجام شد', life: 3000 })
      } else {
        this._messageService.add({ severity: 'error', summary: 'ثبت آژانس', detail: 'ثبت آژانس با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });

      }
    }, err => {
      this._messageService.add({ severity: 'error', summary: 'ثبت آژانس', detail: 'ثبت رزرو با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });
    })
  }

  agencyStatusTranslator(agencyStatus: AgencyStatus): {
    name: string;
    code: AgencyStatus;
  } {
    const agency = this.agencyStatus.find(agency => agency.code === agencyStatus)
    if (agency)
      return agency
    else
      return {
        name: '',
        code: AgencyStatus.NotAvailable
      }
  }
  contractTypeTranslator(contractType: ContractTypes): {
    name: string;
    code: ContractTypes;
  } {
    const contract = this.contractTypes.find(agency => agency.code === contractType)
    if (contract)
      return contract
    else
      return {
        name: '',
        code: ContractTypes.None
      }
  }
}
