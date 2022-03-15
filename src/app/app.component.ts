import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Color } from '@swimlane/ngx-charts';

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

  multi = [
    {
      name: 'Soft',
      series: [
        {
          name: '0',
          value: 7,
        },
        {
          name: '10',
          value: 0,
        },
      ],
    },
    {
      name: 'Hard',
      series: [
        {
          name: '10', //startlap
          value: 15, //life lap
        },
        {
          name: '15', //end lap
          value: 0, // end life
        },
      ],
    },
    {
      name: 'Medium',
      series: [
        {
          name: '15',
          value: 10,
        },
        {
          name: '25',
          value: 0,
        },
      ],
    },
  ];
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
    this.stints.push(
      {
        compound: this.tyres[2].compound,
        laps: this.tyres[2].laps,
        threshold: this.tyres[2].threshold,
      },
      {
        compound: this.tyres[1].compound,
        laps: this.tyres[1].laps,
        threshold: this.tyres[1].threshold,
      },
      {
        compound: this.tyres[0].compound,
        laps: this.tyres[0].laps,
        threshold: this.tyres[0].threshold,
      }
    );
    this.calcStratLaps();
  }

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
    this.drawChart();
  }
  calcPitLap(stints: Tyre[], n: number) {
    let pitLap = 0;
    for (let i = 1; i <= n; i++) {
      pitLap += stints[i-1].laps;
    }
    return pitLap;
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
    let colors: any[] = [];
    let currentLap = 0;
    this.stints.forEach((s, i) => {
      colors.push({ name: s.compound, value: tyreColors[s.compound] });
      map.push({
        name: s.compound,
        series: [
          {
            name: currentLap, //start lap
            value: s.laps, //life lap
          },
          {
            name: currentLap + s.laps, //end lap
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

export interface Tyre {
  compound: 'soft' | 'medium' | 'hard' | 'intermediate' | 'wet';
  laps: number;
  threshold: number;
}
