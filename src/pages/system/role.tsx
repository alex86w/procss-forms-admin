import * as React from 'react';
import { Table, Button, Modal, Form } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { connect } from 'umi';
import RoleForm from './component/RoleForm';
interface RoleProps {
  data: any[];
  queryParams: {
    page: number,
    size: number,
    total: number,
  }
  dispatch: (v: any) => void,
  loading: boolean
}

const Role = function (props: RoleProps) {
  const [visitype, $visitype] = React.useState<'create' | 'modify' | ''>('');
  const [record, $record] = React.useState<any>({});
  const [parentId, $parentId] = React.useState<string>('0');
  let user: any = localStorage.getItem('user');
  user = JSON.parse(user);
  console.log(props)
  const [form] = Form.useForm()
  const handleOk = function () {
    form.validateFields().then(values => {
      props.dispatch({
        type: `role/${visitype}`,
        payload: { ...record, ...values, parentId: 'create' ? parentId : record.parentId, rootDeptId: user.rootDeptId },
        callback: (success: boolean) => {
          $visitype('');
          $record({})
        }
      })
    }).catch(e => console.error(e))

  }
  const columns = [
    { title: '角色名', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '操作', key: 'operation', render: (_, record) => {
        return (
          <>
            <Button onClick={() => { $visitype('create'); $record({}); $parentId(record.id) }}>新建子节点</Button>
          &nbsp;&nbsp;
            <Button onClick={() => { $visitype('create'); $record(record) }}>修改</Button>
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
      <Button style={{ marginBottom: 20 }} onClick={() => { $visitype('create'); $parentId('0') }}>新建</Button>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={props.data}
        loading={props.loading}
        // pagination={{
        //   current: props.queryParams.page,
        //   pageSize: props.queryParams.size,
        //   total: props.queryParams.total,
        //   onChange: v => props.dispatch({
        //     type: 'role.query',
        //     payload: {
        //       page: v - 1
        //     }
        //   })
        // }}
      />
      <Modal
        visible={!!visitype}
        title="新建角色"
        onOk={handleOk}
        onCancel={() => $visitype('')}
        confirmLoading={props.loading}>
        <RoleForm form={form} record />
      </Modal>
    </div>
  );
};

Role.title = '角色管理';
Role.icon = 'safetyCertificate';
Role.sort = 4;
Role.access = [] as string[]

const ConnectedRole = connect(({ role, loading }: any) => ({
  data: role.data,
  queryParams: role.queryParams,
  loading: loading.models.role
}))(Role);

export default ConnectedRole;