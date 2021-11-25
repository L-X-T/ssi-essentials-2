import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'input[city]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CityValidatorDirective, multi: true }]
})
export class CityValidatorDirective implements Validator {
  // validCities = ['Graz', 'Wien', 'Hamburg', 'Berlin'];

  @Input() city: string[] = [];

  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value && this.city.indexOf(c.value) === -1) {
      return {
        city: {
          actualValue: c.value,
          validCities: this.city
        }
      };
    }

    return null; // no error
  }
}
