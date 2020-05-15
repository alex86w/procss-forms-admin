import { notification } from 'antd';
import { Model } from 'dva';
import { AnyAction } from 'redux';
import * as api from '@/services/role'

export default {
    namespace: 'role',
    state: {
        data: [],
        queryParams: {
            total: 0,
            page: 0,
            size: 10
        },
        users: [],

    },
    reducers: {
        changeState(state, { payload }: AnyAction) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *query({ payload }, { call, put, select }) {
            let queryParams = yield select((state: any) => state.role.queryParams);
            queryParams = { ...queryParams, ...payload };
            const res = yield call(api.query, queryParams);
            if (res.success) {
                yield put({
                    type: 'changeState',
                    payload: {
                        data: res.data,
                        queryParams: { ...queryParams, total: res.count }
                    }
                })
            } else {
                notification.error({ message: JSON.stringify(res.message) })
            }
        },
        *queryUsers({ payload }, { call, put, select }) {
            let queryParams = yield select((state: any) => state.role.queryParams);
            queryParams = { ...queryParams, ...payload };
            const res = yield call(api.queryUser, queryParams);
            if (res.success) {
                yield put({
                    type: 'changeState',
                    payload: {
                        users: res.data,
                        queryParams: { ...queryParams, total: res.count }
                    }
                })
            } else {
                notification.error({ message: JSON.stringify(res.message) })
            }
        },
        *modify({ payload, callback }, { call, put }) {
            const res = yield call(api.modify, payload);
            if (res.success) {
                notification.success({ message: '操作成功' })
                callback && callback(true)
                yield put({
                    type: 'query'
                })
            } else {
                notification.error({ message: res.message || '操作失败' })
            }
        },
        *create({ payload, callback }, { call, put }) {
            const res = yield call(api.create, payload);
            if (res.success) {
                notification.success({ message: '操作成功' })
                callback && callback(true)
                yield put({
                    type: 'query'
                })
            } else {
                notification.error({ message: res.message || '操作失败' })
            }
        },
        *remove({ payload, callback }, { call, put }) {
            const res = yield call(api.remove, payload);
            if (res.success) {
                notification.success({ message: '操作成功' });
                callback && callback(true)
                yield put({
                    type: 'query'
                })
            } else {
                notification.error({ message: res.message || '操作失败' })
            }
        },
        *addUser({ payload, callback }, { call, put }) {
            const res = yield call(api.addUserTo, payload);
            if (res.success) {
                notification.success({ message: '操作成功' });
                callback && callback(true)
                yield put({
                    type: 'queryUsers'
                })
            } else {
                notification.error({ message: res.message || '操作失败' })
            }
        },
        *removeUser({payload,callback},{call,put}){
            const res = yield call(api.removeUser, payload);
            if (res.success) {
                notification.success({ message: '操作成功' });
                callback && callback(true)
                yield put({
                    type: 'queryUsers'
                })
            } else {
                notification.error({ message: res.message || '操作失败' })
            }

        }
    },
    subscriptions: {
        init({ history, dispatch }) {
            history.listen(({ pathname }) => {
                if (
                    pathname === '/system/role'
                    || pathname === '/forms/basic/publish'
                ) {
                    let user: any = localStorage.getItem('user');
                    user = user ? JSON.parse(user) : {};
                    dispatch({
                        type: 'query',
                        payload: {
                            rootDeptId: user.rootDeptId
                        }
                    })
                }
            })
        }
    }
} as Model