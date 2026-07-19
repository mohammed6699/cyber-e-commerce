import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appButton]',
})
export class Button {
 
  @HostBinding('class')
  readonly btnstyle = 'text-[15px] rounded-md bg-black text-white px-2 py-1'
}
