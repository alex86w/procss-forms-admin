import React, { useState } from 'react';
import Form from '..';
import { Button } from 'antd';
import styles from './index.less';
import AwesomeModal, { VisiType } from '../components/AwesomeModal';


const ToDoDetail = function (props: any) {
    const [visitype, $visitype] = useState<VisiType>('none')

    return <div style={{ width: "100%" }}>
        <div style={{ width: "100%", paddingBottom: 130, background: 'transparent' }}>
            <Form />
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