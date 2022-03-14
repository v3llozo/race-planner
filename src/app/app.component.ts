import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Race Planner';
  @Input() totalLaps = 30;
  @Input() tyres: Tyre[] = [
    {
      compound: 'soft',
      laps: 7,
    },
    {
      compound: 'medium',
      laps: 11,
    },
    {
      compound: 'hard',
      laps: 15,
    },
  ];
  @Input() stints: Tyre[] = [];
  @Output() tyresChange = new EventEmitter<Tyre[]>();
  @Output() stintsChange = new EventEmitter<Tyre[]>();

  constructor() {
    this.stints.push({
      compound: this.tyres[1].compound,
      laps: this.tyres[1].laps + 0,
    });
  }

  changeTyreLap(c: string, n: number) {
    c == 'soft' ? (this.tyres[0].laps += n) : '';
    c == 'medium' ? (this.tyres[1].laps += n) : '';
    c == 'hard' ? (this.tyres[2].laps += n) : '';
    this.tyresChange.emit(this.tyres);
  }

  changeStintLap(i: number, lap: number) {
    this.stints[i].laps += lap;
    this.stintsChange.emit(this.stints);
  }

  changeCompound(i: number, c: string, t: number) {
    console.log(t);
    let compounds = ['soft', 'medium', 'hard'];
    let target = compounds.indexOf(this.stints[i].compound);
    if (target + t < compounds.length && target + t >= 0) {
      this.stints[i].compound = this.tyres[target + t].compound;
      this.stints[i].laps = this.tyres[target + t].laps;
      this.stintsChange.emit(this.stints);
    }
  }

  addStint() {
    console.log('addStint');
    this.stints.push({
      compound: this.tyres[0].compound,
      laps: this.tyres[0].laps,
    });
    this.stintsChange.emit(this.stints);
  }
  removeStint(i: number) {
    console.log('removeStint', i);
    this.stints.splice(i, 1);
    this.stintsChange.emit(this.stints);
  }
}

export interface Tyre {
  compound: 'soft' | 'medium' | 'hard';
  laps: number;
}
