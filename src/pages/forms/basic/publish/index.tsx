import React, { Dispatch, useEffect } from 'react';
import { Button, Modal, Switch, Typography,  Row, Col,  Spin } from 'antd';
import {
    QrcodeOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import QrCode from 'qrcode.react';

import { history, connect, useModel } from 'umi';
import styles from './style.less';
import { MultipleSelectMode, SelectType } from '../../../../components/MultipleSelectMode';


interface PublishState {
    display: any;
    userVisible: boolean,
    selectMode: SelectType[],
    qrv: any
    , url: string

}


class Publish extends React.Component<{ dispatch: Dispatch<any>, data: any, dataId: string, loading: any }, PublishState>{
    state = {
        display: 'none',
        userVisible: false,
        selectMode: [],
        qrv: '',
        url: ''
    }


    handleShowModal = () => {
        this.setState({ userVisible: true })
    }

    handleChange = () => {
        const users: any = [],
            depts: any = [],
            roles: any = [],
            { selectMode, display } = this.state,
            { data, dispatch } = this.props,
            //@ts-ignore
            { formid } = history.location.query;
        selectMode.forEach((it: SelectType) => {
            if (it.type === 'user') users.push({ id: it.id, name: it.name })
            else if (it.type === 'dept') depts.push({ id: it.id, name: it.name })
            else roles.push({ id: it.id, name: it.name })
        })
        dispatch({
            type: 'publish/modify',
            payload: {
                formId: formid,
                users,
                depts,
                roles,
                publicUrl: display !== 'none' ? this.state.url : '',
            }
        })
    }
    componentDidMount() {
        //@ts-ignore
        const { formid } = history.location.query;
        const url = `${location.origin}/mobile?tosubid=${formid}`;
       console.log(url)
        const { users = [], depts = [], publicUrl, roles = [] } = this.props.data;
        this.changeState(users, depts, publicUrl, roles)
        this.setState({ url })
    }
    UNSAFE_componentWillReceiveProps(nextProps: any) {
        const { users = [], depts = [], publicUrl, roles = [] } = nextProps.data;
        if (nextProps.dataId !== this.props.dataId) {
            this.changeState(users, depts, publicUrl, roles)
        }
    }
    changeState = (users = [], depts = [], publicUrl: string, roles = []) => {
        const selectMode: SelectType[] = [];
        users.forEach((it: any) => selectMode.push({ ...it, type: 'user' }))
        depts.forEach((it: any) => selectMode.push({ ...it, type: 'dept' }))
        roles.forEach((it: any) => selectMode.push({ ...it, type: 'role' }))
        this.setState({
            selectMode,
            display: publicUrl !== "0" ? 'block' : 'none'
        })
    }

    render() {
        return (
            <div className={styles.containor}>
                <div className={styles.save}><Button type="primary" onClick={() => this.handleChange()} icon={<Spin spinning={(this.props.loading['models'] || []).publish} indicator={<LoadingOutlined style={{ color: '#fff' }} />} />}>保存</Button></div>
                <Spin spinning={(this.props.loading['models'] || []).publish}>
                    {/**
                 * @comment: 内部提交数据；
                */}
                    <div className={styles.gpline}><span className={styles.title}>团队成员</span><span className={styles.content}>将业务发布给团队成员，成员登录系统后可填写业务</span></div>
                    <MultipleSelectMode value={this.state.selectMode} onChange={(v: any) => this.setState({ selectMode: v })} />
                    <div style={{ marginTop: 20 }}>
                        <div className={styles.gpline}><span className={styles.title}>公开链接</span><span className={styles.content}>将业务发布为公开链接，无需登录即可填写业务</span></div>
                        <div className={styles.gpline} style={{ padding: '10px 24px' }}>
                            <Switch checkedChildren="开" unCheckedChildren="关" onChange={() => this.setState({ display: this.state.display === 'none' ? "block" : "none" })} checked={this.state.display !== 'none'} />
                        </div>
                        <div className={styles.gpline} style={{ display: this.state.display }}>
                            <div className={styles.topTitle}>链接地址</div>
                            <Row>
                                <Col><Row><Typography.Paragraph copyable={{ text: this.state.url }} strong>{this.state.url}</Typography.Paragraph><span style={{ lineHeight: '44px' }}><QrcodeOutlined onClick={() => this.setState({ qrv: 1 })} style={{ color: '#1890ff', fontSize: 16, marginLeft: 20 }} /> </span></Row></Col>
                                <Col><Button style={{ marginLeft: 10 }} onClick={() => window.open(this.state.url)}>打开</Button></Col>
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
                        <QrCode value={this.state.url} style={{ width: "50vh", height: "50vh" }} />
                    </Modal>
                </Spin>
            </div >
        )
    }
}


const asyncFetchConnected = function (props: any) {
    const { AsyncFetch } = useModel('mode');
    useEffect(() => {
        AsyncFetch && AsyncFetch()
    }, [])
    return <Publish {...props} />
}

export default connect(({ publish, loading }: any) => ({ ...publish, loading: loading }))(asyncFetchConnected);;