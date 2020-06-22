import { Effect, Subscription } from 'dva';

export interface Action {
  type: string;
  payload: any;
  [key: string]: any;
}
export interface Model<T> {
  namespace: string;
  state: T;
  reducers: {
    changeState: (state: T, action: Action) => T;
  };
  effects: {
    [key: string]: Effect;
  };
  subscriptions?: {
    init?: Subscription;
  };
}
