import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'exchanger', loadChildren: () => import('./modules/currency-exchanger/currency-exchanger.module').then(m => m.CurrencyExchangerModule) },
  { path: '', redirectTo: 'exchanger', pathMatch: 'full' },
  { path: '**', redirectTo: 'exchanger', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
