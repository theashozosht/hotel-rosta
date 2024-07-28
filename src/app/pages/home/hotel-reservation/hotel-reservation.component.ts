import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-hotel-reservation',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './hotel-reservation.component.html',
  styleUrl: './hotel-reservation.component.scss',
})
export class HotelReservationComponent implements OnInit {
  private roomList: Array<string> = [
    '101',
    '102',
    '103',
    '201',
    '202',
    '203',
    '301',
    '302',
    '303',
    '401',
    '402',
    '403',
  ];
  private monthDaysNo: number = 31;
  protected monthName: string = 'مرداد';
  protected tableData: Array<any> = [
    {
      roomNo: '101',
      days: [
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
      ],
    },
    {
      roomNo: '102',
      days: [
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
      ],
    },
    {
      roomNo: '103',
      days: [
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
      ],
    },
    {
      roomNo: '201',
      days: [
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
      ],
    },
    {
      roomNo: '202',
      days: [
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
      ],
    },
    {
      roomNo: '203',
      days: [
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
      ],
    },
    {
      roomNo: '301',
      days: [
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
      ],
    },
    {
      roomNo: '302',
      days: [
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          hasClient: false,
        },
      ],
    },
    {
      roomNo: '303',
      days: [
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          clientName: 'یاسین سطوتی',
          hasClient: true,
          daysForReservation: 4,
          providerName: 'جاباما',
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
        {
          hasClient: false,
        },
      ],
    },
  ];
  protected tableHeaders: Array<any> = [];

  ngOnInit(): void {
    this.createHeaders();
  }

  createHeaders(): void {
    this.tableHeaders.push('اسم اتاق');
    for (let i = 1; i <= this.monthDaysNo; i++) {
      this.tableHeaders.push(i);
    }
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
