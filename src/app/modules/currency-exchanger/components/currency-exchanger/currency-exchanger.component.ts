import { Currency } from './../../../../_models/currency';
import { ChartData } from './../../../../_models/chart/chartData';
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'ng-apexcharts';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.scss']
})
export class CurrencyExchangerComponent implements OnInit {
  currencies: Currency[];

  detailsMode = false;

  exchangeForm!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute) {
    this.currencies = Object.entries(this.activatedRoute.snapshot.data['currencies'].symbols).map(item => {
      return {
        code: item[0],
        name: String(item[1])
      }
    });
  }

  ngOnInit(): void {
    this.exchangeForm = new FormGroup({
      from: new FormControl('EUR', [Validators.required]),
      to: new FormControl('USD', [Validators.required]),
      amount: new FormControl(1, [Validators.required]),
    });
  }

  getCurrencyName(code: string) {
    return this.currencies.find(x => x.code === code)?.name;
  }

  chartData: ChartData[] = [
    {name: "1/1/2020", value: 1.1},
    {name: "1/2/2020", value: 1.3},
    {name: "1/3/2020", value: 1.5},
    {name: "1/4/2020", value: 1.3},
    {name: "1/5/2020", value: 1.1},
    {name: "1/6/2020", value: 1.7},
  ];
  chartType: ChartType = "line";
}
