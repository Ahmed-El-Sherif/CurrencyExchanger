import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ChartComponent } from './components/chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports: [
    LoadingSpinnerComponent,
    ChartComponent
  ]
})
export class SharedModule { }
