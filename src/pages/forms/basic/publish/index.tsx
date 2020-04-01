import React, { Dispatch } from 'react';
import { Button, Modal, Switch, Typography, Input, Row, Col, notification, Spin } from 'antd';
import {
    PlusOutlined,
    UserOutlined, ApartmentOutlined,
    QrcodeOutlined
} from '@ant-design/icons';
import QrCode from 'qrcode.react';

import { history, connect } from 'umi';
import styles from './style.less';
import { MultipleSelectMode, SelectType } from '../../../../components/MultipleSelectMode';

//@ts-ignore
const { formid } = history.location.query;

const url = `${location.origin}/mobile?tosubid=${formid}`;

interface PublishState {
    display: any;
    userVisible: boolean,
    selectMode: SelectType[],
    qrv: any

}


class Publish extends React.Component<{ dispatch: Dispatch<any>, data: any, dataId: string, loading: any }, PublishState>{
    state = {
        display: 'none',
        userVisible: false,
        selectMode: [],
        qrv: ''
    }


    handleShowModal = () => {
        this.setState({ userVisible: true })
    }

    handleChange = () => {
        const users: any = [],
            depts: any = [],
            { selectMode, display } = this.state,
            { data, dispatch } = this.props,
            //@ts-ignore
            { formid } = history.location.query;
        selectMode.forEach((it: SelectType) => {
            if (it.type === 'user') users.push({ id: it.id, name: it.name })
            else depts.push({ id: it.id, name: it.name })
        })
        dispatch({
            type: 'publish/modify',
            payload: {
                formId: formid,
                users,
                depts,
                publicUrl: display !== 'none' ? url : '',
            }
        })
    }
    componentDidMount() {
        const { users = [], depts = [], publicUrl } = this.props.data;
        this.changeState(users, depts, publicUrl)
    }
    UNSAFE_componentWillReceiveProps(nextProps: any) {
        const { users = [], depts = [], publicUrl } = nextProps.data;
        if (nextProps.dataId !== this.props.dataId) {
            this.changeState(users, depts, publicUrl)
        }
    }
    changeState = (users = [], depts = [], publicUrl: string) => {
        const selectMode: SelectType[] = [];
        users.forEach((it: any) => selectMode.push({ ...it, type: 'user' }))
        depts.forEach((it: any) => selectMode.push({ ...it, type: 'dept' }))
        this.setState({
            selectMode,
            display: publicUrl ? 'block' : 'none'
        })

    }

    render() {
        const { userVisible, selectMode } = this.state;
        return (
            <div className={styles.containor}>
                <div className={styles.save}><Button type="primary" onClick={() => this.handleChange()}>保存</Button></div>
                <Spin spinning={this.props.loading['publish/query']}>
                    {/**
                 * @comment: 内部提交数据；
                */}
                    <div className={styles.gpline}><span className={styles.title}>团队成员</span><span className={styles.content}>将表单发布给团队成员，成员登录系统后可填写表单</span></div>
                    <div className={styles.body}>
                        {this.state.selectMode.length <= 0 && <Button type='link' icon={<PlusOutlined />} onClick={this.handleShowModal}>点击选择成员</Button>}<br />
                        <ul>
                            {selectMode.map((item: SelectType, index) => (
                                <li className={styles.boxItem} key={item.type + item.id}>
                                    {item.type === 'user'
                                        ? <UserOutlined style={{ color: '#1890ff' }} />
                                        : <ApartmentOutlined />}
                                    <span>{item.name}</span>
                                </li>))}
                            {this.state.selectMode.length > 0 && <li className={styles.boxItem} key={'link'} style={{ background: "transparent" }}><Button type='link' onClick={this.handleShowModal}>编辑</Button></li>}

                        </ul>
                        {/* {} */}
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div className={styles.gpline}><span className={styles.title}>公开链接</span><span className={styles.content}>将表单发布为公开链接，无需登录即可填写表单</span></div>
                        <div className={styles.gpline} style={{ padding: '10px 24px' }}>
                            <Switch checkedChildren="开" unCheckedChildren="关" onChange={() => this.setState({ display: this.state.display === 'none' ? "block" : "none" })} checked={this.state.display !== 'none'} />
                        </div>
                        <div className={styles.gpline} style={{ display: this.state.display }}>
                            <div className={styles.topTitle}>链接地址</div>
                            <Row>
                                <Col><Row><Typography.Paragraph copyable={{ text: url }} strong>{url}</Typography.Paragraph><span style={{ lineHeight: '44px' }}><QrcodeOutlined onClick={() => this.setState({ qrv: 1 })} style={{ color: '#1890ff', fontSize: 16, marginLeft: 20 }} /> </span></Row></Col>
                                <Col><Button style={{ marginLeft: 10 }} onClick={() => window.open(url)}>打开</Button></Col>
                            </Row>
                        </div>

                    </div>

                    <Modal
                        visible={!!this.state.qrv}
                        onCancel={() => this.setState({ qrv: false })}
                        onOk={() => this.setState({ qrv: false })}
                        destroyOnClose
                        width="55vh"
                    >
                        <QrCode value={url} style={{ width: "50vh", height: "50vh" }} />
                    </Modal>
                    <MultipleSelectMode visible={userVisible} onCancel={() => this.setState({ userVisible: false })} value={this.state.selectMode} onOk={(v) => this.setState({ selectMode: v, userVisible: false })} />
                </Spin>
            </div >
        )
    }
}

export default connect(({ publish, loading }: any) => ({ ...publish, loading: loading['effects'] }))(Publish)