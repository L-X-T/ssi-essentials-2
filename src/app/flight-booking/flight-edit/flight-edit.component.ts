import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { Flight } from '../../entities/flight';
import { FlightService } from '../flight-search/flight.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnChanges, OnInit, OnDestroy {
  @Input() flight: Flight | undefined | null;

  editForm: FormGroup = this.fb.group({
    id: [0, Validators.required, []],
    from: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        updateOn: 'blur'
      },
      []
    ],
    to: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
        updateOn: 'blur'
      },
      []
    ],
    date: ['', [Validators.required, Validators.minLength(33), Validators.maxLength(33)], []]
  });

  message = '';

  private valueChangesSubscription: Subscription | undefined;
  private saveFlightSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private flightService: FlightService) {}

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
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription?.unsubscribe();
    this.saveFlightSubscription?.unsubscribe();
  }

  save(): void {
    this.saveFlightSubscription = this.flightService.save(this.editForm.value).subscribe({
      next: (flight) => {
        this.message = 'Success!';
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error', err);
        this.message = 'Error!';
      }
    });
  }
}
