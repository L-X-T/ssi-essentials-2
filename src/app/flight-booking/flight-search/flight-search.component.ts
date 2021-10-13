import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Flight } from '../../entities/flight';
import { FlightService } from '../shared/services/flight.service';

import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { share, takeUntil } from 'rxjs/operators';
import { pattern } from '../../shared/global';

import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit, OnDestroy {
  from = 'Graz';
  to = 'Hamburg';

  minLength = 3;
  maxLength = 15;

  flights: Flight[] = [];
  flights$: Observable<Flight[]> | undefined;
  flightsSubscription: Subscription | undefined;

  selectedFlight: Flight | undefined | null;
  flightToEdit: Flight | undefined | null;
  pattern = pattern;

  message = '';

  onDestroySubject = new Subject<void>();

  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  @ViewChild('flightSearchForm') flightSearchForm: FormGroup | undefined;

  constructor(private flightService: FlightService, private router: Router) {}

  ngOnInit(): void {
    if (this.from && this.to) {
      this.search();
    }
  }

  ngOnDestroy(): void {
    // 4. my unsubscribe
    // this.flightsSubscription?.unsubscribe();

    // const my$ = this.onDestroySubject.asObservable();
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }

  search(): void {
    if (this.flightSearchForm && (!this.from || !this.to || this.flightSearchForm.invalid)) {
      this.markFormGroupDirty(this.flightSearchForm);
      return;
    }

    // 1. my observable
    this.flights$ = this.flightService.find(this.from, this.to).pipe(share());

    // 2. my observer
    const flightsObserver: Observer<Flight[]> = {
      next: (flights) => (this.flights = flights),
      error: (errResp) => console.error('Error loading flights', errResp),
      complete: () => console.warn('complete')
    };

    // 3. my subscription
    // this.flightsSubscription = this.flights$.subscribe(flightsObserver);

    this.flights$.pipe(takeUntil(this.onDestroySubject)).subscribe(flightsObserver);
  }

  private markFormGroupDirty(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((c) => c.markAsDirty());
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  /*save(): void {
    if (this.selectedFlight) {
      this.flightService.save(this.selectedFlight).subscribe({
        next: (flight) => {
          this.selectedFlight = flight;
          this.message = 'Success!';
        },
        error: (errResponse) => {
          console.error('Error', errResponse);
          this.message = 'Error!';
        }
      });
    }
  }*/

  updateFlight(updatedFlight: Flight): void {
    // console.warn('FlightSearchComponent - updateFlight()');
    // console.log(updatedFlight);

    this.flights = this.flights.map((flight) => (flight.id === updatedFlight.id ? updatedFlight : flight));
  }

  onEdit(id: number): void {
    this.router.navigate(['/flight-edit', id, { showDetails: true }]);
  }
}
