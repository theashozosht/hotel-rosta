import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AgencyDataAccessService, RoomDataAccessService } from '@core/services';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RoomDataAccess } from '@core/types';
import { JalaliPipe } from '@core/pipes';
import moment from 'jalali-moment'

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,
    DialogModule,
    HttpClientModule,
    ReactiveFormsModule],
  providers: [
    MessageService,
    RoomDataAccessService,
    AgencyDataAccessService,
    JalaliPipe
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  private _roomsService = inject(RoomDataAccessService)
  private _agencyService = inject(AgencyDataAccessService)
  private _messageService = inject(MessageService)
  private _activatedRoute = inject(ActivatedRoute)
  private _jalaliPipe = inject(JalaliPipe)
  private roomFromApi!: RoomDataAccess;

  protected roomFormGroup = new FormGroup({
    agencyName: new FormControl<{ name: string, code: number }>({ name: 'نام آژانس', code: 0 }, [Validators.required]),
    reservedFrom: new FormControl<string | Date>('', [Validators.required]),
    reservedUntil: new FormControl<string | Date>('', [Validators.required]),
    roomNumber: new FormControl<number>({ disabled: true, value: 0 }, [Validators.required]),
    isRoomFull: new FormControl<string>({ disabled: true, value: 'حاوی مسافر' }, [Validators.required])
  })

  protected readonly agencyNames: Array<{ name: string, code: number }> = []

  constructor() {
    const roomId = this._activatedRoute.snapshot.params['id']
    this._agencyService.findAll().subscribe(res => {
      if (res.result) {
        res.result.forEach(item => {
          this.agencyNames.push({ name: item.agencyName, code: Number(item.agencyCode) })
        })
      } else {
        this._messageService.add({ severity: 'error', summary: 'خطا در برقراری ارتباط', detail: 'برقراری ارتباط برای آژانس‌ها با خطا مواجه شد لطفاْ صفحه را رفرش کنید و مجدد تلاش نمایید', life: 3000 });
      }
    })

    this._roomsService.findById(roomId).subscribe(res => {
      if (res.result) {
        this.roomFromApi = res.result
        const formControls = this.roomFormGroup.controls
        formControls.agencyName.setValue({ name: res.result.agencyName, code: 0 })
        formControls.reservedFrom.setValue(moment(res.result.reservedFrom).locale('fa').format('YYYY-MM-DD'));
        formControls.reservedUntil.setValue(moment(res.result.reservedFrom).locale('fa').format('YYYY-MM-DD'));
        formControls.roomNumber.setValue(res.result.roomNumber);
        formControls.isRoomFull.setValue(res.result.isRoomFull ? 'حاوی مسافر' : 'فاقد مسافر')
      } else {
        this._messageService.add({ severity: 'error', summary: 'خطا در برقراری ارتباط', detail: 'برقراری ارتباط برای آژانس‌ها با خطا مواجه شد لطفاْ صفحه را رفرش کنید و مجدد تلاش نمایید', life: 3000 });
      }
    })
  }

  saveInformation() {
    this.roomFormGroup.markAllAsTouched();

    if (this.roomFormGroup.invalid || this.roomFormGroup.invalid) {
      this._messageService.add({ severity: 'error', summary: 'اطلاعات ناقص', detail: 'اطلاعات فرم را مجددا چک کنید و از صحت آن اطمینان حاصل فرمایید', life: 3000 });
      return;
    }
    const roomEntity: RoomDataAccess = {
      agencyName: String(this.roomFormGroup.controls.agencyName.value?.name),
      reservedFrom: moment(this.roomFormGroup.controls.reservedFrom.value as string, 'jYYYY-jMM-DD').toDate(),
      reservedUntil: moment(this.roomFormGroup.controls.reservedUntil.value as string,  'jYYYY-jMM-DD').toDate(),
      isRoomFull: this.roomFromApi.isRoomFull,
      passengers: this.roomFromApi.passengers,
      roomNumber: this.roomFromApi.roomNumber,
    }
    this._roomsService.findByIdAndUpdate(String(this.roomFromApi.roomNumber), roomEntity).subscribe((res) => console.log(res))
  }
}
