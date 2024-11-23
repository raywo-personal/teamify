export interface SimpleTime {

  hour: number;
  minute: number;
  second?: number;

}

export class Time implements SimpleTime {

  hour: number = 0;
  minute: number = 0;
  second: number = 0;


  static fromSimpleTime(time: SimpleTime): Time {
    return new Time(time.hour, time.minute);
  }


  constructor(hour?: number, minute?: number) {
    this.hour = hour || 0;
    this.minute = minute || 0;
    this.second = 0;
  }


  public plus(time: Time | SimpleTime): Time {
    let newHour = this.hour + time.hour;
    let newMinute = this.minute + time.minute;

    if (newMinute > 59) {
      newMinute -= 60;
      newHour++;
    }

    if (newHour > 23) {
      newHour -= 24;
    }

    return new Time(newHour, newMinute);
  }


  public compareTo(time: Time | SimpleTime): number {
    if (this.hour !== time.hour) {
      return this.hour - time.hour;
    }

    if (this.minute !== time.minute) {
      return this.minute - time.minute;
    }

    return 0;
  }
}
