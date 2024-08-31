import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'jdate', standalone: true })
export class JalaliPipe implements PipeTransform {
  transform(value: any, format?: 'numericDayWithMonth' | 'short' | 'narrowWeekDay'): string {
    if (!value) {
      return '';
    }
    let date = value;
    if (!(value instanceof Date)) {
      date = new Date(value);
    }
    let options: Intl.DateTimeFormatOptions = {};
    switch (format) {
      case 'short':
        options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        break;

      case 'numericDayWithMonth':
        options = { day: 'numeric', month: 'short' };
        break;

      case 'narrowWeekDay':
        options = { weekday: 'narrow', month: 'long', day: 'numeric' };
        break;

      default:
        options = { weekday: 'long', month: 'long', day: 'numeric' };
        break;
    }

    return date.toLocaleDateString('fa-IR', options);
  }
}
