import React, { useRef, ReactText, useContext } from 'react';
import { ListView, InputItem, Button } from 'antd-mobile';
import styles from './layout.less';
import { Modal } from 'antd-mobile';
import { loginFetch } from '@/services/user';
import { message } from 'antd';
import { Response } from '@/services/base';
import { query } from '@/services/todo';

interface ListState {
    [key: string]: any;
    userName: string;
    password: string;
    visible: boolean;
    pagination: {
        page: number,
        size: number,
        total?: number
    }
}

const data: any[] = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
]
const NUM_ROWS = 20;
let pageIndex = 0;




const separator = (sectionID: ReactText, rowID: ReactText) => (
    <div
        key={`${sectionID}-${rowID}`}
        style={{
            backgroundColor: '#F5F5F9',
            height: 8,
            borderTop: '1px solid #ECECED',
            borderBottom: '1px solid #ECECED',
        }}
    />
);





export default class TodoList extends React.Component<{ activeKey: string }, ListState> {
    rData: any[] = [];
    list = React.createRef<ListView>();
    constructor(props: any) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1: any, row2: any) => row1 !== row2
        })

        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
            userName: '',
            password: "",
            visible: sessionStorage.getItem('token') ? false : true,
            pagination: {
                page: 0,
                size: 5
            }
        };
    }

    async componentDidMount() {
        const res: any = await query({ state: this.props.activeKey, ...this.state.pagination });
        if (res.success) {
            this.rData = res.data;
            this.setState({
                pagination: {
                    ...this.state.pagination,
                    total: res.count
                },
                isLoading: false,
                dataSource: this.state.dataSource.cloneWithRows(this.rData)
            })
        } else {
            message.error("获取数据失败", 2)
        }
    }
    

    fetchMore = async (state: string, pagination: any) => {
        const res: any = await query({ state, pagination });
        if (res.success) {
            this.rData = [...this.rData, ...res.data];
            this.setState({
                pagination: {
                    ...this.state.pagination,
                    total: res.count
                },
                isLoading: false,
                dataSource: this.state.dataSource.cloneWithRows(this.rData)
            })
        } else {
            message.error("获取数据失败", 2)
        }
    }
    



    onEndReached = (event: any) => {
        if (this.state.isLoading && (this.state.pagination.total || 0) <= this.rData.length) {
            return;
        }
        this.fetchMore(this.props.activeKey, { ...this.state.pagination, page: this.state.pagination.page + 1 })

    }
    fetchLogin = async () => {
        if (this.state.userName && this.state.password) {
            const params = {
                account: this.state.userName,
                pwd: this.state.password
            }
            const res = await loginFetch<Response<any>>(params);
            if (res.success) {
                sessionStorage.setItem('token', res.token);
                this.setState({ visible: false })

                //todo
            } else {
                message.error('操作失败', 2)
            }

        } else {
            message.warn('请输入用户名或密码！', 2)
        }

    }

    render() {
        let index = this.rData.length - 1;
        const row = (rowData: any, sectionID: ReactText, rowID: ReactText) => {
            if (index < 0) {
                index = this.rData.length - 1;
            }
            const obj = this.rData[index--];
            return (
                <div key={rowID} style={{ padding: '0 15px' }}>
                    <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between"
                        }}
                    >{obj.title} <div>进行中</div></div>
                    <div style={{ width: "100%" }} onClick={() => console.log(123)}>
                        <div className={styles.row}>姓名：123</div>
                        <div className={styles.row}>性别：男</div>
                        <div className={styles.row}>审批节点：rgdesaa</div>
                        <div className={styles.row}>用户：aaaa</div>
                    </div>
                    <div style={{
                        lineHeight: '50px',
                        fontSize: 16,
                        borderBottom: '1px solid #F6F6F6',
                    }}>
                        2020-12-12 15:00
                    </div>

                </div>
            );
        };
        return <div style={{ width: "100%" }}>
            <ListView
                style={{
                    width: "100%",
                    height: "calc(100vh - 65px) ",
                }}
                dataSource={this.state.dataSource}
                ref={this.list as React.RefObject<ListView>}
                renderRow={row}
                onEndReached={this.onEndReached}
                scrollRenderAheadDistance={500}
                onEndReachedThreshold={10}
                renderSeparator={separator}
            />
            <Modal
                visible={this.state.visible}
                transparent
                maskClosable={false}
                title="请先登陆"
                closable={false}
                animationType="slide-up"
            >
                <div className={styles.loginbox}>
                    <div className={styles.labelInput}>
                        <InputItem placeholder="用户名" style={{ borderBottom: "1px solid rgba(0,0,0,.1)" }} onChange={v => this.setState({ userName: v })} value={this.state.userName && this.state.userName} />
                    </div>
                    <div className={styles.labelInput}>
                        <InputItem placeholder="密码" type="password" style={{ borderBottom: "1px solid rgba(0,0,0,.1)" }} onChange={v => this.setState({ password: v })} value={this.state.password && this.state.password} />
                    </div>
                    <div className={styles.labelInput}>
                        <Button style={{ width: "100%" }} type="primary" onClick={() => this.fetchLogin()} >登陆</Button>
                    </div>
                </div>
            </Modal>

        </div>
    }

}