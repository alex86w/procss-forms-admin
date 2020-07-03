import React, { useState } from 'react';
import { Modal, List, } from 'antd-mobile';
import styles from './styles.less';
import { Button, Input } from 'antd';
import { BellTwoTone } from '@ant-design/icons';
import moment from 'moment';

export type VisiType = 'suggest' | 'comment' | 'flowLog' | 'none';

const suggest = (item: any) => (
    <div className={styles.suggest}>
        <div className='item-header'>{item.currentProcedureNode.label} </div>
        <div className="space-between"><span><BellTwoTone twoToneColor="#eb2f96" /> {item.submitUserName}</span><span /> </div>
        <div className="content"><span>{item.suggest}</span>

        </div>

        <div className='time'>
            {item.handWritten && <div> <span>手写签名：
                <img style={{
                    width: '80px',
                    height: '40px',
                    objectFit: 'contain'
                }} src={item.handWritten[0].url} /></span> </div>}
            <div><span>提交时间：{moment(item.createTime).format('YYYY-MM-DD HH:mm')}</span> </div>
            <div><span>处理时间：{moment(item.updatedAt).format('YYYY-MM-DD HH:mm')}</span></div>
        </div>
    </div>
)
const comment = (item: any) => (<div className={styles.comment}>
    <div className="space-between">
        <span>
            <BellTwoTone twoToneColor="#eb2f96" />
            {item.createUserName}
        </span>
        <span>{moment(item.createdAt).format('YYYY-MM-DD HH:mm')}</span>
    </div>
    <div className="content"><span>{item.value}</span></div>
</div>
)

const flowLog = (item: any) => (
    <div className={styles.flowLog}>
        <div className='item-header'>{item.node?.label} </div>
        <div className='space-between'><span><BellTwoTone twoToneColor="#eb2f96" />{item.submitUser?.name}</span><span>{item.result}</span> </div>
        <div className='time'>
            <div><span>提交时间：{moment(item.updatedAt).format('YYYY-MM-DD HH:mm')}</span> </div>
        </div>
    </div>
)


const Footer = (props: any) => {

    const [value, $value] = useState('');
    const { active, $active, postComment } = props;

    return <div className={styles.footer}>
        {!active && <input className={styles.trigger} onFocus={() => $active(true)} placeholder="请填写评论意见...." />}
        {active && <div style={{ width: "100%" }}>
            <Input.TextArea value={value} onChange={e => $value(e.target.value)} style={{ width: "88%", height: "100px" }} autoFocus />
            <Button type="primary" onClick={() => { postComment && postComment(value); $value('') }} style={{ width: '100%', marginTop: 5 }}>提交</Button>
        </div>}
    </div>
}
interface AwesomeModalProps {
    visitype: VisiType;
    $visitype: (v: VisiType) => void,
    data: Array<any>
    postComment?: (v: string) => void
}

const renders = {
    comment,
    flowLog,
    suggest
}


const AwesomeModal = function (props: AwesomeModalProps) {
    const [active, $active] = useState(false)

    const { visitype, $visitype, data = [], postComment } = props;

    const title: { [key: string]: string } = {
        comment: '评论',
        flowLog: '流程日志',
        suggest: '审批意见',
    }
   console.log(data)

    return (
        <Modal
            popup
            visible={visitype !== 'none'}
            animationType="slide-up"
            title={title[visitype]}
            onClose={() => {
                $visitype('none');
                if (active) $active(false);
            }}
        >
            <List
                style={{ height: '55vh', overflow: 'scroll' }}
            >
                {data.map(it => (<List.Item key={it.id}>
                    {visitype !== 'none' && renders[visitype](it)}

                </List.Item>))}
                <List.Item style={{ height: 50, textAlign: 'center' }}>
                    <div style={{ width: "100%", padding: "15px 8px", fontSize: 13, color: "rgba(0,0,0,.3)", height: 50 }}> 没有更多...</div>
                </List.Item>

            </List>
            {active && <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "transparent" }} onClick={() => $active(false)} />}
            {visitype === 'comment' && <Footer {...{ active, $active, postComment }} />}
        </Modal>
    )
}

export default AwesomeModal;