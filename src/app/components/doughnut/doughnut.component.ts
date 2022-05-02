import { Component, Input, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: []
})
export class DoughnutComponent implements OnInit{

  @Input() title = 'Sin titulo';
  @Input('labels1') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('values1') doughnutChartData: MultiDataSet = [ [350, 450, 100] ];
  @Input() colors: Color[] = [{ backgroundColor: ['#6857e6', '#009fee', '#f02059'] }];

  ngOnInit(): void {
    const auxColors = [];
    if (!this.colors[0].hasOwnProperty('backgroundColor')) {
      for (const color of this.colors) {
        auxColors.push(`#${color}`);
      }
      this.colors = [{ backgroundColor: auxColors}];
    }
  }

}
