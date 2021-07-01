import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-flight-status-toggle',
  templateUrl: './flight-status-toggle.component.html',
  styleUrls: ['./flight-status-toggle.component.css']
})
export class FlightStatusToggleComponent {
  @Input() isDelayed = false;
  @Output() isDelayedChange = new EventEmitter<boolean>();

  toggle(): void {
    this.isDelayedChange.emit(!this.isDelayed);
  }
}
