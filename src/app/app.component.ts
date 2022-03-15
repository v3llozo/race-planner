import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tyre, tyres } from './tyre-laps/tyres';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Race Planner';
  @Input() totalLaps: number = 30;
  @Input() tyres: Tyre[] = tyres;
  @Input() stints: Tyre[] = [];
  @Output() changeTotalLaps: any;
  @Output() tyresChange = new EventEmitter<Tyre[]>();
  @Output() stintsChange = new EventEmitter<Tyre[]>();
  stratTotalLaps: number = 0;

  constructor() {}
}
