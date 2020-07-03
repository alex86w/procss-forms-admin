import React from 'react';
import styles from './style.less';
import { Button, Row, Col, Avatar, Modal, Tabs, Typography } from 'antd';
import { LinkOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';


class Permission extends React.Component {
    state = { preVisible: false, urlVisible: false }
    render() {
        const urlTitle = <div><span>业务访问链接</span><span style={{ fontSize: '12px', color: '#91A1B7', marginLeft: 20 }}>团队成员访问该链接需要登录并授权</span></div>;
        const urlDiv = <Row style={{ padding: '10px 0px' }}>
            <Col span={18}><Typography.Paragraph copyable strong ellipsis={{ Row: 2, expandable: true }}>https://t56wl49c7o.jiandaoyun.com/f/5e60a671b7354c0006f544c7</Typography.Paragraph></Col>
            <Col><Button style={{ marginLeft: 10 }} type='link' onClick={() => window.open('https://t56wl49c7o.jiandaoyun.com/f/5e60a671b7354c0006f544c7')}>打开</Button></Col>
        </Row >;
        return (
            <div className={styles.containor}>
                <div className={styles.gpline}><span className={styles.title}>数据权限</span><span className={styles.content}>设置对应的「数据权限」，可以让团队成员管理业务搜集到的数据</span><a style={{ marginLeft: 10 }}>帮助文档</a><span style={{ float: 'right' }}><Button icon={<LinkOutlined />} type='link'
                    onClick={() => Modal.success({
                        title: urlTitle,
                        content: urlDiv,
                        width: 600
                    })}>业务访问链接</Button></span></div>
                <div className={styles.gpline} style={{ padding: '15px 24px' }}><Button icon={<PlusOutlined />} type='primary' onClick={() => this.setState({ preVisible: true })}>新建权限组</Button></div>
                <div className={styles.gpline}>
                    <div><span>查看权限</span><span style={{ float: "right" }}><Button type='link' onClick={() => this.setState({ preVisible: true })}>编辑</Button>|<Button type='link' danger >删除</Button></span></div>
                    <div><span>查看权限</span><span style={{ float: "right" }}><Button type='link' onClick={() => this.setState({ preVisible: true })}>编辑</Button>|<Button type='link' danger >删除</Button></span></div>
                    <div><span>查看权限</span><span style={{ float: "right" }}><Button type='link' onClick={() => this.setState({ preVisible: true })}>编辑</Button>|<Button type='link' danger >删除</Button></span></div>
                </div>
                <div className={`${styles.body} ${styles.buttomBorder}`}>
                    <Button type='link' icon={<PlusOutlined />} onClick={this.handleShowModal}>点击选择成员</Button><br />
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <Button type='link' onClick={this.handleShowModal}>编辑</Button>
                </div>
                <div className={styles.gpline} style={{ border: 0 }}><span className={styles.title}>发起流程</span><span className={styles.content}>在此分组内的成员可以发起流程，设置了业务共享的成员自动加入此分组</span></div>
                <div className={`${styles.body} ${styles.buttomBorder}`}>
                    <Button type='link' icon={<PlusOutlined />} onClick={this.handleShowModal}>点击选择成员</Button><br />
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <Button type='link' onClick={this.handleShowModal}>编辑</Button>
                </div>
                <div className={styles.gpline} style={{ border: 0 }}><span className={styles.title}>查看全部流程</span><span className={styles.content}>在此分组内的成员可以查看全部流程</span></div>
                <div className={`${styles.body} ${styles.buttomBorder}`}>
                    <Button type='link' icon={<PlusOutlined />} onClick={this.handleShowModal}>点击选择成员</Button><br />
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <Button type='link' onClick={this.handleShowModal}>编辑</Button>
                </div>
                <div className={styles.gpline} style={{ border: 0 }}><span className={styles.title}>管理全部流程</span><span className={styles.content}>在此分组内的成员可以管理全部流程</span></div>
                <div className={`${styles.body} ${styles.buttomBorder}`}>
                    <Button type='link' icon={<PlusOutlined />} onClick={this.handleShowModal}>点击选择成员</Button><br />
                    <span className={styles.userItem}><Avatar className={styles.userAvtar} icon={<UserOutlined />} />案件库哈斯的话</span>
                    <Button type='link' onClick={this.handleShowModal}>编辑</Button>
                </div>
                <Modal
                    title='添加权限组'
                    visible={this.state.preVisible}
                    cancelText='取消'
                    okText='保存'
                    onCancel={() => this.setState({ preVisible: false })}
                    onOk={() => this.setState({ preVisible: false })}
                    width='600px'
                >
                    <Tabs defaultActiveKey="1" tabPosition='left' style={{ border: '1px solid #ebedf0' }}>
                        <Tabs.TabPane tab='名称信息' key='1'>
                            <div style={{ color: '#91A1B7', lineHeight: '32px' }}>可设置权限组名称和描述信息</div>
                            form1
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='操作权限' key='2'>
                            <div style={{ color: '#91A1B7', lineHeight: '32px' }}>可对流程和数据进行哪些操作</div>
                            form2
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='字段权限' key='3'>
                            <div style={{ color: '#91A1B7', lineHeight: '32px' }}>可以查看和编辑数据的哪些字段</div>
                            form3
                        </Tabs.TabPane>
                        <Tabs.TabPane tab='数据权限' key='4'>
                            <div style={{ color: '#91A1B7', lineHeight: '32px' }}>可以查看到哪些数据</div>
                            form4
                        </Tabs.TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}

export default Permission
