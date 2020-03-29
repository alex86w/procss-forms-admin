import React, { useState, Provider } from 'react';
import { UserOutlined, AlertFilled, ContainerFilled, AuditOutlined, SendOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import TodoList from './list'
import TweenOne from 'rc-tween-one';
import styles from './layout.less';

const constants = {
    "1": "我的代办",
    "4": "我的发起",
    "2": "我的处理",
    "3": "我的抄送"
}

type ActiveKey = keyof typeof constants;

export default (props: any) => {
    const [activeKey, $activeKey] = useState<ActiveKey>("1")
    const [visible, $visible] = useState<boolean>(true)

    return <div className={styles.main}>
        <div className={visible ? styles.menu : styles.menuactive}>
            <div className={styles.header}>
                <UserOutlined /> ANTD-MOBILE
            </div>
            <ul className={styles.menulist}>
                <li className={activeKey === '1' ? styles.active : ''} onClick={() => $activeKey("1")}><AlertFilled /><span>{constants[1]}</span> </li>
                <li className={activeKey === '4' ? styles.active : ''} onClick={() => $activeKey("4")}><ContainerFilled /><span>{constants[4]}</span></li>
                <li className={activeKey === '2' ? styles.active : ''} onClick={() => $activeKey("2")}><AuditOutlined /><span>{constants[2]}</span></li>
                <li className={activeKey === '3' ? styles.active : ''} onClick={() => $activeKey("3")}><SendOutlined /><span>{constants[3]}</span></li>
            </ul>
        </div>
        <div className={styles.content}>
            <div className={styles.headerbar}>
                <a onClick={() => $visible(!visible)}>
                    <TweenOne animation={{ rotate: 45, repeat: 0, duration: 500 }} reverse={!visible} >
                        <PlusOutlined style={{ transform: 'rotate(45deg)' }} />
                    </TweenOne>
                </a>
                <span className={styles.title}>{constants[activeKey]}</span>
            </div>
            <TodoList activeKey={activeKey} title={constants[activeKey]}/>
        </div>
    </div>
}