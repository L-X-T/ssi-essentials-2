import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [FlightSearchComponent],
  exports: [FlightSearchComponent]
})
export class FlightBookingModule {}
