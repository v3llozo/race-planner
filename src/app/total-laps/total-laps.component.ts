import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-total-laps',
  templateUrl: './total-laps.component.html',
  styleUrls: ['./total-laps.component.scss'],
})
export class TotalLapsComponent {
  @Input() totalLaps: number = 30;
  @Output() changeTotalLaps = new EventEmitter<any>();

  changeLaps(value: any) {
    this.totalLaps = value.target.value;
    this.changeTotalLaps.emit(this.totalLaps);
    return this.totalLaps;
  }
}
