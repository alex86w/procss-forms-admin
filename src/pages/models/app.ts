import { notification } from 'antd';
import { Response } from '@/services/base';
import { history } from 'umi';
import { Model, Action } from './ModelBase';
import { query, create } from '@/services/app';

interface State {}

export default {
  namespace: 'app',
  state: {
    list: [],
    queryParams: {
      size: 10,
      page: 0,
    },
  },
  reducers: {
    changeState(state: State, { payload }: Action) {
      return { ...state, payload };
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
    *create({ payload, callback }, { call, put }) {
      const res: Response<any> = yield call(create, payload);
      if (res.success) {
        callback && callback(true);
        yield put({ type: 'query' });
      } else {
        notification.error({ message: res.message || res.mes || '操作失败' });
      }
    },
  },
  subscriptions: {
    init({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/system/app') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
} as Model<State>;
