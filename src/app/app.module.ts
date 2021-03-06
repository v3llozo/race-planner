import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TotalLapsComponent } from './total-laps/total-laps.component';
import { TyreLapsComponent } from './tyre-laps/tyre-laps.component';
import { StratComponent } from './strat/strat.component';

@NgModule({
  declarations: [AppComponent, TotalLapsComponent, TyreLapsComponent, StratComponent],
  imports: [BrowserModule, NgxChartsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
