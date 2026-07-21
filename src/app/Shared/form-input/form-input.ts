import { NgClass } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form-input',
  imports: [ReactiveFormsModule, TranslatePipe, NgClass],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInput),
      multi: true
    }
  ]
})
export class FormInput implements ControlValueAccessor {
  @Input() control: any;
  @Input() type: string = 'text';
  @Input() InputplaceHolder!: string;
  @Input() inputClasses: string = '';
  value: any = '';
  onChange = (_: any) => {};
  onTouch = () => {};

  writeValue(value: any): void {
    this.value = value;
    
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouch = fn; }
  setDisabledState(isDisabled: boolean): void {}
  onInputChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }
}
