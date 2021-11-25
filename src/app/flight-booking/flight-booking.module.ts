import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightStatusToggleComponent } from './flight-status-toggle/flight-status-toggle.component';
import { FlightValidationErrorsComponent } from './flight-validation-errors/flight-validation-errors.component';
import { CityValidatorDirective } from './shared/validation/city-validator.directive';
import { AsyncCityValidatorDirective } from './shared/validation/async-city-validator.directive';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    FlightSearchComponent,
    FlightCardComponent,
    FlightStatusToggleComponent,
    FlightValidationErrorsComponent,
    CityValidatorDirective,
    AsyncCityValidatorDirective
  ],
  exports: [FlightSearchComponent]
})
export class FlightBookingModule {}
