import { ChartOptions } from './../../../../_models/chart/chartOptions';
import { ChartData } from './../../../../_models/chart/chartData';
import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() height?: number;
  @Input() title?: string;
  @Input() pointText?: string;
  @Input() type?: ChartType;
  @Input() data?: ChartData[];

  public chartOptions!: ChartOptions;

  constructor() {
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: this.pointText??"Line Point",
          data: this.data?.map(data => data.value)??[]
        }
      ],
      xaxis: {
        categories: this.data?.map(data => data.name)??[]
      },
      chart: {
        height: this.height??300,
        type: this.type??"line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: this.title??"Line Chart",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      }
    };
  }
}
