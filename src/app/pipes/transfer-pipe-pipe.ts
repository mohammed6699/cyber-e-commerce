import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transferPipe',
})
export class TransferPipePipe implements PipeTransform {
  transform(value: number): number {
    if (typeof value !== 'number') {
      return value;
    }
    return value * 51.10;
  }
}
