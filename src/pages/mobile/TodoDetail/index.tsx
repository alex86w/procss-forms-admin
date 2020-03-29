import React, { useState, useEffect } from 'react';
import Form from '..';
import { Button, PageHeader } from 'antd';
import styles from './index.less';
import AwesomeModal, { VisiType } from '../components/AwesomeModal';
import { useHistory, useModel, history } from 'umi';
import { BackwardOutlined, FastBackwardOutlined, LeftOutlined } from '@ant-design/icons';
import { Menu, NavBar, Icon } from 'antd-mobile'

const ToDoDetail = function (props: any) {

    const [visitype, $visitype] = useState<VisiType>('none')
    const { location } = useHistory();
    const { asyncFetch } = useModel('todoForm')
    useEffect(() => {
        asyncFetch(location)
    }, [location.search]);

    return <div style={{ width: "100%" }}>
        <NavBar
            onLeftClick={() => history.goBack()}
            mode='dark'
            leftContent={<Icon type='left' />} >
            {props.title || '待办事项'}
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