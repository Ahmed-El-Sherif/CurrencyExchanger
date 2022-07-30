import { GetLatest } from '../../../_models/fixerAPI/getLatest';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { FixerService } from 'src/app/_services/fixer.service';

@Injectable({
  providedIn: 'root'
})
export class RatesResolver implements Resolve<GetLatest> {
  constructor(private fixerService: FixerService) { }

  resolve(): Observable<GetLatest> {
    return this.fixerService.getLatest('EUR');
  }
}
