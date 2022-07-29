import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyExchangerComponent } from './components/currency-exchanger/currency-exchanger.component';
import { Route, RouterModule } from '@angular/router';
import { SymbolsResolver } from './_resolvers/symbols.resolver';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  {
    path: '',
    component: CurrencyExchangerComponent,
    resolve: { currencies: SymbolsResolver },
  }
];

@NgModule({
  declarations: [
    CurrencyExchangerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CurrencyExchangerModule { }
