import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Flight } from '../../entities/flight';
import { FlightService } from '../shared/services/flight.service';
import { validateCity } from '../shared/validation/city-validator';
import { validateAsyncCity } from '../shared/validation/async-city-validator';
import { validateRoundTrip } from '../shared/validation/round-trip-validator';
import { pattern } from '../../shared/global';

@Component({
  selector: 'flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnChanges, OnInit, OnDestroy {
  @Input() flight: Flight | undefined | null;
  @Output() flightChange = new EventEmitter<Flight>();

  debug = true;
  id = '';
  showDetails = '';

  pattern = pattern;

  editForm: FormGroup = this.fb.group({
    id: [0, Validators.required, []],
    from: [
      '',
      {
        asyncValidators: [validateAsyncCity(this.flightService)],
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(this.pattern),
          validateCity(['Graz', 'Wien', 'Hamburg', 'Berlin'])
        ],
        updateOn: 'blur'
      },
      []
    ],
    to: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(this.pattern),
          validateCity(['Graz', 'Wien', 'Hamburg', 'Berlin'])
        ],
        updateOn: 'blur'
      },
      []
    ],
    date: ['', [Validators.required, Validators.minLength(33), Validators.maxLength(33)], []]
  });

  message = '';

  private valueChangesSubscription: Subscription | undefined;
  private saveFlightSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private flightService: FlightService, private route: ActivatedRoute) {
    this.editForm.validator = validateRoundTrip;
  }

  ngOnChanges(): void {
    if (this.flight) {
      this.editForm.patchValue({ ...this.flight });
    }
  }

  ngOnInit(): void {
    this.valueChangesSubscription = this.editForm.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged((a, b) => a.id === b.id && a.from === b.from && a.to === b.to && a.date === b.date)
      )
      .subscribe((value) => {
        console.log(value);
      });

    this.route.params.subscribe((params) => this.onRouteParams(params));
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription?.unsubscribe();
    this.saveFlightSubscription?.unsubscribe();
  }

  save(): void {
    this.saveFlightSubscription = this.flightService.save(this.editForm.value).subscribe({
      next: (flight) => {
        // console.warn('FlightEditComponent - save()');
        // console.log(flight);

        // this.flight.date = flight.date;
        // this.flight.delayed = flight.delayed;
        // this.flight.from = flight.from;
        // this.flight.id = flight.id;
        // this.flight.to = flight.to;

        this.flightChange.emit(flight);

        this.flight = flight;
        this.message = 'Success saving!';
        this.patchFormValue();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error', err);
        this.message = 'Error saving!';
      }
    });
  }

  private patchFormValue(): void {
    if (this.editForm && this.flight) {
      this.editForm.patchValue(this.flight);
    }
  }

  private onRouteParams(params: Params) {
    this.id = params['id'];
    this.showDetails = params['showDetails'];

    this.flightService.findById(this.id).subscribe({
      next: (flight) => {
        this.flight = flight;
        this.message = 'Success loading!';
        this.patchFormValue();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error', err);
        this.message = 'Error Loading!';
      }
    });
  }
}
