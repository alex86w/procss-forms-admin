import * as React from 'react';
import { Table, Button, Modal, Form, Row, Col } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { connect, useDispatch } from 'umi';
import RoleForm from './component/RoleForm';
import { ConnectFC } from "src/pages/system/ConnectFC";
interface RoleProps {
  data: any[];
  queryParams: {
    page: number,
    size: number,
    total: number,
  }
  dispatch: (v: any) => void,
  loading: {
    [key: string]: boolean
  },
  users: any[],
  userList: any[],
  pagination?: any
}

interface TitleType {
  [key: string]: string
}

const titleType: TitleType = {
  create: '新建角色',
  modify: '修改角色',
  users: '添加成员'
}

const Role = function (props: RoleProps) {
  const [selected, $selected] = React.useState<any>({})
  const [visitype, $visitype] = React.useState<'create' | 'modify' | '' | 'users'>('');
  const [roleId, $roleId] = React.useState<string>('')
  const [record, $record] = React.useState<any>({});
  const [parentId, $parentId] = React.useState<string>('0');
  let user: any = localStorage.getItem('user');
  user = JSON.parse(user);
  const [form] = Form.useForm()
  const handleOk = function () {
    if (visitype === 'users') {
      let userIds: any[] = [];
      Object.keys(selected).forEach(str => { userIds = userIds.concat(selected[str]); });
      props.dispatch({
        type: 'role/addUser',
        payload: {
          roleId: roleId,
          userIds: userIds.join(',')
        },
        callback: (success: boolean) => {
          if (success) {
            $visitype('');
          }
        }
      })
    } else {
      form.validateFields().then(values => {
        props.dispatch({
          type: `role/${visitype}`,
          payload: { ...record, ...values, parentId: 'create' ? parentId : record.parentId, rootDeptId: user.rootDeptId },
          callback: (success: boolean) => {
            if (success) {
              $visitype('');
            }
          }
        })
      }).catch(e => console.error(e))
    }

  }
  const columns = [
    { title: '角色名', dataIndex: 'name', key: 'name' },
    { title: '是否需签到', dataIndex: 'signAbel', key: 'signAbel', render: text => text ? '是' : '否' },
    { title: '可盘点角色', dataIndex: 'checkAbel', key: 'checkAbel' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '操作', key: 'operation', render: (_, record) => {
        return (
          <>
            <Button onClick={() => { $visitype('create'); $record({}); $parentId(record.id) }}>新建子节点</Button>&nbsp;&nbsp;
            <Button onClick={() => { $visitype('modify'); $record(record) }}>修改</Button>&nbsp;&nbsp;
            {/* <Button onClick={() => { $visitype('users'); $record(record) }}> 添加人员</Button>&nbsp;&nbsp; */}
            <Button>删除</Button>
          </>
        )
      },
      align: 'right'
    },
  ] as ColumnType<any>[];
  const users = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '操作', key: 'operation', render: (_, user) => <Button onClick={() => props.dispatch({ type: 'role/removeUser', payload: { roleId, userId: user.id } })}>删除</Button>, align: 'right' },
    { title: () => <Button disabled={!record} onClick={() => { $visitype('users') }}>添加</Button>, align: 'right', width: "60px" }
  ] as ColumnType<any>[]

  return (
    <div style={{minWidth:1440}}>
      <Button style={{ marginBottom: 20 }} onClick={() => { $visitype('create'); $parentId('0'); $record({}) }}>新建</Button>
      <Row><Col span={12}> <Table
        columns={columns}
        rowKey="id"
        dataSource={props.data}
        loading={props.loading.role}
        pagination={false}
        rowClassName={(record: any, index) => {
          const { id } = record;
          if (id === roleId) {
            return 'r_actived'
          }
          return '';
        }}
        onRow={record => ({
          onDoubleClick: () => {
            $roleId(record.id)
            props.dispatch({
              type: 'role/queryUsers',
              payload: { id: record.id }
            })
          }
        })}
      />
      </Col>
        <Col span={11} style={{ marginLeft: 50 }}>
          {console.log(props.queryParams)}
          <Table
            columns={users}
            dataSource={props.users}
            rowKey="id"
            loading={props.loading.role}
            pagination={{
              current: props.queryParams.page + 1,
              pageSize: 10,
              total: props.queryParams.total,
              onChange: v => props.dispatch({
                type: 'role/queryUsers',
                payload: {
                  page: v - 1
                }
              })
            }}

          />
        </Col>
      </Row>
      <Modal
        visible={!!visitype}
        title={titleType[visitype]}
        onOk={handleOk}
        onCancel={() => $visitype('')}
        forceRender
        destroyOnClose
        confirmLoading={props.loading.role}>
        {visitype === 'users' ? <UsersForm data={props.userList} pagination={props.pagination} loading={props.loading.user} selected={selected} $selected={$selected} /> : <RoleForm form={form} record={record} />}

      </Modal>

    </div>
  );
};

const UsersForm = function ({ data, pagination, loading, selected, $selected }: any) {
  const dispatch = useDispatch()
  const columns = [
    { title: '用户名', dataIndex: 'name', key: 'name' },
    { title: '账号', dataIndex: 'account', key: 'account' },
    { title: '部门', dataIndex: 'dept', key: 'dept' }
  ]
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      rowSelection={{
        onChange: (keys, rows) => {
         console.log(rows)
          selected[pagination.page] = [];
          rows.forEach(it => it && selected[pagination.page].push(it.id))
          $selected(Object.assign({}, selected))
        }
      }}
      loading={loading}
      pagination={{
        current: pagination.page + 1,
        pageSize: 10,
        total: pagination.total,
        onChange: v => dispatch({
          type: 'user/query',
          payload: {
            page: v - 1
          }
        })
      }}

    />
  )
}



const ConnectedRole: ConnectFC = connect(({ role, loading, user }: any) => ({
  data: role.data,
  queryParams: role.queryParams,
  loading: loading.models,
  users: role.users,
  userList: user.list,
  pagination: user.queryParams
}))(Role);
ConnectedRole.title = '角色管理';
ConnectedRole.icon = 'safetyCertificate';
ConnectedRole.sort = 4;

export default ConnectedRole;