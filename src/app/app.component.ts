import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Race Planner';
  @Input() totalLaps: number = 30;
  @Output() changeTotalLaps: any;
  @Input() tyres: Tyre[] = [
    {
      compound: 'soft',
      laps: 7,
      threshold: 15,
    },
    {
      compound: 'medium',
      laps: 11,
      threshold: 10,
    },
    {
      compound: 'hard',
      laps: 15,
      threshold: 5,
    },
    {
      compound: 'intermediate',
      laps: 18,
      threshold: 0,
    },
    {
      compound: 'wet',
      laps: 18,
      threshold: 0,
    },
  ];
  @Input() stints: Tyre[] = [];
  @Output() tyresChange = new EventEmitter<Tyre[]>();
  @Output() stintsChange = new EventEmitter<Tyre[]>();
  stratTotalLaps: number = 0;


  changeLaps(value: any) {
    this.totalLaps = value.target.value;
    this.calcStratLaps();
  }

  changeTyreLap(c: string, n: number) {
    c == 'soft' ? (this.tyres[0].laps += n) : '';
    c == 'medium' ? (this.tyres[1].laps += n) : '';
    c == 'hard' ? (this.tyres[2].laps += n) : '';
    c == 'intermediate' ? (this.tyres[3].laps += n) : '';
    c == 'wet' ? (this.tyres[4].laps += n) : '';
    this.tyresChange.emit(this.tyres);
  }

  changeStintLap(i: number, lap: number) {
    this.stints[i].laps += lap;
    this.stintsChange.emit(this.stints);
    this.calcStratLaps();
  }

  changeCompound(i: number, c: string, t: number) {
    let compounds = ['soft', 'medium', 'hard', 'intermediate', 'wet'];
    let target = compounds.indexOf(this.stints[i].compound);
    if (target + t < compounds.length && target + t >= 0) {
      this.stints[i].compound = this.tyres[target + t].compound;
      console.log('changeCompound:', this.stints[i].compound);
      this.stints[i].laps = this.tyres[target + t].laps;
      this.stintsChange.emit(this.stints);
    }
    this.calcStratLaps();
  }

  addStint() {
    console.log('addStint');
    this.stints.push({
      compound: this.tyres[0].compound,
      laps: this.tyres[0].laps,
      threshold: this.tyres[0].threshold,
    });
    this.stintsChange.emit(this.stints);
    this.calcStratLaps();
  }
  removeStint(i: number) {
    console.log('removeStint', i);
    this.stints.splice(i, 1);
    this.stintsChange.emit(this.stints);
    this.calcStratLaps();
  }

  calcStratLaps() {
    this.stratTotalLaps = 0;
    this.stints.forEach((s, i) => {
      console.log(`S:[${i}], s.laps:${s.laps}`);
      this.stratTotalLaps += s.laps;
    });
  }
  calcPitLap(stints: Tyre[], n: number) {
    let pitLap = 0;
    for (let i = 0; i <= n; i++) {
      pitLap += stints[i].laps;
    }
    return pitLap;
  }
}

export interface Tyre {
  compound: 'soft' | 'medium' | 'hard' | 'intermediate' | 'wet';
  laps: number;
  threshold: number;
}
