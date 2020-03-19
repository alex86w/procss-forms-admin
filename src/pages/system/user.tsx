import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { ColumnType } from 'antd/lib/table';

const FormItem = Form.Item;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function user() {
  const [visible, $visible] = useState<boolean>(false);
  const [record, $record] = useState<any>({});
  const [form] = Form.useForm();
  const columns: ColumnType<any>[] = [
    { title: '用户名', dataIndex: 'name', key: 'name' },
    { title: '账号', dataIndex: 'account', key: 'account' },
    { title: '邮箱', dataIndex: 'eMail', key: 'eMail' },
    { title: '微信id', dataIndex: 'weChartId', key: 'weChartId' },
    {
      title: '操作',
      key: 'operation',
      render: (value, record, index) => (
        <>
          {' '}
          <Button
            onClick={() => {
              $visible(true);
              $record(record);
            }}
          >
            修改
          </Button>{' '}
          <Button>删除</Button>
        </>
      ),
    },
  ];
  const UserModal = (
    <Modal
      visible={visible}
      width="70%"
      onCancel={() => $visible(false)}
      title="用户信息"
      destroyOnClose
      forceRender
    >
      <Form form={form} initialValues={record} layout="inline">
        <FormItem
          style={{ width: '45%', marginTop: '10px' }}
          name="name"
          label="用户名"
          {...layout}
        >
          <Input />
        </FormItem>
        <FormItem
          style={{ width: '45%', marginTop: '10px' }}
          name="account"
          label="账号"
          {...layout}
        >
          <Input />
        </FormItem>
        <FormItem
          style={{ width: '45%', marginTop: '10px' }}
          name="eMail"
          label="邮箱"
          {...layout}
        >
          <Input />
        </FormItem>
        <FormItem
          style={{ width: '45%', marginTop: '10px' }}
          name="weChartId"
          label="微信号"
          {...layout}
        >
          <Input />
        </FormItem>
        <FormItem
          style={{ width: '45%', marginTop: '10px' }}
          name="pwd"
          label="密码"
          {...layout}
        >
          <Input />
        </FormItem>
      </Form>
    </Modal>
  );

  return (
    <>
      <Table columns={columns} dataSource={[{ name: 'ahaya' }]} />
      {UserModal}
    </>
  );
}

user.title = '用户管理';
user.icon = 'user';
export default user;
