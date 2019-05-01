import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styleUrls: ['./grafica-dona.component.css']
})
export class GraficaDonaComponent implements OnInit {
  @Input() doughnutChartLabels: Label[] ;
  @Input() doughnutChartData: MultiDataSet[];
  @Input() doughnutChartType: ChartType[];

  constructor() {}

  ngOnInit() {}
}
