import { notification } from 'antd';
import { Response } from '@/services/base';
import { history } from 'umi';
import { Model, Action } from './ModelBase';

interface State {}

export default {
  namespace: 'app',
  state: {},
  reducers: {
    changeState(state: State, { payload }: Action) {
      return { ...state, payload };
    },
  },
  effects: {
    *create({ payload }, { call, put }) {},
    *query({ payload }, { call, select, put }) {},
    *remove({ payload }, { call, put }) {},
    *modify({ payload }, { call, put }) {},
  },
  subscriptions: {},
} as Model<State>;
