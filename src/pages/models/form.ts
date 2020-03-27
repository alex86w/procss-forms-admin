import { notification } from 'antd';
import { Response } from '@/services/base';
import { Model, Action } from './ModelBase';
import { query, remove, create, modify } from '@/services/form';
import { queryDetail } from '@/services/dict';

interface State { }

export default {
  namespace: 'form',
  state: {
    list: [],
    queryParams: {
      size: 10,
      page: 0,
    },
    formStatus: []
  },
  reducers: {
    changeState(state: State, { payload }: Action) {
      return { ...state, ...payload };
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
    *queryDict({ payload }, { call, put, select }) {
      let res = yield call(queryDetail, payload);
      if (res.success) {
        yield put({
          type: 'changeState',
          payload: {
            formStatus: res.data || [],
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
    *modify({ payload, callback }, { call, put }) {
      const res: Response<any> = yield call(modify, payload);
      if (res.success) {
        yield put({ type: 'query' });
        callback && callback(true);
        notification.success({message:"操作成功"})
      } else {
        notification.error({ message: res.message || res.mes || '操作失败' });
        callback && callback(false);
      }
     
    },
    *create({ payload, callback }, { call, put }) {
      const res: Response<any> = yield call(create, payload);
      if (res.success) {
        yield put({ type: 'query' });
        callback && callback(true);
        notification.success({message:"操作成功"})
      } else {
        notification.error({ message: res.message || res.mes || '操作失败' });
        callback && callback(false);
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
          dispatch({
            type: 'queryDict',
            payload:  '6af2e66d-5d3c-4b4f-92d3-d4fcdd6742e5' 
          })
        }
      });
    },
  },
} as Model<State>;
