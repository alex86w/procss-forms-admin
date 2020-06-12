//集值代码
import React, { Component } from 'react';
import { Button, Table } from 'antd';
import { connect } from 'dva';
import DetailModal from './component/detailModal';
import { ColumnType } from 'antd/lib/table';
import { ConnectFC } from './ConnectFC';

class Dictionary extends Component<
  any,
  { visitype: string | null; modalItem: any[]; record: any; dictid: string }
  > {
  state = {
    visitype: null,
    modalItem: [],
    record: {},
    dictid: '',
  };

  showModal = (modalItem: any[], visitype: string, record = {}) => {
    this.setState({
      visitype,
      record,
      modalItem,
    });
  };

  render() {
    const { visitype, modalItem, record } = this.state;
    const {
      data: { data: content },
      detail: { data: detailContent },
      dispatch,
      loading,
      detail,
    } = this.props;
    const listItem = [
      {
        label: '集值名称',
        key: 'name',
      },
      {
        label: '描述',
        key: 'remark',
      },
    ];
    const contentItem = [
      {
        label: '标签名',
        key: 'name',
      },
      {
        label: '值',
        key: 'value',
      },
    ];

    const listColumns: ColumnType<any>[] = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '100px',
      },
      {
        title: '描述',
        dataIndex: 'remark',
        key: 'remark',
        width: 100,
      },
      {
        title: '操作',
        key: 'operate',
        width: 100,
        render: (value, record) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Button
              type="primary"
              onClick={() => this.showModal(listItem, 'modify', record)}
            >
              编辑
            </Button>
            &nbsp;&nbsp;
            <Button
              onClick={() =>
                dispatch({
                  type: 'dict/remove',
                  payload: record.id,
                })
              }
            >
              删除
            </Button>
          </div>
        ),
      },
    ];
    const contentColumns: ColumnType<any>[] = [
      {
        title: '标签',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '值',
        dataIndex: 'value',
        key: 'value',
      },
      {
        title: '操作',
        dataIndex: '',
        key: '',
        width: '100px',
        render: (_, record) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Button
              type="primary"
              onClick={() =>
                this.showModal(contentItem, 'modifyDetail', record)
              }
            >
              编辑
            </Button>
            &nbsp;&nbsp;
            <Button
              onClick={() => {
                dispatch({
                  type: 'dict/removeDetail',
                  payload: record.id,
                });
              }}
            >
              删除
            </Button>
          </div>
        ),
      },
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            boxShadow: '1px 1px 15px rgba(0,0,0,0.1)',
            borderRadius: 2,
            width: '600px',
            minHeight: 100,
          }}
        >
          <div
            style={{
              width: '100%',
              height: 60,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 20,
              paddingRight: 20,
              borderBottom: '0.5px solid rgba(0,0,0,0.3)',
            }}
          >
            <h3>集值列表</h3>
            <Button
              type="primary"
              onClick={() => this.showModal(listItem, 'create')}
            >
              {' '}
              + 新增
            </Button>
          </div>
          <div style={{ paddingTop: 10, paddingBottom: 10 }}></div>
          <Table
            columns={listColumns}
            dataSource={content}
            pagination={false}
            size="small"
            rowKey={item => item.name}
            rowClassName={(record: any, index) => {
              const { id } = record;
              if (id === this.state.dictid) {
                return 'r_actived'
              }
              return '';
            }}

            loading={loading.effects['dict/query']}
            onRow={record => ({
              onDoubleClick: () => {
                dispatch({ type: 'dict/queryDetail', payload: record });
                this.setState({ dictid: record.id });
              },
            })}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            boxShadow: '1px 3px 15px rgba(0,0,0,0.1)',
            borderRadius: 2,
            width: '59%',
            minHeight: 200,
          }}
        >
          <div
            style={{
              width: '100%',
              height: 60,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 20,
              paddingRight: 20,
              borderBottom: '0.5px solid rgba(0,0,0,0.3)',
            }}
          >
            <h3>列表详情</h3>
            <Button
              type="primary"
              onClick={() => this.showModal(contentItem, 'createDetail')}
              disabled={!this.state.dictid}
            >
              {' '}
              + 新增
            </Button>
          </div>
          <DetailModal
            item={modalItem}
            visitype={visitype}
            onCancel={() => this.setState({ visitype: null })}
            record={record}
            dispatch={this.props.dispatch}
          />
          <Table
            columns={contentColumns}
            dataSource={detailContent}
            loading={loading.effects['dict/queryDetail']}
            rowKey="id"
          />
        </div>
      </div>
    );
  }
}

const ConnectDict = connect(({ dict, loading }: { [key: string]: any }) => ({
  data: dict.data,
  detail: dict.detail,
  loading,
}))(Dictionary) as ConnectFC;
ConnectDict.title = '字典管理';
ConnectDict.icon = 'read';
ConnectDict.sort = 7;
export default ConnectDict;
