import { Effect } from 'dva';
import { notification } from 'antd';

import { loginFetch, query } from '@/services/user';
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
  };
}

export default {
  namespace: 'user',
  state: {
    currentUser: {},
    list: [],
    queryParams: {},
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
        history.push('/');
      } else {
        notification.error({
          message: res.message || '登陆失败',
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
          payload: { list: res.data || [], queryParams },
        });
      } else {
        notification.error({ message: res.message });
      }
    },
  },
  subscriptions: {
    init({ dispatch, history }) {
      history.listen(({ pathname }) => {
        console.log(pathname);
        if (pathname === '/system/user') {
          dispatch({ type: 'query' });
        }
      });
    },
  },
} as UserModel;
