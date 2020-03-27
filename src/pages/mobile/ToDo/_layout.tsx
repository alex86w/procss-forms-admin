import React, { useState } from 'react';
import { UserOutlined, AlertFilled, ContainerFilled, AuditOutlined, SendOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './layout.less';
import { Button } from 'antd-mobile';

const constants = {
    myTodos: "我的待办",
    myPromotion: "我的发起",
    myDone: "我的处理",
    myCC: "我的抄送"
}




export default (props: any) => {
    const [activeKey, $activeKey] = useState<string>("0")
    const [visible, $visible] = useState<boolean>(true)

    return <div className={styles.main}>
        <div className={visible ? styles.menu : styles.menuactive}>
            <div className={styles.header}>
                <UserOutlined /> ANTD-Mobibe
            </div>
            <ul className={styles.menulist}>
                <li className={activeKey === '0' ? styles.active : ''} onClick={() => $activeKey("0")}><AlertFilled /><span>{constants.myTodos}</span> </li>
                <li className={activeKey === '1' ? styles.active : ''} onClick={() => $activeKey("1")}><ContainerFilled /><span>{constants.myPromotion}</span></li>
                <li className={activeKey === '2' ? styles.active : ''} onClick={() => $activeKey("2")}><AuditOutlined /><span>{constants.myDone}</span></li>
                <li className={activeKey === '3' ? styles.active : ''} onClick={() => $activeKey("3")}><SendOutlined /><span>{constants.myCC}</span></li>
            </ul>
        </div>
        <div className={styles.content}>
            <div className={styles.headerbar}><button onClick={() => $visible(!visible)}><PlusOutlined /></button><span className={styles.title}>我的代办</span> </div>
            {props.children}
        </div>
    </div>
}