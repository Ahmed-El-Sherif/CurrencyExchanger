import { RequestState } from './requestState';

export interface GetSymbols extends RequestState {
  symbols: {[currency: string]: string};
};
