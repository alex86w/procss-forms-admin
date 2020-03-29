import { Effect } from 'dva';
import { notification } from 'antd';

import { query, remove } from '@/services/formData';
import { Response } from '@/services/base';
import { Action, Model } from './ModelBase';
import { history } from 'umi';
import { ColumnType } from 'antd/lib/table';
import { downloadFiles } from '@/utils/request';
import moment from 'moment';

export interface CurrentUser {
    userName: string;
    pwd: string;
}

interface FormDataState {
    list: any;
    queryParams: any;
    col: ColumnType<any>[]
}
export interface FormDataModel extends Model<FormDataState> {
    effects: {
        query: Effect;
        remove: Effect;
        export: Effect;
    };
}

export default {
    namespace: 'formData',
    state: {
        list: [],
        queryParams: {
            size: 10,
            page: 0,
        },
        col: []
    },
    reducers: {
        changeState(state: FormDataState, { payload }: Action) {
            return { ...state, ...payload };
        },
    },
    effects: {

        *query({ payload }, { call, put, select }) {
            let queryParams = yield select((state: any) => state.user.queryParams);
            const search = history.location.search;
            const index = search.indexOf('=');
            const formId = search.substring(index + 1, search.length);
            console.log(formId)
            queryParams = { ...queryParams, ...payload, formId };
            const res: Response<any> = yield call(query, queryParams);
            if (res.success) {
                yield put({
                    type: 'changeState',
                    payload: {
                        list: res.data || [],
                        col: (res.items || []).map((it: any) => ({ dataIndex: it.id, key: it.id, title: it.title, width: 100 })),
                        queryParams: { ...queryParams, total: res.count },
                    },
                });
            } else {
                notification.error({ message: res.message || res.mes });
            }
        },
        *export({ payload }, { call }) {
            const date = moment().format('YYYY年MM月DD日HH时mm分ss秒')
            yield call(downloadFiles, { api: '', data: payload, fileName: "导出文件" + date + ".xlsx" })
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
                if (pathname === '/forms/datas') {
                    dispatch({ type: 'query' });
                }
            });
        },
    },
} as FormDataModel;
