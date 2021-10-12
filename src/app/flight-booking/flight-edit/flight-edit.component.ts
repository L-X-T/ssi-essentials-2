import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { Flight } from '../../entities/flight';
import { FlightService } from '../flight-search/flight.service';

@Component({
  selector: 'flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnChanges, OnInit, OnDestroy {
  @Input() flight: Flight | undefined | null;

  editForm: FormGroup;

  message = '';

  private valueChangesSubscription: Subscription | undefined;
  private saveFlightSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private flightService: FlightService) {
    this.editForm = this.fb.group({
      id: [0],
      from: [''],
      to: [''],
      date: ['']
    });
  }

  ngOnChanges(): void {
    if (this.flight) {
      this.editForm.patchValue({ ...this.flight });
    }
  }

  ngOnInit(): void {
    this.valueChangesSubscription = this.editForm.valueChanges.subscribe((value) => {
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
