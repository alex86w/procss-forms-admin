import React, { useState, useEffect, useReducer, Dispatch } from 'react';
import Form from '..';
import { Button, notification } from 'antd';
import styles from './index.less';
import AwesomeModal, { VisiType } from '../components/AwesomeModal';
import { useHistory, useModel, history } from 'umi';
import { NavBar, Icon } from 'antd-mobile'
import { queryAllSugesst, queryFormLog, querFormComment, postFormComment } from '@/services/form'
import { Response } from '@/services/base'

const cfg = {
    suggest: [],
    comment: [],
    flowLog: []
} as any

const reduce = function (store: typeof cfg, action: { type: string, payload?: any }) {
    if (action.type === 'reset') {
        return cfg;
    }
    return { ...store, [action.type]: action.payload };
}
const FetchAsync = async function (method: (params: any) => Promise<Response<any>>, params: any, setter: Dispatch<any>) {
    const res = await method(params);
   console.log(res)
    if (res.success) {
        setter(res.data)
    } else {
       console.log(res.data.message)
    }
}

const ToDoDetail = function () {

    const [visitype, $visitype] = useState<VisiType>('none')
    const { location } = useHistory();
    const { asyncFetch, todos, updateCommon } = useModel('todoForm')
    const [sate, dispatch] = useReducer(reduce, cfg);
    const $suggests = (data: any) => dispatch({ type: 'suggest', payload: data });
    const $flowLogs = (data: any) => dispatch({ type: 'flowLog', payload: data });
    const $comments = (data: any) => dispatch({ type: 'comment', payload: data });
    const param = { todoId: todos.todoId, formDataId: todos.formDataId }

    useEffect(() => {
        asyncFetch(location);
    }, []);

    useEffect(() => {
        dispatch({ type: 'reset' })
        if (todos.todoId || todos.formDataId) {
            FetchAsync(queryAllSugesst, param, $suggests)
            FetchAsync(queryFormLog, param, $flowLogs)
            FetchAsync(querFormComment, param, $comments)
        }
    }, [todos.todoId, todos.formDataId])

    async function postComment(value: string) {
        if (todos.todoId || todos.formDataId) {
            const result = await postFormComment(param, { value });
            if (result.success) {
                FetchAsync(querFormComment, param, $comments)
            }
        } else {
            notification.info({ message: '正在初始化，或者重新打开页面' })
        }
    }

    return <div style={{ width: "100%", }}>
        <NavBar
            onLeftClick={() => history.goBack()}
            mode='dark'
            leftContent={<Icon type='left' />}  >

            {
                //@ts-ignore
                location.query.title || '待办事项'
            }
        </NavBar>
        <div style={{ width: "100%", paddingBottom: 130, background: 'transparent', overflowY: 'scroll', height: '87vh' }}>
            <Form istodo />
        </div>
        <div className={styles.nav}>
            <Button className={styles.button} type="primary" onClick={() => $visitype('suggest')}><div>审批意见</div></Button>
            <Button className={styles.button} type="primary" onClick={() => $visitype('flowLog')}><div>流程日志</div></Button>
            <Button className={styles.button} type="primary" onClick={() => $visitype('comment')}><div>评论</div></Button>
            <Button className={styles.button} type="primary" onClick={updateCommon} ><div>修改</div></Button>
            {/* <Button className={styles.button} type="primary"><div>流转图</div></Button> */}
        </div>
        <AwesomeModal {...{ data: sate[visitype], visitype, $visitype, postComment }} />
    </div>




}

export default ToDoDetail;