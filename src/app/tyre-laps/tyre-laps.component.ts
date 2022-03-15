import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tyres } from './tyres';

@Component({
  selector: 'app-tyre-laps',
  templateUrl: './tyre-laps.component.html',
  styleUrls: ['./tyre-laps.component.scss'],
})
export class TyreLapsComponent {
  @Input('tyres') tyres = tyres;
  @Output('tyresChange') tyresChange = new EventEmitter<any>();

  changeTyreLap(c: string, n: number) {
    c == 'soft' ? (this.tyres[0].laps += n) : '';
    c == 'medium' ? (this.tyres[1].laps += n) : '';
    c == 'hard' ? (this.tyres[2].laps += n) : '';
    c == 'intermediate' ? (this.tyres[3].laps += n) : '';
    c == 'wet' ? (this.tyres[4].laps += n) : '';
    this.tyresChange.emit(this.tyres);
  }
}
