import React, { } from 'react'
import { Effect } from 'dva';
import { notification, Col } from 'antd';
import { query, remove, queryCheckList, querySignGroup, createFormData, modifyFormData } from '@/services/formData';
import { Response } from '@/services/base';
import { Action, Model } from './ModelBase';
import { history } from 'umi';
import { ColumnType } from 'antd/lib/table';

import { downloadFiles } from '@/utils/request';
import moment from 'moment';
import { generate } from 'shortid';

const queryFormId = function () {
    const search = history.location.search;
    const index = search.indexOf('=');
    const formId = search.substring(index + 1, search.length);
    return formId;
}

const sliceCol = (list: any[]) => {
    return [...(list || []).map((it: any) => {
        if (it.type === 'signName' || it.type === 'image') {
            return {
                dataIndex: it.id,
                key: it.id,
                title: it.title,
                width: 200,
                render: (value) => typeof value === 'string'
                    ? <img src={value} style={{ width: '70px' }} />
                    : <div >
                        {Array.isArray(value) ? (value).map((it: any) => <img key={it.url} src={it.url} style={{ width: '120px' }} />) : <div />}
                    </div>
            } as ColumnType<any>
        }
        if (it.type === "ChildrenTable") {
            return {
                key: it.id,
                title: it.title,
                children: it.items?.map((child: any) => (
                    (child.type === 'signName' || child.type === 'image')
                        ? {
                            dataIndex: it.id,
                            key: it.id,
                            title: it.title,
                            width: 200,
                            render: (value: any) => typeof value === 'string'
                                ? <img src={value} style={{ width: '70px' }} />
                                : <div >
                                    {Array.isArray(value) ? (value).map((it: any, index) => <img key={generate()} src={it.url} style={{ width: '120px' }} />) : <div />}
                                </div>
                        }
                        : {
                            key: child.id,
                            dataIndex: it.id,
                            title: child.title,
                            width: 220,
                            render: (value: any[]) => {
                                return (<>{(value || []).map((obj, index) => <Col key={generate()} style={{ minHeight: 25 }}>{obj[child.id]}</Col>)}</>)
                            }
                        })),
            }
        }
        return { dataIndex: it.id, key: it.id, title: it.title, width: 220 } as ColumnType<any>
    }),]
}



interface FormDataState {
    list: any;
    queryParams: any;
    col: ColumnType<any>[],
    src: string
}
export interface FormDataModel extends Model<FormDataState> {
    effects: {
        [key: string]: Effect;
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
        src: '',
        items: [],
        assetsFrom: false,
        signGroup: []
    },
    reducers: {
        changeState(state: FormDataState, { payload }: Action) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *querySignGroup(_, { put }) {

            const formId = queryFormId()
            const res = yield querySignGroup(formId);
            if (res.success) {
                yield put({
                    type: 'changeState',
                    payload: {
                        signGroup: res.data
                    }
                })
            } else {
                notification.error({ message: res.message })
            }
        },

        *query({ payload }, { call, put, select }) {
            let queryParams = yield select((state: any) => state.formData.queryParams);
            const formId = queryFormId()
            queryParams = { ...queryParams, ...payload, formId };
            
            const res: Response<any> = yield call(query, queryParams);
            if (res.success) {
                const { data: list, items, assetsFrom } = res;
                yield put({
                    type: 'changeState',
                    payload: {
                        list: list || [],
                        col: sliceCol((items ?? []).filter((it: any) => it.type !== 'divider')).concat([{ dataIndex: 'submitUserName', key: "submitUserName", title: '提交人名称', onlyCol: true, width: 220 },
                        { dataIndex: 'createUserName', key: 'createUserName', title: '创建人名称', onlyCol: true, width: 220 },
                        { dataIndex: 'createTime', key: 'createTime', title: '创建时间', onlyCol: true, render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss'), width: 220 },
                        { dataIndex: 'currentProcedureNode', key: "currentProcedureNode", title: "当前节点名称", render: (text: any) => text ? text.name || '' : '', onlyCol: true, width: 220 },
                        { dataIndex: 'dataGroupStatus', key: 'dataGroupStatus', title: '处理状态', render: (text: any) => text === '2' ? '已完成' : text ? '处理中' : '已完成', onlyCol: true, width: 220 },
                        ] as any[]),

                        queryParams: { ...queryParams, total: res.count },
                        items: items,
                        assetsFrom,
                    },
                });
            } else {
                notification.error({ message: res.message || res.mes });
            }
        },
        *create({ payload, callback }, { call, put }) {
            const formId = queryFormId();
            const response = yield call(createFormData, { id: formId, ...payload });
            if (response.success) {
                callback && callback(true)
                yield put({
                    type: "query",
                    payload: {}
                })
                notification.success({ message: "操作成功" })
            } else {
                notification.error({ message: response.message })
            }
        },
        *modify({ payload, callback }, { call, put, select }) {
            const response = yield call(modifyFormData, { ...payload, formId: queryFormId() })
            if (response.success) {
                callback && callback(true)
                yield put({
                    type: "query",
                    payload: {}
                })
                notification.success({ message: "操作成功" })
            } else {
                notification.error({ message: response.message })
            }
        },

        *queryChecked({ payload }, { call, put, select }) {
            let queryParams = yield select((state: any) => state.user.queryParams);
            const search = history.location.search;
            const index = search.indexOf('=');
            const formId = search.substring(index + 1, search.length);
            queryParams = { ...queryParams, ...payload, formId };
            const res: Response<any> = yield call(queryCheckList, queryParams);
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
                                            {Array.isArray(text) ? (text).map((it: any) => <img key={it.url} src={it.url} style={{ width: '120px' }} />) : <div />}
                                        </div>
                                } as ColumnType<any>
                            }
                            return { dataIndex: it.id, key: it.id, title: it.title, width: 100, ellipsis: true } as ColumnType<any>
                        }),
                        { dataIndex: 'submitUserName', key: "submitUserName", title: '提交人名称', onlyCol: true },
                        { dataIndex: 'createUserName', key: 'createUserName', title: '创建人名称', onlyCol: true },
                        { dataIndex: 'createTime', key: 'createTime', title: '创建时间', onlyCol: true, render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss') },
                        { dataIndex: 'currentProcedureNode', key: "currentProcedureNode", title: "当前节点名称", render: (text: any) => text ? text.name || '' : '', onlyCol: true },
                        { dataIndex: 'dataGroupStatus', key: 'dataGroupStatus', title: '处理状态', render: (text: any) => text === '2' ? '已完成' : text ? '处理中' : '已完成', onlyCol: true }
                        ],
                        queryParams: { ...queryParams, total: res.count },
                        items: items,
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
            const date = moment().format('YYYY年MM月DD日HH时mm分ss秒');
            if (payload.isCheck) {
                //TODO page size;
                yield call(downloadFiles, { api: `/api/form/exportAssetsPdf/${formId}`, data: { ...payload, baseUrl: location.origin }, fileName: '导出资产' + date + ".pdf" });
                callback && callback(true)
                return;
            }
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
        *queryTemplate({ payload, callback }, { call }) {
            const date = moment().format('YYYY年MM月DD日HH时mm分ss秒')
            yield call(downloadFiles, { api: `/api/form/excelExportTemplate/${payload}`, data: {}, fileName: '模版文件' + date + ".xlsx" })
            callback && callback(true)
        },
        *exptPDF({ payload, callback }, { call }) {
            const date = moment().format('YYYY年MM月DD日HH时mm分ss秒');
            yield call(downloadFiles, { api: `/api/formData/pdfByTemplate`, data: { ...payload, templateType: 'meeting' }, fileName: '导出文件' + date + ".pdf" });
            callback && callback(true)
        }
    },
    subscriptions: {
        init({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/forms/datas') {
                    dispatch({ type: 'query' });
                    dispatch({
                        type: 'querySignGroup'
                    })
                }
            });
        },
    },
} as FormDataModel;
