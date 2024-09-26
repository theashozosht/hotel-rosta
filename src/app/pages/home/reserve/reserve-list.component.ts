import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { of } from 'rxjs';
import { ReserveList } from './models/interfaces/reserve.interface';
import { JalaliPipe } from '@core/pipes';
import { ReserveDataAccessService } from '../../../core/services/reserve';
import { ReserveDataAccess } from '../../../core/types/DTOs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-crud',
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
    JalaliPipe,
    RouterModule
  ],
  providers: [MessageService, ReserveDataAccessService],
  templateUrl: './reserve-list.component.html',
  styleUrl: './reserve-list.component.scss'
})
export class ReserveCrudComponent {
  private _reserveService = inject(ReserveDataAccessService);
  private _router = inject(Router);
  reserves: ReserveDataAccess[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getAllReserves();

    this.cols = [
      { field: 'reserveCode', header: 'کد رزرو' },
      { field: 'roomNumber', header: 'شماره اتاق' },
      { field: 'passengers', header: 'نام مسافر' },
      { field: 'startDate', header: 'شروع رزرو' },
      { field: 'endDate', header: 'اتمام رزرو' },
      { field: 'reservedBy', header: 'کاربر ورود' },
      { field: 'receivedBy', header: 'کاربر خروج' },
    ];

  }

  getAllReserves() {
    this._reserveService.findAll().subscribe(res => {
      if (res.result.length > 0)
        this.reserves = res.result
      else
        this.messageService.add({ severity: 'error', summary: 'خطا', detail: 'سرویس با خطا مواجه شده لطفاْ بعداْ تلاش کنید', life: 3000 });
    });
  }

  editReserve(reserveCode: number): any {
    this._router.navigate(['/dashboard/reserve/' + reserveCode]);
  }

  deleteReserve(reserveCode: number) {
    this._reserveService.findByIdAndDelete(+reserveCode).subscribe(res => {
      if (res.result) {
        this.messageService.add({ severity: 'success', summary: 'حذف رزرو', detail: 'رزرو با موفقیت حذف گردید', life: 3000 });
        this.getAllReserves();
      } else
        this.messageService.add({ severity: 'error', summary: 'حذف رزرو', detail: 'حذف رزرو با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'حذف رزرو', detail: 'حذف رزرو با خطا مواجه شده لطفاْ دوباره تلاش کنید', life: 3000 });

    })
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
