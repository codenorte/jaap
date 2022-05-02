import { Component } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styles: [
  ]
})
export class RadarComponent {
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Frontend', 'Backend', 'Testing', 'Systems', 'Agile', 'Teams'];

  public radarChartData: ChartDataSets[] = [
    { data: [35, 55, 5, 15, 5, 0], label: 'Año 2008' },
    { data: [75, 85, 70, 40, 55, 70], label: 'Año 2020' }
  ];
  public radarChartType: ChartType = 'radar';

}
