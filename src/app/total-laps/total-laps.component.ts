import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-total-laps',
  templateUrl: './total-laps.component.html',
  styleUrls: ['./total-laps.component.scss'],
})
export class TotalLapsComponent implements OnInit {
  @Input() totalLaps: number = 30;
  @Output() changeTotalLaps = new EventEmitter<any>();
  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {}

  changeLaps(value: any) {
    this.totalLaps = value.target.value;
    this.changeTotalLaps.emit(this.totalLaps);
    return this.changeTotalLaps;
  }
}
