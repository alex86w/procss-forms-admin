import React, { ReactText } from 'react';
import ReactDOM from 'react-dom';
import { ListView, PullToRefresh } from 'antd-mobile';
import styles from './layout.less';
import { Toast } from 'antd-mobile';
import { query } from '@/services/todo';
import moment from 'moment';
import { getToken } from '@/utils/request';
import { history } from 'umi';
import { generate } from 'shortid';
import { Steps } from 'antd-mobile';
import { CopyTwoTone, LeftOutlined } from '@ant-design/icons'
import { Response } from '@/services/base';
import { constants, ActiveKey } from '@/models/todoList';

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
                size: 10
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
        //@ts-ignore
        const { formId, state } = history.location.query;
        if (this.list) {
            //@ts-ignore
            const H = this.state.height - (ReactDOM.findDOMNode(this.list) || {}).offsetTop;
            this.setState({
                height: H
            })
        }
        if (getToken()) {

            const res: any = await query({ state, formId, ...this.state.pagination });

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


    fetchMore = async (pagination: any) => {
        //@ts-ignore
        const { formId, state } = history.location.query;
        pagination = { ...pagination, page: ++pagination.page }

        const res = await query({ state, formId, ...pagination }) as Response<any>;
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
        this.fetchMore(this.state.pagination)
    }

    initData = async () => {
        //@ts-ignore
        const { formId, state } = history.location.query;

        const res = await query({ state, formId, page: 0, size: 10 }) as Response<any>;

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
                pagination: { page: 0, size: 10 }
            },
            this.initData
        )

    }
    row = (rowData: any, sectionID: ReactText, rowID: ReactText) => {
        //@ts-ignore
        const { state } = history.location.query
        const title = constants[state as ActiveKey];

        /**代办事项 我处理的 抄送我的  */
        let url = `/mobile/tododetail?todoid=${rowData.id}&title=${title}&status=${rowData.status}`;
        if ('4,6'.indexOf(state) >= 0) {
            /**我发起的 完成事项 */
            url = `/mobile/tododetail?finishid=${rowData.id}&title=${title}`;
        }
        return (
            <div key={rowData.id} style={{ padding: '0 15px' }} onClick={() => history.push(url)}>
                <div
                    style={{
                        lineHeight: '50px',
                        color: '#888',
                        fontSize: 14,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between"
                    }}
                >{rowData.formTitle} <div>{rowData.status === '1' ? "进行中" : "已完成"}</div></div>
                <div style={{ width: "100%" }} >
                    <Steps>
                        {rowData.briefData && Object.keys(rowData.briefData).map(item =>
                            <Step key={generate()} title={<span className={styles.stepTitle}>{rowData.briefData[item].label}</span>} description={<span className={styles.stepDescription}>{rowData.briefData[item].value}</span>} status="process" icon={<CopyTwoTone />} />
                        )}
                    </Steps>
                </div>
                <div className={styles.footer}>
                    <div >创建人：{rowData.createUser || rowData.createUserName}</div>
                    <div > 时间：{moment(rowData.updatedAt).format('YYYY-MM-DD HH:mm')}</div>
                </div>
            </div>
        );
    };


    render() {
        //@ts-ignore
        const { state } = history.location.query as { state: ActiveKey }
       console.log(constants[state])


        return <div style={{ width: "100%", position: 'relative' }} >
            <div style={{ width: "100%", height: "45px", lineHeight: 3, background: "#fff", textAlign: "center", fontSize: 18, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <span onClick={() => history.goBack()}><LeftOutlined /></span>
                <span style={{ marginLeft: "-18px" }}>{constants[state]}</span>
                <div />
            </div>

            <ListView
                dataSource={this.state.dataSource}
                ref={el => this.list = el}
                renderRow={this.row}
                onEndReached={this.onEndReached}
                scrollRenderAheadDistance={500}
                onEndReachedThreshold={10}
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