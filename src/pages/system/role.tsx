import * as React from 'react';
import { Table, Button } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { connect } from 'umi';
interface RoleProps {
  data: any[];
  queryParams: {
    page: number,
    size: number,
    total: number,
  }
  dispatch: (v: any) => void
}

const Role = function (props: RoleProps) {
  const columns = [
    { title: '角色名', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '操作', key: 'operation', render: _ => {
        return (
          <>
            <Button>修改</Button>
      &nbsp;&nbsp;
            <Button>删除</Button>
          </>
        )
      },
      align: 'right'
    },
  ] as ColumnType<any>[];

  return (
    <div>
      <Button style={{ marginBottom: 20 }}>新建</Button>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={props.data}
        pagination={{
          current: props.queryParams.page,
          pageSize: props.queryParams.size,
          total: props.queryParams.total,
          onChange: v => props.dispatch({
            type: 'role.query',
            payload: {
              page: v - 1
            }
          })

        }}

      />
    </div>
  );
};

Role.title = '角色管理';
Role.icon = 'safetyCertificate';
Role.sort = 5;
Role.access = [] as string[]

const ConnectedRole = connect(({ role, loading }: any) => ({
  data: role.data,
  queryParams: role.queryParams,
  loading: loading.models.role
}))(Role);

export default ConnectedRole;