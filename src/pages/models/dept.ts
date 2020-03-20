import { Effect } from 'dva';
import { notification } from 'antd';

import { query, modify, create, remove } from '@/services/dept';
import { Response } from '@/services/base';
import { Action, Model } from './ModelBase';

interface DeptState {
  list: any;
}
export interface DeptModel extends Model<DeptState> {}

export default {
  namespace: 'dept',
  state: {
    list: [],
  },
  reducers: {
    changeState(state: DeptState, { payload }: Action) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      let queryParams = yield select((state: any) => state.user.queryParams);
      queryParams = { ...queryParams, ...payload };
      const res: Response<any> = yield call(query, queryParams);
      if (res.success) {
        yield put({
          type: 'changeState',
          payload: {
            list: res.data || [],
            queryParams: { ...queryParams, total: res.count },
          },
        });
      } else {
        notification.error({ message: res.message || res.mes });
      }
    },
    *modify({ payload, callback }, { call, put }) {
      const res: Response<any> = yield call(modify, payload);
      if (res.success) {
        callback && callback(true);
        yield put({ type: 'query' });
      } else {
        notification.error({ message: res.message || res.mes || '操作失败' });
      }
    },
    *create({ payload, callback }, { call, put }) {
      const res: Response<any> = yield call(create, payload);
      if (res.success) {
        callback && callback(true);
        yield put({ type: 'query' });
      } else {
        notification.error({ message: res.message || res.mes || '操作失败' });
      }
    },
    *remove({ payload }, { call, put }) {
      const res: Response<any> = yield call(remove, payload);
      if (res.success) {
        notification.success({ message: '操作成功' });
        yield put({ type: 'query' });
      } else {
        notification.error({ message: res.message || res.mes || '操作失败' });
      }
    },
  },
  subscriptions: {
    init({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/system/dept') {
          dispatch({ type: 'query' });
        }
      });
    },
  },
} as DeptModel;
