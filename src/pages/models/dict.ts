import {
  query,
  create,
  modify,
  $remove,
  queryDetail,
  createDetail,
  modifyDetail,
  removeDetail,
} from '@/services/dict';
import { notification } from 'antd';
import { Model } from './ModelBase';

export default {
  namespace: 'dict',
  state: {
    queryParams: {},
    queryDetail: {},
    data: {
      content: [],
    },
    detail: {
      content: [],
    },
  },
  reducers: {
    changeState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      let queryParams = yield select((state: any) => state.dict.queryParams);
      queryParams = payload ? payload : queryParams;
      const response = yield call(query, queryParams);
      if (response.success) {
        yield put({
          type: 'changeState',
          payload: { data: response },
        });
      }
    },
    *queryDetail({ payload }, { call, put }) {
      const response = yield call(queryDetail, payload.id);
      if (response.success) {
        yield put({
          type: 'changeState',
          payload: { detail: response, queryDetail: payload },
        });
      }
    },
    *create({ payload, callback }, { call, put }) {
      const response = yield call(create, payload);
      if (response.success) {
        callback && callback(true);
        yield put({
          type: 'query',
        });
        notification.success({
          message: '操作成功',
        });
      } else {
        notification.error({
          message: response.mes,
        });
      }
    },
    *createDetail({ payload, callback }, { call, select, put }) {
      const queryDetail = yield select((state: any) => state.dict.queryDetail);
      const response = yield call(createDetail, {
        ...payload,
        dictId: queryDetail.id,
      });
      if (response.success) {
        callback && callback(true);
        notification.success({
          message: '操作成功',
        });
        yield put({
          type: 'queryDetail',
          payload: queryDetail,
        });
      } else {
        notification.error({
          message: response.mes,
        });
      }
    },
    *modify({ payload, callback }, { call, put }) {
      const response = yield call(modify, payload);
      if (response.success) {
        callback && callback(true);
        notification.success({
          message: '操作成功',
        });
        yield put({
          type: 'query',
        });
      } else {
        notification.error({
          message: response.mes,
        });
      }
    },
    *modifyDetail({ payload, callback }, { call, select, put }) {
      const response = yield call(modifyDetail, payload);
      const queryDetail = yield select((state: any) => state.dict.queryDetail);
      if (response.success) {
        callback && callback(true);
        notification.success({
          message: '操作成功',
        });
        yield put({
          type: 'queryDetail',
          payload: queryDetail,
        });
      } else {
        notification.error({
          message: response.mes,
        });
      }
    },
    *remove({ payload }, { call, put }) {
      const response = yield call($remove, payload);
      if (response.success) {
        notification.success({
          message: '操作成功',
        });
        yield put({
          type: 'query',
        });
      } else {
        notification.error({
          message: response.mes,
        });
      }
    },
    *removeDetail({ payload }, { call, put, select }) {
      const queryDetail = yield select((state: any) => state.dict.queryDetail);
      const response = yield call(removeDetail, payload);
      if (response.success) {
        notification.success({
          message: '操作成功',
        });
        yield put({
          type: 'queryDetail',
          payload: queryDetail,
        });
      } else {
        notification.error({
          message: response.mes,
        });
      }
    },
  },
  subscriptions: {
    init({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/system/dict') {
          dispatch({ type: 'query' });
        }
      });
    },
  },
} as Model<any>;
