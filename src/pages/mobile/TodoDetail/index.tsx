import React, { useState, useEffect, useReducer } from 'react';
import Form from '..';
import { Button } from 'antd';
import styles from './index.less';
import AwesomeModal, { VisiType } from '../components/AwesomeModal';
import { useHistory, useModel, history } from 'umi';
import { NavBar, Icon } from 'antd-mobile'

const cfg = {
    suggests: [],
    flowLogs: [],
    comment: []
}

const reduce = function (store: typeof cfg, action: { type: string, payload: any }) {
    return { ...store, [action.type]: action.payload };
}

const ToDoDetail = function () {

    const [visitype, $visitype] = useState<VisiType>('none')
    const { location } = useHistory();
    const { asyncFetch } = useModel('todoForm')
    const [sate, dispatch] = useReducer(reduce, cfg);
    useEffect(() => {
        asyncFetch(location);
    }, []);

    return <div style={{ width: "100%" }}>
        <NavBar
            onLeftClick={() => history.goBack()}
            mode='dark'
            leftContent={<Icon type='left' />} >

            {
                //@ts-ignore
                location.query.title || '待办事项'
            }
        </NavBar>
        <div style={{ width: "100%", paddingBottom: 130, background: 'transparent' }}>
            <Form istodo />
        </div>
        <div className={styles.nav}>
            <Button className={styles.button} type="primary" onClick={() => $visitype('suggest')}><div>审批意见</div></Button>
            <Button className={styles.button} type="primary" onClick={() => $visitype('flowLog')}><div>流程日志</div></Button>
            <Button className={styles.button} type="primary" onClick={() => $visitype('comment')}><div>评论</div></Button>
            <Button className={styles.button} type="primary"><div>流转图</div></Button>
        </div>
        <AwesomeModal visitype={visitype} $visitype={$visitype} />
    </div>




}

export default ToDoDetail;