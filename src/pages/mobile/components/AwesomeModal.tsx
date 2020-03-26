import React, { useState } from 'react';
import { Modal, List, } from 'antd-mobile';
import styles from './styles.less';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export type VisiType = 'suggest' | 'comment' | 'flowLog' | 'none';

const data: any[] = [];
for (let i = 0; i < 10; i++) {
    data.push(i);
}
const suggest = (item: any) => (
    <div className={styles.suggest}>
        <div className='item-header'>流程发起节点 </div>
        <div className="space-between"><span><UserOutlined /> jdy123123123</span><span>时间</span> </div>
        <div className="content"><span>123</span></div>
        <div className='time'>
            <div><span>开始时间：2020</span> </div>
            <div><span>结束时间：2020</span></div>
        </div>
    </div>
)
const comment = (item: any) => (
    <div className={styles.comment}>
        <div className="space-between"><span><UserOutlined /> jdy123123123</span><span>时间</span> </div>
        <div className="content"><span>123</span></div>
    </div>
)
const flowLog = (item: any) => (
    <div className={styles.flowLog}>
        <div className='item-header'>流程发起节点 </div>
        <div className='space-between'><span><UserOutlined />jdy123123123</span><span>提交</span> </div>
        <div className='time'>
            <div><span>开始时间：2020</span> </div>
            <div><span>结束时间：2020</span></div>
        </div>
    </div>
)


const renderFooter = (active: boolean, $active: React.Dispatch<React.SetStateAction<boolean>>) => (
    <div className={styles.footer}>
        {!active && <input style={{ width: "88%", marginBottom: 10, border: '1px solid rgba(0,0,0,.3)' }} onFocus={() => $active(true)} />}
        {active && <div style={{ width: "100%" }}>
            <textarea style={{ width: "88%", height: "100px" }} autoFocus />
            <Button type="primary" style={{ width: '100%' }}>提交</Button>
        </div>}
    </div>
)
interface AwesomeModalProps {
    visitype: VisiType
}


const AwesomeModal = function (props: AwesomeModalProps) {
    const [active, $active] = useState(false)
    const { visitype } = props;

    const title: { [key: string]: string } = {
        comment: '评论',
        flowLog: '流程日志',
        suggest: '审批意见',
    }

    return (
        <Modal
            popup
            visible={true}
            animationType="slide-up"
            title={title[visitype]}
        >
            <List
                style={{ height: '55vh', overflow: 'scroll' }}
            >
                {data.map(it => (<List.Item key={it}>
                    {suggest(it)}
                </List.Item>))}
                <List.Item style={{ height: 50, textAlign: 'center' }}>
                    <div style={{ width: "100%", padding: "15px 8px", fontSize: 13, color: "rgba(0,0,0,.3)", height: 50 }}> 没有更多...</div>
                </List.Item>

            </List>
            {active && <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "transparent" }} onClick={() => $active(false)} />}
            {visitype === 'comment' && renderFooter(active, $active)}
        </Modal>
    )
}

export default AwesomeModal;