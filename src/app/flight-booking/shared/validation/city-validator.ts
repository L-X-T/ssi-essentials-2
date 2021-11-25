import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateCity(validCities: string[]): ValidatorFn {
  // const validCities: string[] = ['Graz', 'Wien', 'Hamburg', 'Berlin'];
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value && validCities.indexOf(c.value) === -1) {
      return {
        city: {
          actualCity: c.value,
          validCities: validCities
        }
      };
    }

    return null;
  };
}
