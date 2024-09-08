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
import { GenderType, ReserveDataAccess } from '@core/types';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ReserveDataAccessService } from '@core/services';
import { HttpClientModule } from '@angular/common/http';

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
    ReserveDataAccessService
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class ReserveFormComponent {
  private _messageService = inject(MessageService);
  private _reserveService = inject(ReserveDataAccessService)

  protected roomsFormGroup = new FormGroup({
    roomNumber: new FormControl<number>(0, [Validators.required]),
    roomType: new FormControl('', [Validators.required]),
    registerId: new FormControl('', [Validators.required]),
    roomPrice: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    reservedBy: new FormControl('', [Validators.required]),
    receivedBy: new FormControl('', [Validators.required]),
    reserveCode: new FormControl<number>({ value: 0, disabled: true }, []),
  })
  protected passengerFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    fathersName: new FormControl('', [Validators.required]),
    nationalNumber: new FormControl('', [Validators.required]),
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
    carsPlateNumber: new FormControl('', []),
    postalCode: new FormControl('', []),
    address: new FormControl('', []),
  })

  protected readonly genderTypes = [
    { name: 'مرد', code: GenderType.Male },
    { name: 'زن', code: GenderType.Female }
  ];

  saveInformation() {
    this.roomsFormGroup.markAllAsTouched();
    this.passengerFormGroup.markAllAsTouched();

    if (this.roomsFormGroup.invalid || this.roomsFormGroup.invalid) {
      this._messageService.add({ severity: 'error', summary: 'اطلاعات ناقص', detail: 'اطلاعات فرم را مجددا چک کنید و از صحت آن اطمینان حاصل فرمایید', life: 3000 });
      return;
    }

    const reserveEntity: Omit<ReserveDataAccess, 'agency' | 'register' | 'passengers'> = {
        roomNumber: this.roomsFormGroup.value.roomNumber ?? 0,
        startDate: this.roomsFormGroup.value.startDate ? new Date(this.roomsFormGroup.value.startDate) : new Date(),
        endDate: this.roomsFormGroup.value.endDate ? new Date(this.roomsFormGroup.value.endDate) : new Date(),
        reservedBy: this.roomsFormGroup.value.reservedBy ?? '',
        receivedBy: this.roomsFormGroup.value.receivedBy ?? '',
        reserveCode: this.roomsFormGroup.value.reserveCode ?? 0,
        roomDescription: '',
        hasAlternatePassengers: false
    }
    this._reserveService.create(reserveEntity).subscribe((res) => console.log(res))
  }
}
