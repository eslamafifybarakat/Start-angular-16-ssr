import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[noMinus]'
})
export class NoMinusDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'Minus') {
      event.preventDefault();
    }
  }
  constructor() { }

}
