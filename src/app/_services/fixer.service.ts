import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetSymbols } from '../_models/fixerAPI/getSymbols';
import { GetLatest } from '../_models/fixerAPI/getLatest';
import { GetSeries } from '../_models/fixerAPI/getSeries';

@Injectable({
  providedIn: 'root'
})
export class FixerService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  getSymbols(): Observable<GetSymbols> {
    return this.httpClient.get<GetSymbols>(`${this.apiUrl}/symbols`);
  }

  getLatest(from: string, to?: string[]): Observable<GetLatest> {
    return this.httpClient.get<GetLatest>(`${this.apiUrl}/latest?base=${from}${to ? '&symbols=' + to!.toString() : ''}`);
  }

  getSeries(from: string, to: string[], startDate: string, endDate: string): Observable<GetSeries> {
    return this.httpClient.get<GetSeries>(`${this.apiUrl}/timeseries?base=${from}&symbols=${to.toString()}&start_date=${startDate}&end_date=${endDate}`);
  }
}
