import React, { ReactText } from 'react';
import ReactDOM from 'react-dom';
import { ListView, PullToRefresh } from 'antd-mobile';
import styles from './layout.less';
import { Toast } from 'antd-mobile';
import { query } from '@/services/todo';
import moment from 'moment';
import { getToken } from '@/utils/request';
import { queryWirtableList } from '@/services/form';
import { history } from 'umi';
import { querySelfFinish } from '@/services/formData';
import { generate } from 'shortid';
import { Steps } from 'antd-mobile';
import { CopyTwoTone } from '@ant-design/icons'

const Step = Steps.Step;

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
            background: 'transparent',
            borderWidth: 0,
            margin: 0,
            padding: 5
        }}
    />
);

export default class TodoList extends React.Component<{ activeKey: string, title: string, visible: string, $visible: any }, ListState> {
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
            loadErr: false,
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
            let res: any;

            // const res: any = await query({ state: this.props.activeKey, ...this.state.pagination });
            if (this.props.activeKey === '5') {
                res = await queryWirtableList({ ...this.state.pagination })
            } else if (this.props.activeKey === '6') {
                res = await querySelfFinish({ ...this.state.pagination })
            } else {
                res = await query({ state: this.props.activeKey, ...this.state.pagination })
            }
            if (res.success) {
                this.rData = res.data;
                this.setState({
                    pagination: {
                        ...this.state.pagination,
                        total: res.count
                    },
                    isLoading: false,
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                })
            } else {
                Toast.info("获取数据失败", 2)
                this.setState({
                    isLoading: false,
                })
            }
        }
    }
    async UNSAFE_componentWillReceiveProps(nextProps: any) {
        if (!getToken()) {
            this.setState({
                visible: true
            })
        }
        if (this.props.activeKey !== nextProps.activeKey) {
            const pagination = { page: 0, size: 5 };
            let res: any;
            if (nextProps.activeKey === '5') {
                res = await queryWirtableList({ ...pagination })
            } else if (nextProps.activeKey === '6') {
                res = await querySelfFinish({ ...pagination })
            } else {
                res = await query({ state: nextProps.activeKey, ...pagination });
            }
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
            } else {
                this.setState({
                    isLoading: false
                })
            }
        }
    }

    fetchMore = async (state: string, pagination: any) => {
        let res: any;
        pagination = { ...pagination, page: ++pagination.page }
        if (this.props.activeKey === '5') {
            res = await queryWirtableList({ ...pagination })
        } else if (this.props.activeKey === '6') {
            res = await querySelfFinish({ ...pagination })
        } else {
            res = await query({ state: this.props.activeKey, ...pagination });
        }
        if (res.success) {
            this.rData = [...this.rData, ...res.data];
            this.setState({
                pagination: {
                    ...pagination,
                    total: res.count
                },
                isLoading: false,
                dataSource: this.state.dataSource.cloneWithRows(this.rData)
            })
        } else {
            Toast.info("获取数据失败", 2),
                this.setState({
                    isLoading: false
                })
        }
    }

    onEndReached = (event: any) => {
        const { page, size, total } = this.state.pagination;
        if (this.state.isLoading || !total || (page + 1) * size >= total) {
            return;
        }
        this.setState({
            isLoading: true
        })
        this.fetchMore(this.props.activeKey, this.state.pagination)
    }

    initData = async () => {
        let res: any;
        if (this.props.activeKey === '5') {
            res = await queryWirtableList({ page: 0, size: 5 })
        } else if (this.props.activeKey === '6') {
            res = await querySelfFinish({ page: 0, size: 5 })
        } else {
            res = await query({ state: this.props.activeKey, page: 0, size: 5 });

        }
        if (res.success) {
            this.rData = [...res.data];
            this.setState({
                pagination: {
                    page: 0,
                    size: 10,
                    total: res.count
                },
                isLoading: false,
                dataSource: this.state.dataSource.cloneWithRows(this.rData)
            })
        } else {
            Toast.info("获取数据失败", 2)
            this.setState({
                isLoading: false
            })
        }
    }

    onRefresh = () => {
        if (!getToken()) return (history.push('/mobile/login'), Toast.info('请重新登陆', 2))
        this.setState(
            {
                refresh: true,
                isLoading: true,
                pagination: { page: 0, size: 5 }
            },
            this.initData
        )

    }


    render() {
        let index = 0;
        const row = (rowData: any, sectionID: ReactText, rowID: ReactText) => {

            if (index > this.rData.length - 1) {
                index = 0
            }
            const obj = this.rData[index++];
            return (
                <div key={obj.id + `` + index} style={{ padding: '0 15px' }} onClick={() => history.push(`/mobile/tododetail?todoid=${obj.id}&title=${this.props.title}&status=${obj.status}`)}>
                    <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 14,
                            // borderBottom: '1px solid #F6F6F6',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between"
                        }}
                    >{obj.formTitle} <div>{obj.status === '1' ? "进行中" : "已完成"}</div></div>
                    <div style={{ width: "100%" }} >
                        <Steps>
                            {obj.briefData && Object.keys(obj.briefData).map(item =>
                                // <div className={styles.row} key={generate()}>{obj.briefData[item].label + '：' + obj.briefData[item].value} </div>
                                <Step key={generate()} title={<span className={styles.stepTitle}>{obj.briefData[item].label}</span>} description={<span className={styles.stepDescription}>{obj.briefData[item].value}</span>} status="process" icon={<CopyTwoTone />} />
                            )}
                        </Steps>
                    </div>
                    <div className={styles.footer}>
                        <div >创建人：{obj.createUser}</div>
                        <div > 时间：{moment(obj.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>

                    </div>


                </div>
            );
        };
        const formRow = (rowData: any, sectionID: ReactText, rowID: ReactText) => {
            if (index > this.rData.length - 1) {
                index = 0
            }
            const obj = this.rData[index++];
            return <div key={obj.id + `` + index} style={{ padding: '0 15px' }} onClick={() => history.push(`/mobile/tododetail/submit?tosubid=${obj.id}&title=${this.props.title}&status=1`)}>
                <div
                    style={{
                        lineHeight: '50px',
                        color: '#888',
                        fontSize: 14,
                        // borderBottom: '1px solid #F6F6F6',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between"
                    }}
                >{obj.name}</div>
                <div style={{ width: "100%" }} >
                    所属：{obj.dept && obj.dept.name}
                </div>
                <div className={styles.footer}>
                    <div>创建时间： {moment(obj.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
                </div>

            </div>
        }
        const selfFinishRow = (rowData: any, sectionID: ReactText, rowID: ReactText) => {
            if (index > this.rData.length - 1) {
                index = 0
            }
            const obj = this.rData[index++];
            return <div key={obj.id + `` + index} style={{ padding: '0 15px' }} onClick={() => history.push(`/mobile/tododetail/submit?tosubid=${obj.id}&title=${this.props.title}&status=1`)}>
                <div
                    style={{
                        lineHeight: '50px',
                        color: '#888',
                        fontSize: 14,
                        // borderBottom: '1px solid #F6F6F6',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between"
                    }}
                >{(obj.form || {}).name || '已删除表单'}</div>
                <div style={{ width: "100%" }} >
                    状态：{obj.dataGroupStatus === '2' ? '已完成' : '未完成'}
                </div>
                <div className={styles.footer}>
                    <div>创建时间： {moment(obj.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</div>
                </div>

            </div>

        }
        return <div style={{ width: "100%", position: 'relative' }} >
            <ListView
                dataSource={this.state.dataSource}
                ref={el => this.list = el}
                renderRow={this.props.activeKey === '5' ? formRow : row}
                onEndReached={this.onEndReached}
                scrollRenderAheadDistance={500}
                onEndReachedThreshold={15}
                renderSeparator={separator}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? '加载中...' : ''}
                </div>)}
                onScroll={() => {
                    if (!this.props.visible) {
                        this.props.$visible && this.props.$visible(true)
                    }
                }}
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
        </div >
    }

}