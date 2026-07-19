import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleSlice',
})
export class TitleSlicePipe implements PipeTransform {
  transform(value: string | undefined, limit: number, trail: string = '...'): unknown {
    if(!value) return '';
    if(value.length < limit){
      return value
    }
    return value.substring(0, limit) + trail;
  }
}
