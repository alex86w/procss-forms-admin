import React, { useState, Provider } from 'react';
import { UserOutlined, AlertFilled, ContainerFilled, AuditOutlined, SendOutlined, PlusOutlined, ProfileFilled } from '@ant-design/icons';
import TodoList from './list'
import TweenOne from 'rc-tween-one';
import styles from './layout.less';
import { useModel, connect } from 'umi';



const Todo = (props: any) => {

    const { visible, activeKey, $activeKey, $visible, constants } = useModel('todoList')

    return <div className={styles.main}>
        <div className={visible ? styles.menu : styles.menuactive}>
            <div className={styles.header}>
                <UserOutlined /> {props.user.name}
            </div>
            <ul className={styles.menulist}>
                <li className={activeKey === '1' ? styles.active : ''} onClick={() => $activeKey("1")}><AlertFilled /><span>{constants[1]}</span> </li>
                <li className={activeKey === '4' ? styles.active : ''} onClick={() => $activeKey("4")}><ContainerFilled /><span>{constants[4]}</span></li>
                <li className={activeKey === '2' ? styles.active : ''} onClick={() => $activeKey("2")}><AuditOutlined /><span>{constants[2]}</span></li>
                <li className={activeKey === '3' ? styles.active : ''} onClick={() => $activeKey("3")}><SendOutlined /><span>{constants[3]}</span></li>
                <li className={activeKey === '5' ? styles.active : ''} onClick={() => $activeKey("5")}><ProfileFilled /><span>{constants[5]}</span></li>
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
            <TodoList activeKey={activeKey} title={constants[activeKey]} />
        </div>
    </div>
}

const mapPropsState = (state: any) => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapPropsState)(Todo)