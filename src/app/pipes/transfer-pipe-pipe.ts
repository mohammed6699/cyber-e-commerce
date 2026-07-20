import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transferPipe',
})
export class TransferPipePipe implements PipeTransform {
  transform(value: number): number {
    if (typeof value !== 'number') {
      return value;
    }
    // transfer price from $ to EGP (assuming 49.5 conversion rate)
    return value * 51.10;
  }
}
