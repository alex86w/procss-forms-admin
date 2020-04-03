import React, { } from 'react'
import { Effect } from 'dva';
import { notification } from 'antd';

import { query, remove } from '@/services/formData';
import { Response } from '@/services/base';
import { Action, Model } from './ModelBase';
import { history } from 'umi';
import { ColumnType } from 'antd/lib/table';
import { downloadFiles } from '@/utils/request';
import moment from 'moment';



interface FormDataState {
    list: any;
    queryParams: any;
    col: ColumnType<any>[],
    src: string
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
        col: [],
        src: ''
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
            queryParams = { ...queryParams, ...payload, formId };
            const res: Response<any> = yield call(query, queryParams);
            if (res.success) {
                const { data: list, items } = res;
                yield put({
                    type: 'changeState',
                    payload: {
                        list: list || [],
                        col: [...(items || []).filter((it: any) => it.type !== 'divider').map((it: any) => {
                            if (it.type === 'signName' || it.type === 'image') {
                                return {
                                    dataIndex: it.id,
                                    key: it.id,
                                    title: it.title,
                                    render: (text) => typeof text === 'string'
                                        ? <img src={text} style={{ width: '70px' }} />
                                        : <div >
                                            {Array.isArray(text) ? (text).map((it: any) => <img key={it.url} src={it.url} style={{ width: '200px' }} />) : <div />}
                                        </div>
                                } as ColumnType<any>
                            }
                            return { dataIndex: it.id, key: it.id, title: it.title, width: 100 } as ColumnType<any>
                        }),
                        { dataIndex: 'submitUserName', key: "submitUserName", title: '提交人名称' },
                        { dataIndex: 'createUserName', key: 'createUserName', title: '创建人名称' },
                        { dataIndex: 'createTime', key: 'createTime', title: '创建时间' },
                        { dataIndex: 'currentProcedureNode', key: "currentProcedureNode", title: "当前节点名称", render: (text: any) => text ? text.name || '' : '' },
                        { dataIndex: 'dataGroupStatus', key: 'dataGroupStatus', title: '处理状态', render: (text: any) => text === '2' ? '已完成' : '处理中' }

                        ],
                        queryParams: { ...queryParams, total: res.count },
                    },
                });
            } else {
                notification.error({ message: res.message || res.mes });
            }
        },
        *export({ payload, callback }, { call }) {
            const search = history.location.search;
            const index = search.indexOf('=');
            const formId = search.substring(index + 1, search.length);
            //@ts-ignore
            const date = moment().format('YYYY年MM月DD日HH时mm分ss秒')
            yield call(downloadFiles, { api: '/api/form/excelExport/' + formId, data: payload, fileName: "导出文件" + date + ".xlsx" })
            callback && callback(true)

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
