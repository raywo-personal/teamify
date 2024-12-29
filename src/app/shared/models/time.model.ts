export interface Time {

  hour: number;
  minute: number;
  second: number;

}


export function createTime(hour: number, minute: number = 0, second: number = 0): Time {
  return {hour, minute, second};
}


export function addToTime(time: Time, duration: Time): Time {
  let newHour = time.hour + duration.hour;
  let newMinute = time.minute + duration.minute;

  if (newMinute > 59) {
    newMinute -= 60;
    newHour++;
  }

  if (newHour > 23) {
    newHour -= 24;
  }

  return createTime(newHour, newMinute);
}
