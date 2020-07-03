import { notification } from 'antd';
import { } from 'antd-mobile';


import {
  query,
  modify,
  create,
  remove,
  queryUsers,
  removeUser,
  addusers,
  queryUserDepts,
} from '@/services/dept';
import { Response } from '@/services/base';
import { Action, Model } from './ModelBase';

interface DeptState {
  list: any[];
  userList: any[];
  allUsers: any[];
}
export interface DeptModel extends Model<DeptState> { }

export default {
  namespace: 'dept',
  state: {
    list: [],
    userList: [],
    allUsers: [],
  },
  reducers: {
    changeState(state: DeptState, { payload }: Action) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *queryAllUsers({ payload }, { call, put }) {
      const res: Response<any> = yield call(queryUsers, payload);
     console.log(res)
      if (res.success) {
        yield put({
          type: 'changeState',
          payload: {
            allUsers: res.data || [],
          },
        });
      } else {
        notification.error({ message: res.message || res.mes });
      }
    },
    *query({ payload }, { call, put, select }) {

      const res: Response<any> = yield call(queryUserDepts);
     console.log(res)
      if (res.success) {
        yield put({
          type: 'changeState',
          payload: {
            list: res.data || [],
          },
        });
      } else {
        notification.error({ message: res.message || res.mes });
      }
    },
    *removeUsers({ payload, record }, { call, put }) {
      const res: Response<any> = yield call(removeUser, payload);
      if (res.success) {
        notification.success({ message: '操作成功' });
        yield put({ type: 'queryUsers', payload: { deptId: record.id } });
      } else {
        notification.error({
          message: JSON.stringify(res.message || res.mes) || '操作失败',
        });
      }
    },
    *queryUsers({ payload }, { call, put }) {
      const res: Response<any> = yield call(queryUsers, payload);
      if (res.success) {
        yield put({
          type: 'changeState',
          payload: {
            userList: res.data || [],
          },
        });
      } else {
        notification.error({ message: res.message || res.mes });
      }
    },
    *addUsers({ payload, callback }, { call, put }) {
      const res: Response<any> = yield call(addusers, payload);
      if (res.success) {
        callback && callback(true);
        yield put({
          type: 'queryUsers',
          payload: { id: payload.targetDeptIds },
        });
      } else {
        notification.error({ message: res.message || res.mes || '操作失败' });
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
        notification.error({
          message: JSON.stringify(res.message || res.mes) || '操作失败',
        });
      }
    },
  },
  subscriptions: {
    init({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/system/dept') {
          dispatch({ type: 'query' });
          dispatch({ type: 'queryAllUsers' });
        }
        if (pathname === '/system/user') {
          dispatch({ type: 'query' })
        }
      });
    },
  },
} as DeptModel;
