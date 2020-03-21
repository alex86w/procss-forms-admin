//
import React, {  } from 'react';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'umi';
import { ConnectFC } from './ConnectFC';

const FormPage = function(props: any) {
  const { list } = props;
  const columns: ColumnProps<any>[] = [
    { dataIndex: 'title', key: 'title', title: '名称' },
    { dataIndex: 'remark', key: 'remark', title: '描述' },
    { dataIndex: 'owner.name', key: 'owner.name', title: '创建人' },
    {
      title: '操作',
      key: 'operation',
      render: (value, record) => (
        <>
          <Button>进入表单</Button>
        </>
      ),
      align: 'right',
    },
  ];
  return (
    <>
      <Button style={{ margin: '10px 0' }}>新建</Button>
      <Table columns={columns} dataSource={list || []} />
    </>
  );
};

const ConnectForm = connect(({ app, loading }: { [key: string]: any }) => ({
  ...app,
  loading,
}))(FormPage) as ConnectFC;
ConnectForm.title = '表单管理';
ConnectForm.icon = 'Appstore';
ConnectForm.sort = 3;

export default ConnectForm;
