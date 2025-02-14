import {Pipe, PipeTransform} from '@angular/core';
import {Time} from '../../shared/models/time.model';


@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: Time, ...args: unknown[]): unknown {
    if (value.hour < 0 || value.minute < 0) {
      return '';
    }

    const hour = value.hour < 10 ? `0${value.hour}` : value.hour;
    const minute = value.minute < 10 ? `0${value.minute}` : value.minute;

    return `${hour}:${minute}`;
  }

}
