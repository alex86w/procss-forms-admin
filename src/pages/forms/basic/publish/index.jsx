import React, { } from 'react';
import { Button, Modal, Switch, Typography, Input, Row, Col, notification } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
     UserOutlined, ApartmentOutlined,
    QrcodeOutlined
} from '@ant-design/icons';
import QrCode from 'qrcode.react';
import {history} from 'umi';
import styles from './style.less';
import { MultipleSelectMode } from '../../../../components/MultipleSelectMode';
const {formid} = history.location.query;

const url =`http://192.168.0.106:8000/mobile?tosubid=${formid}` ;



class Publish extends React.Component {
    state = {
        visible: false,
        display: 'none',
        extvisible: false,
        extDiv: 'none',
        pwdDiv: 'none',
        userVisible: false,
        selectMode: []
    }


    handleOk = () => {
        this.setState({ visible: false, userVisible: true })
    }
    handleCancle = () => {
        this.setState({ userVisible: false })
    }
    handleShowModal = () => {
        this.setState({ userVisible: true })
    }
    handleSwitch = (e) => {
        if (e) {
            this.setState({ display: 'block' })
        }
        if (!e) {
            this.setState({ display: 'none' })
        }
    }
    handleSetExt = (e) => {
        if (e) {
            this.setState({ extDiv: 'block' })
        }
        if (!e) {
            this.setState({ extDiv: 'none' })
        }
    }
    handlePwd = (e) => {
        if (e) {
            this.setState({ pwdDiv: 'block' })
        }
        if (!e) {
            this.setState({ pwdDiv: 'none' })
        }
    }
    addUrlQuery = () => {
        const val = document.querySelector('#urlQuery');
        if (val.value.trim() === '') {
            notification.error({ message: '扩展字段不能为空' })
        }
    }
    handleSubmit = () => {
        const val = document.querySelector('#pwd');
        if (val.value.trim() === '') {
            notification.error({ message: '密码不能为空' })
        }
    }

    render() {
        const { userVisible, selectMode } = this.state;
        console.log(selectMode)
        return (
            <div className={styles.containor}>
                {/**
                 * @comment: 内部提交数据；
                */}
                <div className={styles.gpline}><span className={styles.title}>团队成员</span><span className={styles.content}>将表单发布给团队成员，成员登录系统后可填写表单</span></div>
                <div className={styles.body}>
                    {this.state.selectMode.length <= 0 && <Button type='link' icon={<PlusOutlined />} onClick={this.handleShowModal}>点击选择成员</Button>}<br />
                    <ul>
                        {selectMode.map((item, index) => (
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
                    <div className={styles.gpline}><span className={styles.title}>公开链接</span><span className={styles.content}>将表单发布为公开链接，无需登录即可填写表单</span><span className={styles.link}><a>《外链管理规范》</a></span></div>
                    <div className={styles.gpline} style={{ padding: '10px 24px' }}>
                        <Switch checkedChildren="开" unCheckedChildren="关" onChange={this.handleSwitch} />
                    </div>
                    <div className={styles.gpline} style={{ display: this.state.display }}>
                        <div className={styles.topTitle}>链接地址</div>
                        <Row>
                            <Col><Typography.Paragraph copyable strong>{url} <QrcodeOutlined onClick={() => this.setState({ qrv: 1 })} style={{ color: '#1890ff' }} /></Typography.Paragraph> </Col>
                            <Col><Button style={{ marginLeft: 10 }} onClick={() => window.open(url)}>打开</Button> <Button style={{ marginLeft: 10 }} onClick={() => this.setState({ extvisible: true })}>外联扩展</Button></Col>
                        </Row>
                    </div>
                    {/* <div className={styles.gpline}>
                        <div className={styles.topTitle}>填写设置</div>
                        <Row align='middle' gutter={16} style={{ marginBottom: 20 }}>
                            <Col span={4} >凭密码填写</Col>
                            <Col span={4} ><Switch checkedChildren="开" unCheckedChildren="关" onChange={this.handlePwd} /></Col>
                            <Col span={16}  style={{ display: this.state.pwdDiv }}>
                                <Input style={{ width: 200 }} id='pwd' /><Button style={{ marginLeft: 10 }} type='primary' onClick={this.handleSubmit}>保存密码</Button>
                            </Col>
                        </Row>
                    </div> */}
                </div>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancle}
                    okText='邀请成员'
                    cancelText='关闭'
                >
                    <div style={{ fontSize: 16, marginTop: 40, lineHeight: '40px' }}>团队中还没有成员，现在开始邀请成员吧</div>
                    <div style={{ fontSize: 12, lineHeight: '18px', color: '#5E6D82', marginBottom: 20 }}>受到邀请用户加入你的团队后，你可以发布表单给他/她填写。</div>
                </Modal>
                <Modal
                    title='外联扩展'
                    visible={this.state.extvisible}
                    onOk={() => this.setState({ extvisible: false })}
                    onCancel={() => this.setState({ extvisible: false })}
                    okText='提交'
                    cancelText='关闭'
                    width='700px'
                >
                    <div style={{ fontSize: 12, lineHeight: '18px', color: '#5E6D82', marginBottom: 20 }}>你可以给链接添加扩展属性值，从而生成多个链接地址。这些地址可以发布到不同的渠道中，用来区分数据来源</div>
                    <Switch checkedChildren="开" unCheckedChildren="关" onChange={this.handleSetExt} />
                    <div style={{ display: this.state.extDiv }}>
                        <Row style={{ marginTop: 20, backgroundColor: '#F3F6FC', padding: '10px 0px', marginBottom: 20 }} gutter={16} align='middle'>
                            <Col span={12}>{url}</Col>
                            <Col span={12}> <Input style={{ width: '70%' }} id='urlQuery' /><Button style={{ marginLeft: 10 }} onClick={this.addUrlQuery}>添加</Button></Col>
                        </Row>
                        {/* <div>
                            <Row>
                                <Col span={6}>拓展字段</Col>
                                <Col span={18}>链接</Col>
                            </Row>
                            <Row align='middle' style={{ backgroundColor: '#F3F6FC', padding: '10px 0px', marginTop: 5 }}>
                                <Col span={6}>111111</Col>
                                <Col span={16}>{url}?111111</Col>
                                <Col span={2}>
                                    <Button icon={<DeleteOutlined />} />
                                </Col>
                            </Row>
                            <Row align='middle' style={{ backgroundColor: '#F3F6FC', padding: '10px 0px', marginTop: 5 }}>
                                <Col span={6}>111111</Col>
                                <Col span={16}>{url}?111111</Col>
                                <Col span={2}>
                                    <Button icon={<DeleteOutlined />} />
                                </Col>
                            </Row>
                        </div> */}
                    </div>
                </Modal>
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
            </div >
        )
    }
}

export default Publish
