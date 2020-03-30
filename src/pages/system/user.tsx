import { useState } from 'react';
import React from 'react';
import { Table, Button, Form } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { connect } from 'umi';
import { ConnectFC } from './ConnectFC';
import { UserModal } from './component/UserModal';

export type Visitype = 'modify' | 'create' | null;
function User(props: any) {
  const {
    list,
    dispatch,
    loading: { effects },
    queryParams: { size, page, total },
  } = props;
  const [visitype, $visitype] = useState<Visitype>(null);
  const [record, $record] = useState<any>({});
  const columns: ColumnType<any>[] = [
    { title: '用户名', dataIndex: 'name', key: 'name' },
    { title: '账号', dataIndex: 'account', key: 'account' },
    { title: '邮箱', dataIndex: 'eMail', key: 'eMail' },
    { title: '微信id', dataIndex: 'weChartId', key: 'weChartId' },
    {
      title: '操作',
      key: 'operation',
      align: 'right',
      render: (value, record, index) => (
        <>
          {' '}
          <Button
            onClick={() => {
              $visitype('modify');
              $record(record);
            }}
          >
            修改
          </Button>{' '}
          <Button
            onClick={() => {
              dispatch({
                type: 'user/remove',
                payload: record.id,
              });
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];
  const modalProps = { visitype, $visitype, record, dispatch, dept: props.dept };

  return (
    <>
      <Button
        onClick={() => {
          $visitype('create');
          $record({});
        }}
        style={{ margin: '10px 0' }}
      >
        新建
      </Button>
      <Table
        columns={columns}
        dataSource={list}
        rowKey={it => it.id}
        loading={effects['user/query']}
        pagination={{
          current: page + 1,
          total: total,
          pageSize: size,
          onChange: v =>
            dispatch({ type: 'user/query', payload: { page: v - 1 } }),
        }}
      />
      <UserModal {...modalProps} />
    </>
  );
}
const ConnectedUser = connect(
  ({ user, loading, dept: { list: dept } }: { user: any; loading: any, dept: any }) => ({ ...user, loading, dept }),
)(User) as ConnectFC;
ConnectedUser.title = '用户管理';
ConnectedUser.icon = 'user';
ConnectedUser.sort = 1;

export default ConnectedUser;
