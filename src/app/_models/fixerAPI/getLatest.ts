import { RequestState } from './requestState';

export interface GetLatest extends RequestState {
  base: string;
  date: Date;
  rates: {[currency: string]: number};
  timestamp: number;
};
