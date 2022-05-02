import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { RadarComponent } from './radar/radar.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DoughnutComponent,
    RadarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
  ],
  exports: [
    IncrementadorComponent,
    DoughnutComponent,
    RadarComponent
  ]
})
export class ComponentsModule { }
