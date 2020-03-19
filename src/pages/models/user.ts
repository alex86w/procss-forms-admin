import { Effect } from 'dva';
import { notification } from 'antd';

import { loginFetch } from '@/services/login';
import { Response } from '@/services/base';
import { history } from 'umi';
import { Action, Model } from './ModelBase';

export interface CurrentUser {
  userName: string;
  pwd: string;
}

interface UserState {
  currentUser: CurrentUser | {};
}
export interface UserModel extends Model<UserState> {
  effects: {
    login: Effect;
  };
}

export default {
  namespace: 'user',
  state: {
    currentUser: {},
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
  },
} as UserModel;
