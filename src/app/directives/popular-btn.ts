import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appPopularBtn]',
})
export class PopularBtn {
  @HostBinding('class')
  readonly baseClasses = 'rounded-[6px] border-1 px-4 py-2';

  

}
