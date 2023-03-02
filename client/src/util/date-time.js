import * as ds from 'date-fns';

export default class DateTime {
  constructor(dateTime) {
    this.dateTime = new Date(dateTime);
    this.formatShape = 'dd/MM/yyyy HH:mm';
    this.formatedString = this.formatDateTime();
  }

  formatDateTime() {
    return ds.format(this.dateTime, this.formatShape);
  }
  get formatedDate() {
    return this.formatedString.split(' ')[0];
  }
  get formatedTime() {
    return this.formatedString.split(' ')[1];
  }
}
