import { Component } from '@angular/core';
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
import { GenderType } from '@core/types';

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
    InputTextModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class ReserveFormComponent {
  protected roomsFormGroup = new FormGroup({
    roomNumber: new FormControl('', [Validators.required]),
    roomType: new FormControl('', [Validators.required]),
    registerId: new FormControl('', [Validators.required]),
    roomPrice: new FormControl('', [Validators.required]),
    reserveStart: new FormControl('', [Validators.required]),
    reserveEnd: new FormControl('', [Validators.required]),
    reservedBy: new FormControl('', [Validators.required]),
    receivedBy: new FormControl('', [Validators.required]),
    reserveCode: new FormControl({ value: '', disabled: true }, []),
  })
  protected passengerFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    fathersName: new FormControl('', [Validators.required]),
    nationalNumber: new FormControl('', [Validators.required]),
    nationalId: new FormControl('', [Validators.required]),
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
}
