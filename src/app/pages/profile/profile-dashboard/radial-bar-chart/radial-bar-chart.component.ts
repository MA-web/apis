import { Component, Input, OnInit } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ApexStroke,
  ApexResponsive,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  colors: string[];
  stroke: ApexStroke;
  responsive: ApexResponsive | ApexResponsive[];
  legend: ApexLegend;

};

@Component({
  selector: 'app-radial-bar-chart',
  templateUrl: './radial-bar-chart.component.html',
  styleUrls: ['./radial-bar-chart.component.scss']
})
export class RadialBarChartComponent implements OnInit{
  @Input() value:number = 0;
  @Input() color:string = '';
  @Input() strokeType:boolean = false;
  @Input() label:string = '';

  public chartOptions: Partial<ChartOptions>={};

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      series: [this.value],
      chart: {
        height: '230',
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "50%",
          },
            dataLabels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                color: this.color,
                fontSize: '20px',
                show: true,
                offsetY: 10,
                fontWeight:'700'
              }
            }
        },

      },
      colors: [this.color],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }
      ],
      labels: [this.label],
      stroke: this.StrokeTypeValue(),
      legend: {
        show: true,
        floating: true,
        fontSize: "12px",
        position: "bottom",
        offsetX: 0,
        offsetY: 0,
        horizontalAlign:'center',
        labels: {
          useSeriesColors: true
        },
        markers:{
          width:this.label?8:0,
          height:8
        },
        formatter: function(seriesName, opts) {
          return seriesName
        },

      },
    };

  }


  StrokeTypeValue():any{
    if(this.strokeType){
      return {
        dashArray:4
      }
    }else{
      return {
        lineCap: "round",
      }
    }

  }
}
