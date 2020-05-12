import * as React from 'react';
import { Table, Button } from 'antd';
import { ColumnType } from 'antd/lib/table';
interface RoleProps {

}

const Role = function (props: RoleProps) {
  const columns = [
    { title: '角色名', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title:'操作',key:'operation',render:_=>{
      return (
      <>
      <Button>修改</Button>
      &nbsp;&nbsp;
      <Button>删除</Button>
      </>
      )
    }},
  ] as ColumnType<any>[];

  return (
    <div>
      <Button>新建</Button>
      <Table
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

Role.title = '角色管理';
Role.icon = 'safetyCertificate';
Role.sort = 5;
Role.access= [] as string[]

export default Role;