//
import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'umi';
import { ConnectFC } from './ConnectFC';
import { Visitype } from './user';
import { AppModal } from './component/AppModal';

const App = function(props: any) {
  const [visitype, $visitype] = useState<Visitype>(null);
  const [record, $record] = useState<any>({});
  const { dispatch, list } = props;
  const columns: ColumnProps<any>[] = [
    { dataIndex: 'name', key: 'name', title: '名称' },
    { dataIndex: 'owner.name', key: 'owner.name', title: '创建人' },
    {
      title: '操作',
      key: 'operation',
      render: (value, record) => (
        <>
          <Button>进入应用</Button>
        </>
      ),
      align: 'right',
    },
  ];
  const modalProps = { visitype, $visitype, record, dispatch };
  return (
    <>
      <Button style={{ margin: '10px 0' }} onClick={() => $visitype('create')}>
        新建
      </Button>
      <Table columns={columns} dataSource={list || []} />
      <AppModal {...modalProps} />
    </>
  );
};

const ConnectApp = connect(({ app, loading }: { [key: string]: any }) => ({
  ...app,
  loading,
}))(App) as ConnectFC;
ConnectApp.title = '应用管理';
ConnectApp.icon = 'Appstore';

export default ConnectApp;
