import React, { ReactText } from 'react';
import ReactDOM from 'react-dom';
import { ListView, InputItem, Button, PullToRefresh } from 'antd-mobile';
import styles from './layout.less';
import { Modal } from 'antd-mobile';
import { loginFetch } from '@/services/user';
import { message } from 'antd';
import { Response } from '@/services/base';
import { query } from '@/services/todo';
import moment from 'moment';
import { getToken } from '@/utils/request';
import { history } from 'umi';

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
    list: any;
    constructor(props: any) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1: any, row2: any) => row1 !== row2
        })

        this.state = {
            dataSource,
            isLoading: !!getToken(),
            height: document.documentElement.clientHeight,
            useBodyScroll: true,
            userName: '',
            password: "",
            visible: !getToken(),
            pagination: {
                page: 0,
                size: 5
            }
        };
    }
    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto'
        } else {
            document.body.style.overflow = 'hidden'
        }
    }
    async componentDidMount() {
        if (this.list) {
            //@ts-ignore
            const H = this.state.height - (ReactDOM.findDOMNode(this.list) || {}).offsetTop;
            this.setState({
                height: H
            })
        }
        if (getToken()) {
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
    }
    async componentWillReceiveProps(nextProps: any) {
        if (!getToken()) {
            this.setState({
                visible: true
            })
        }
        if (this.props.activeKey !== nextProps.activeKey) {
            const pagination = { page: 0, size: 5 };
            const res: any = await query({ state: nextProps.activeKey, ...pagination });
            if (res.success) {
                this.rData = res.data;
                this.setState({
                    pagination: {
                        ...pagination,
                        total: res.count
                    },
                    isLoading: false,
                    dataSource: this.state.dataSource.cloneWithRows(this.rData)
                })
            }
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
        this.setState({
            isLoading: true
        })
        this.fetchMore(this.props.activeKey, { ...this.state.pagination, page: this.state.pagination.page + 1 })
    }

    initData = async () => {
        const res: any = await query({ state: this.props.activeKey, page: 0, size: 5 });
        if (res.success) {
            this.rData = [...res.data];
            this.setState({
                pagination: {
                    page: 0,
                    size: 5,
                    total: res.count
                },
                isLoading: false,
                dataSource: this.state.dataSource.cloneWithRows(this.rData)
            })
        } else {
            message.error("获取数据失败", 2)
        }
    }

    onRefresh = () => {
        if (!getToken()) return this.setState({ visible: true })
        this.setState(
            {
                refresh: true,
                isLoading: true,
                pagination: { page: 0, size: 5 }
            },
            this.initData
        )

    }

    fetchLogin = async (callback?: (v: boolean) => void) => {
        if (this.state.userName && this.state.password) {
            const params = {
                account: this.state.userName,
                pwd: this.state.password
            }
            const res = await loginFetch<Response<any>>(params);
            if (res.success) {
                sessionStorage.setItem('token', res.token);
                this.setState({ visible: false })
                callback && callback(true)
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
                <div key={rowID} style={{ padding: '0 15px' }} onClick={() => history.replace(`/mobile/tododetail?todoid=${obj.formId}`)}>
                    <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 14,
                            borderBottom: '1px solid #F6F6F6',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between"
                        }}
                    >{obj.formTitle} <div>进行中</div></div>
                    <div style={{ width: "100%" }} >
                        {obj.briefData && Object.keys(obj.briefData).map(item =>
                            <div className={styles.row}>{obj.briefData[item].label + '：' + obj.briefData[item].value} </div>
                        )}
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.row}>创建人：{obj.createUser}</div>
                        <div> {moment.utc(obj.createAt).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>

                </div>
            );
        };
        return <div style={{ width: "100%" }}>
            <ListView
                dataSource={this.state.dataSource}
                ref={el => this.list = el}
                renderRow={row}
                onEndReached={this.onEndReached}
                scrollRenderAheadDistance={500}
                onEndReachedThreshold={10}
                renderSeparator={separator}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? '加载中...' : ''}
                </div>)}
                useBodyScroll={this.state.useBodyScroll}
                pullToRefresh={
                    //@ts-ignore
                    <PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh} />
                }
                style={this.state.useBodyScroll ? {} : {
                    height: this.state.height,
                    border: '1px solid #ddd',
                    margin: '5px 0'
                }}
                pageSize={5}

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
                        <Button style={{ width: "100%" }} type="primary" onClick={() => this.fetchLogin((success) => success && this.setState({ userName: "", password: "" }))} >登陆</Button>
                    </div>
                </div>
            </Modal>

        </div >
    }

}