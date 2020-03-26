import { Effect } from 'dva';
import { notification } from 'antd';

import { loginFetch, query, modify, create, remove } from '@/services/user';
import { Response } from '@/services/base';
import { history } from 'umi';
import { Action, Model } from './ModelBase';

export interface CurrentUser {
  userName: string;
  pwd: string;
}

interface UserState {
  currentUser: CurrentUser | {};
  list: any;
  queryParams: any;
}
export interface UserModel extends Model<UserState> {
  effects: {
    login: Effect;
    query: Effect;
    modify: Effect;
    create: Effect;
    remove: Effect;
  };
}

export default {
  namespace: 'user',
  state: {
    currentUser: {},
    list: [],
    queryParams: {
      size: 10,
      page: 0,
    },
  },
  reducers: {
    changeState(state: UserState, { payload }: Action) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const res: Response<CurrentUser> = yield call(loginFetch, payload);
      if (res.success) {
        yield put({
          type: 'changeState',
          payload: { currentUser: res.data },
        });
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('user', JSON.stringify(res.data));
        history.push('/');
      } else {
        notification.error({
          message: res.message || res.mes || '登陆失败',
        });
      }
    },
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
        if (pathname === '/system/user') {
          dispatch({ type: 'query' });
        }
        if (pathname !== '/user/login' && pathname !== '/forms/mobile') {
          if (!sessionStorage.getItem('token')) {
            history.replace('/user/login?notoken');
          }
        }
      });
    },
  },
} as UserModel;
