import { GetSymbols } from '../../../_models/fixerAPI/getSymbols';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { FixerService } from 'src/app/_services/fixer.service';

@Injectable({
  providedIn: 'root'
})
export class SymbolsResolver implements Resolve<GetSymbols> {
  constructor(private fixerService: FixerService) { }

  resolve(): Observable<GetSymbols> {
    return this.fixerService.getSymbols();
  }
}
