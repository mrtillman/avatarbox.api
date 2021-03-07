export class ValueRange {
  public value: any;
  constructor(min: any, max: any, value: any = null) {
    this.value = value || min;
    if (value < min || value > max) {
      this.value = min;
    }
  }
}
