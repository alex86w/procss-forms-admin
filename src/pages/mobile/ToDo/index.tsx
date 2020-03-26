import React, { useRef, ReactText } from 'react';
import ReactDOM from 'react-dom';
import { ListView } from 'antd-mobile';
import styles from './layout.less'

interface ListState {
    [key: string]: any;
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

const genData = function (pIndex = 0) {
    const dataBlob: any = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
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





export default class TodoList extends React.Component<{}, ListState> {
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
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false
            })
        }, 1000)
    }

    onEndReached = (event: any) => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.rData = { ...this.rData, ...genData(++pageIndex) };
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
        });
    }



    render() {
        let index = data.length - 1;
        const row = (rowData: any, sectionID: ReactText, rowID: ReactText) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
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
                    <div style={{ width: "100%" }} onClick={()=>console.log(123)}>
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
        return <ListView
            style={{ width: "100%", height: "100vh", margin: '0 5px' }}
            dataSource={this.state.dataSource}
            ref={this.list as React.RefObject<ListView>}
            renderRow={row}
            onEndReached={this.onEndReached}
            scrollRenderAheadDistance={500}
            onEndReachedThreshold={10}
            renderSeparator={separator}
        >

        </ListView>
    }

}