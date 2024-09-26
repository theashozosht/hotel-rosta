import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { GenderType, ReserveDataAccessDTO } from '@core/types';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { AgencyDataAccessService, ReserveDataAccessService, RoomDataAccessService } from '@core/services';
import { HttpClientModule } from '@angular/common/http';
import  moment from 'jalali-moment';
moment.locale('fa')

@Component({
  selector: 'app-reserve-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    ToastModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    MessageService,
    ReserveDataAccessService,
    AgencyDataAccessService,
    RoomDataAccessService
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class ReserveFormComponent {
  private _messageService = inject(MessageService);
  private _reserveService = inject(ReserveDataAccessService);
  private _agencyService = inject(AgencyDataAccessService);
  private _roomService = inject(RoomDataAccessService);

  protected roomsFormGroup = new FormGroup({
    roomNumber: new FormControl<{
      name: number,
      code: number
    }>({
      name: 101,
      code: 101
    }, [Validators.required]
    ),
    roomType: new FormControl('', [Validators.required]),
    registerId: new FormControl<number>(0, [Validators.required]),
    roomPrice: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    reservedBy: new FormControl('', [Validators.required]),
    receivedBy: new FormControl('', [Validators.required]),
  })
  protected passengerFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    nationalID: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    birthLocation: new FormControl('', [Validators.required]),
    nationalityType: new FormControl('', [Validators.required]),
    genderType: new FormControl<{
      name: string,
      code: GenderType
    }>(
      {
        name: 'مرد',
        code: GenderType.Male
      }, [Validators.required]
    ),
  });
  protected agencyFormGroup = new FormGroup({
    agencyName: new FormControl<{ name: string, code: number }>({
      name: 'نام آژانس',
      code: 0
    }, [Validators.required])
  })

  protected readonly genderTypes: Array<{ name: string, code: GenderType }> = [
    { name: 'مرد', code: GenderType.Male },
    { name: 'زن', code: GenderType.Female }
  ];
  protected readonly agencyNames: Array<{ name: string, code: number }> = []
  protected readonly roomNumbers: Array<{ name: number, code: number }> = []

  constructor() {
    this._agencyService.findAll().subscribe(res => {
      if (res.result) {
        res.result.forEach(item => {
          this.agencyNames.push({ name: item.agencyName, code: Number(item.agencyCode) })
        })
      } else {
        this._messageService.add({ severity: 'error', summary: 'خطا در برقراری ارتباط', detail: 'برقراری ارتباط برای آژانس‌ها با خطا مواجه شد لطفاْ صفحه را رفرش کنید و مجدد تلاش نمایید', life: 3000 });
      }
    })
    this._roomService.findAll().subscribe(res => {
      if (res.result) {
        res.result.forEach(item => {
          if (!item.isRoomFull)
            this.roomNumbers.push({ name: item.roomNumber, code: Number(item.roomNumber) })
        })
      } else {
        this._messageService.add({ severity: 'error', summary: 'خطا در برقراری ارتباط', detail: 'برقراری ارتباط برای اتاق‌ها با خطا مواجه شد لطفاْ صفحه را رفرش کنید و مجدد تلاش نمایید', life: 3000 });
      }
    })
  }

  saveInformation() {
    this.roomsFormGroup.markAllAsTouched();
    this.passengerFormGroup.markAllAsTouched();

    if (this.roomsFormGroup.invalid || this.roomsFormGroup.invalid) {
      this._messageService.add({ severity: 'error', summary: 'اطلاعات ناقص', detail: 'اطلاعات فرم را مجددا چک کنید و از صحت آن اطمینان حاصل فرمایید', life: 3000 });
      return;
    }

    const reserveEntity: ReserveDataAccessDTO = {
      roomNumber: this.roomsFormGroup.value.roomNumber?.code ? Number(this.roomsFormGroup.value.roomNumber?.code) : 101,
      roomDescription: this.roomsFormGroup.value.roomType as string,
      roomPrice: this.roomsFormGroup.value.roomPrice as string,
      startDate: this.roomsFormGroup.value.startDate ? moment(this.roomsFormGroup.value.startDate, 'jYYYY-jMM-DD').toDate() : moment().toDate(),
      endDate: this.roomsFormGroup.value.endDate ? moment(this.roomsFormGroup.value.endDate, 'jYYYY-jMM-DD').toDate() : moment().toDate(),
      reservedBy: this.roomsFormGroup.value.reservedBy ?? '',
      receivedBy: this.roomsFormGroup.value.receivedBy ?? '',
      hasAlternatePassengers: false,
      agencyCode: this.agencyFormGroup.value.agencyName?.code ?? 0,
      registerId: this.roomsFormGroup.value.registerId ? +this.roomsFormGroup.value.registerId : 0,
      passenger: {
        birthDate: moment(this.passengerFormGroup.value.birthDate as string, 'jYYYY-jMM-DD').toDate(),
        firstName: this.passengerFormGroup.value.firstName as string,
        lastName: this.passengerFormGroup.value.lastName as string,
        nationalID: this.passengerFormGroup.value.nationalID as string,
        nationalityType: this.passengerFormGroup.value.nationalityType as string,
        phoneNumber: this.passengerFormGroup.value.phoneNumber as string
      },
    }
    this._reserveService.create(reserveEntity).subscribe((res) => console.log(res))
  }
}
