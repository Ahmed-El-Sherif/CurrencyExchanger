import { DateHelper } from './../../../shared/_helpers/date-helper';
import { LoadingSpinnerService } from './../../../shared/_services/loading-spinner.service';
import { FixerService } from 'src/app/_services/fixer.service';
import { Currency } from '../../../../_models/_common/currency';
import { Rate } from '../../../../_models/_common/rate';
import { ChartData } from './../../../../_models/chart/chartData';
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'ng-apexcharts';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.scss']
})
export class CurrencyExchangerComponent implements OnInit {
  currencies: Currency[];
  popularCurrencies!: Currency[];
  rates: Rate[];
  exchangeForm!: FormGroup;
  invalidAmount = false;
  submittedAmount!: number;
  detailsMode = false;
  chartData!: ChartData[];
  chartType: ChartType = "line";

  constructor(private activatedRoute: ActivatedRoute, private fixerService: FixerService,
    private loadingSpinnerService: LoadingSpinnerService, private datepipe: DatePipe,  private decimalPipe: DecimalPipe) {
    this.currencies = Object.entries(this.activatedRoute.snapshot.data['currencies'].symbols).map(item => {
      return {
        code: item[0],
        name: String(item[1])
      }
    });
    this.setPopularCurrencies();
    this.rates = Object.entries(this.activatedRoute.snapshot.data['rates'].rates).map(item => {
      return {
        code: item[0],
        value: Number(item[1])
      }
    });
  }

  ngOnInit(): void {
    this.exchangeForm = new FormGroup({
      from: new FormControl('EUR', [Validators.required]),
      to: new FormControl('USD', [Validators.required]),
      amount: new FormControl(1, [Validators.required, Validators.min(0)]),
    });
    this.exchangeForm.controls['from'].valueChanges.subscribe(x => {
      this.getRates(x);
    });
    this.exchangeForm.controls['amount'].valueChanges.subscribe(x => {
      this.handleAmountValidation();
    })
    this.convert();
  }

  setPopularCurrencies() {
    this.popularCurrencies = this.currencies.filter(x => ['USD', 'EUR', 'GBP', 'EGP', 'RUB', 'AED', 'CNY' , 'CAD', 'AUD', 'QAR', 'SAR'].find(y => y === x.code));
  }

  getRates(code: string) {
    this.loadingSpinnerService.start();
    this.fixerService.getLatest(code).pipe(finalize(() => this.loadingSpinnerService.stop())).subscribe(x => {
      this.rates = Object.entries(x.rates).map(item => {
        return {
          code: item[0],
          value: Number(item[1])
        }
      });
    })
  }

  handleAmountValidation() {
    if (this.exchangeForm.controls['amount'].invalid) {
      this.exchangeForm.controls['from'].disable({ emitEvent: false });
      this.exchangeForm.controls['to'].disable({ emitEvent: false });
    } else if (this.exchangeForm.controls['from'].disabled) {
      if (!this.detailsMode) {
        this.exchangeForm.controls['from'].enable({ emitEvent: false });
      }
      this.exchangeForm.controls['to'].enable({ emitEvent: false });
    }
  }

  get getPopularCurrencies() {
    return this.popularCurrencies.filter(x => x.code != this.exchangeForm.controls['from'].value && x.code != this.exchangeForm.controls['to'].value);
  }

  getCurrencyName(code: string) {
    return this.currencies.find(x => x.code === code)!.name;
  }

  getRateValue(code: string) {
    return this.rates.find(x => x.code === code)!.value;
  }

  swapCurrencies() {
    const valueHolder = this.exchangeForm.controls['from'].value;
    this.exchangeForm.controls['from'].setValue(this.exchangeForm.controls['to'].value);
    this.exchangeForm.controls['to'].setValue(valueHolder);
  }

  convert(){
    this.submittedAmount = this.exchangeForm.controls['amount'].value;
    if (this.detailsMode) {
      this.getHistoricalRates();
    }
  }

  activateDetailsMode(from?: string, to?: string) {
    if (from && to) {
      this.exchangeForm.controls['from'].setValue(from);
      this.exchangeForm.controls['to'].setValue(to);
    }
    this.exchangeForm.controls['from'].disable({ emitEvent: false });
    this.getHistoricalRates();
  }

  deactivateDetailsMode() {
    this.detailsMode = false;
    if (this.exchangeForm.controls['amount'].valid) {
      this.exchangeForm.controls['from'].enable({ emitEvent: false });
    }
  }

  getHistoricalRates() {
    this.loadingSpinnerService.start();
    const yearAgo = String(this.datepipe.transform(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), 'yyyy-MM-dd'));
    const now = String(this.datepipe.transform(new Date(), 'yyyy-MM-dd'));
    this.fixerService.getSeries(this.exchangeForm.controls['from'].value, [this.exchangeForm.controls['to'].value], yearAgo, now)
      .pipe(finalize(() => {this.detailsMode = true; this.loadingSpinnerService.stop();})).subscribe(result => {
        const lastDaysOfMonths = DateHelper.getLastDaysOfMonths(new Date(result.start_date), new Date(result.end_date));
        this.chartData = lastDaysOfMonths.map(x => {
          const date = String(this.datepipe.transform(x, 'yyyy-MM-dd'));
          const rateValue = Number(this.decimalPipe.transform(result.rates[date][this.exchangeForm.controls['to'].value], '1.2-2')!.replace(',', ''));
          return {name: date, value: rateValue};
        });
    })
  }
}
