import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tyre, tyres } from '../tyre-laps/tyres';

@Component({
  selector: 'app-strat',
  templateUrl: './strat.component.html',
  styleUrls: ['./strat.component.scss'],
})
export class StratComponent implements OnInit {
  @Input('totalLaps')
  totalLaps!: number;
  @Input('stints') stints: Tyre[] = [];
  @Output('stintsChange') stintsChange = new EventEmitter<Tyre[]>();
  tyres = tyres;
  stratTotalLaps = 0;

  multi: any[] = [];
  view: [number, number] = [880, 320];
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Lap';
  yAxisLabel: string = 'Tyre Life';
  timeline: boolean = false;
  colorScheme: any[] = [];

  constructor() {
    this.calcStratLaps();
  }

  ngOnInit(): void {}

  calcPitLap(stints: Tyre[], n: number) {
    let pitLap = 0;
    for (let i = 1; i <= n; i++) {
      pitLap += stints[i - 1].laps;
    }
    return pitLap;
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

  changeStintLap(i: number, lap: number) {
    this.stints[i].laps += lap;
    this.stintsChange.emit(this.stints);
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
    this.drawChart();
  }

  drawChart() {
    let map: any[] = [];
    let tyreColors = {
      soft: '#ef4444',
      medium: '#facc15',
      hard: '#fff',
      intermediate: '#22c55d',
      wet: '#3683f6',
    };
    let tyreLife = {
      soft: this.tyres[0].laps,
      medium: this.tyres[1].laps,
      hard: this.tyres[2].laps,
      intermediate: this.tyres[3].laps,
      wet: this.tyres[4].laps,
    };
    let colors: any[] = [];
    let currentLap = 0;

    this.stints.forEach((s, i) => {
      colors.push({ name: s.compound, value: tyreColors[s.compound] });
      map.push({
        name: s.compound,
        series: [
          {
            name: currentLap, //start lap
            value: tyreLife[s.compound], //life lap
          },
          {
            name: currentLap + tyreLife[s.compound], //end lap
            value: 0, // end life
          },
        ],
      });
      currentLap += s.laps;
    });
    this.multi = map;
    this.colorScheme = colors;
    console.log('map:', this.multi);
    console.log('color:', this.colorScheme);
  }
}
