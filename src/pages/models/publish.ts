import { Effect } from 'dva';
import { notification } from 'antd';

import { Response } from '@/services/base';
import { history } from 'umi';
import { generate } from 'shortid';
import { Action, Model } from './ModelBase';
import { updateWritable, queryWritable } from '@/services/form';

export interface CurrentUser {
  userName: string;
  pwd: string;
}

interface UserState {
  currentUser: CurrentUser | {};
  data: any;
}
export interface UserModel extends Model<UserState> {
  effects: {
    query: Effect;
    modify: Effect;

  };
}

export default {
  namespace: 'publish',
  state: {
    currentUser: {},
    data: {},
    dataId: generate()
  },
  reducers: {
    changeState(state: UserState, { payload }: Action) {
      return { ...state, ...payload };
    },
  },
  effects: {

    *query(_, { call, put }) {
      //@ts-ignore
      const { formid } = history.location.query;
      const res: Response<any> = yield call(queryWritable, formid);
      if (res.success) {
        yield put({
          type: 'changeState',
          payload: {
            data: res.data || {},
            dataId: generate()
          },
        });
      } else {
        notification.error({ message: res.message || res.mes });
      }
    },
    *modify({ payload, callback }, { call, put }) {
      const res: Response<any> = yield call(updateWritable, payload);
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
        if (pathname === '/forms/basic/publish') {
          dispatch({ type: 'query' });
        }

      });
    },
  },
} as UserModel;
