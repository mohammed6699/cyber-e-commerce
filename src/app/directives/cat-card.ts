import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appCatCard]',
})
export class CatCard {
  @HostBinding('class')
  readonly basecard = 'grid grid-cols-2 gap-[16px] px-[16px] md:px-0 md:grid-cols-6 w-full h-[128px]'
}
