import { notification } from 'antd';
import { Response } from '@/services/base';
import { Model, Action } from './ModelBase';
import { query, remove } from '@/services/form';

interface State {}

export default {
  namespace: 'form',
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
      let queryParams = yield select((state: any) => state.form.queryParams);
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
    *remove({ payload }, { call, put }) {
      const res: Response<any> = yield call(remove, payload);
      if (res.success) {
        notification.success({ message: '操作成功' });
        yield put({
          type: 'query',
        });
      } else {
        notification.error({ message: res.mes || res.message || '操作失败' });
      }
    },
  },
  subscriptions: {
    init({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/system/form') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
} as Model<State>;
