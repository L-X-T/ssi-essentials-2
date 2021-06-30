import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlightBookingModule } from './flight-booking/flight-booking.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FlightBookingModule],
  declarations: [AppComponent, SidebarComponent, NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
