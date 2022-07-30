import { RequestState } from './requestState';

export interface GetSeries extends RequestState {
  base: string;
  end_date: string;
  start_date: string;
  timeseries: boolean;
  rates: {[date: string]: {[currency: string]: number}}
};
