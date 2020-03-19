//
import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';

interface ApplicationProps {}

const app = function(props: ApplicationProps) {
  const dataSouse = [];
  const columns: ColumnProps<any>[] = [
    { dataIndex: '', key: '', title: '名称' },
    { dataIndex: '', key: '', title: '创建时间' },
    { dataIndex: '', key: '', title: '创建人' },
    { dataIndex: '', key: '', title: '所属部门' },
  ];
  return <Table columns={columns} />;
};
app.title = '应用管理';
app.icon = 'appstore';

export default app;
