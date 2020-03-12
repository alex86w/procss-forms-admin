import { Effect } from 'dva';
import { notification } from 'antd';

import { loginFetch } from '@/services/login';
import { Response } from '@/services/base';

export interface CurrentUser {
  userName: string;
  pwd: string;
}
interface Action {
  type: string;
  payload: any;
  [key: string]: any;
}
interface UserState {
  currentUser: CurrentUser;
}
export interface UserModel {
  namespace: string;
  state: UserState;
  reducers: {};
  effects: {
    login: Effect;
  };
}

export default {
  namespace: 'user',
  state: {
    currentUser: {} as CurrentUser,
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
      }
      notification.error({
        message: res.message || '登陆失败',
      });
    },
  },
} as UserModel;
