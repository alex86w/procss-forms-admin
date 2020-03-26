import React, { } from 'react';
import Form from '..';
import { Button } from 'antd';
import styles from './index.less';
import AwesomeModal from '../components/AwesomeModal';


const ToDoDetail = function (props: any) {

    return <div style={{ width: "100%" }}>
        <div style={{ width: "100%", paddingBottom: 130, background: 'transparent' }}>
            <Form />
        </div>
        <div className={styles.nav}>
            <Button className={styles.button} type="primary"><div>审批意见</div></Button>
            <Button className={styles.button} type="primary"><div>流程日志</div></Button>
            <Button className={styles.button} type="primary"><div>评论</div></Button>
            <Button className={styles.button} type="primary"><div>流转图</div></Button>
        </div>
        <AwesomeModal/>
    </div>




}

export default ToDoDetail;