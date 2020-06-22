import * as React from 'react';
import { Table, Button } from 'antd';
import { ColumnType } from 'antd/lib/table';
interface authProps {

}

const auth = function (props: authProps) {
  const columns = [
    { title: '角色名', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '可盘点角色', dataIndex: 'checkAbel', key: 'checkAbel' },
    
    {
      title: '操作', key: 'operation', render: _ => {
        return (
          <>
            <Button>修改</Button>
      &nbsp;&nbsp;
            <Button>删除</Button>
          </>
        )
      }
    },
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

// auth.title = '角色管理';
// auth.icon = 'safetyCertificate';
// auth.sort = 5;
// auth.access= [] as string[]

export default auth;