import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appEmptysection]',
})
export class Emptysection {
  @HostBinding('class')
  readonly baseDiv = 'flex w-full justify-center py-10';
  @HostBinding('class')
  readonly childClasses = 'text-gray-500'
}
