import { RequestState } from './requestState';

export interface GetSeries extends RequestState {
  base: string;
  end_date: Date;
  start_date: Date;
  timeseries: boolean;
  rates: {[date: string]: {[currency: string]: number}}
};
