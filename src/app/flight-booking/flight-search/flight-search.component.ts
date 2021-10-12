import { Component, OnDestroy, OnInit } from '@angular/core';

import { Flight } from '../../entities/flight';
import { FlightService } from './flight.service';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { share, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit, OnDestroy {
  from = '';
  to = 'Hamburg';

  minLength = 3;
  maxLength = 15;

  flights: Flight[] = [];
  flights$: Observable<Flight[]> | undefined;
  flightsSubscription: Subscription | undefined;

  selectedFlight: Flight | undefined | null;

  message = '';

  onDestroySubject = new Subject<void>();

  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(private flightService: FlightService) {}

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

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  save(): void {
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
  }
}
