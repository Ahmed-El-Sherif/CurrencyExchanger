import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { CurrencyExchangerComponent } from './components/currency-exchanger/currency-exchanger.component';
import { Route, RouterModule } from '@angular/router';
import { SymbolsResolver } from './_resolvers/symbols.resolver';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ExchangerCardComponent } from './components/exchanger-card/exchanger-card.component';
import { RatesResolver } from './_resolvers/rates.resolver';

const routes: Route[] = [
  {
    path: '',
    component: CurrencyExchangerComponent,
    resolve: { currencies: SymbolsResolver, rates: RatesResolver },
  }
];

@NgModule({
  declarations: [
    CurrencyExchangerComponent,
    ExchangerCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    DecimalPipe
  ],
})
export class CurrencyExchangerModule { }
