import { useState, useEffect, Children } from 'react';
import React from 'react';
import { Modal, Form, Input, Spin, notification, Select, Switch, TreeSelect } from 'antd';

export const FormItem = Form.Item;
export const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

export const isAdmin = function () {
  let res: any = localStorage.getItem('user');
  res = JSON.parse(res || "{}")
  return res.account === 'admin'
}
const renderTree = function (tree: any[]) {
  return (tree || []).map((it: any) => <TreeSelect.TreeNode key={it.id} value={it.id} title={it.name}>{it.children && Array.isArray(it.children) && renderTree(it.children)}</TreeSelect.TreeNode>)
}

export function UserModal(props: any) {
  const [form] = Form.useForm();
  const [loading, $loading] = useState(false);
  const { visitype, $visitype, record, dispatch } = props;
  useEffect(() => {
    form && form.resetFields && form.resetFields();
  }, [record]);
  return (
    <Modal
      forceRender
      visible={!!visitype}
      width="70%"
      onCancel={() => $visitype(null)}
      title={`${visitype === 'create' ? '新建' : '修改'}用户`}
      destroyOnClose
      onOk={() =>
        form
          .validateFields()
          .then(value => {
            $loading(true);
            dispatch({
              type: `user/${visitype}`,
              payload: { ...record, ...value },
              callback: (success: boolean) => {
                success && $visitype(null);
                $loading(false);
              },
            });
          })
          .catch(e => {
            $loading(false);
            notification.error({ message: JSON.stringify(e) });
          })
      }
    >
      <Spin spinning={loading}>
        <Form form={form} initialValues={record || { isDeptAdmin: false }} layout="inline">
          <FormItem
            style={{ width: '45%', marginTop: '10px' }}
            name="name"
            label="用户名"
            {...layout}
            required
          >
            <Input />
          </FormItem>
          <FormItem
            style={{ width: '45%', marginTop: '10px' }}
            name="account"
            label="账号"
            {...layout}
            required
          >
            <Input disabled={visitype === 'modify'} />
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
            required
          >
            <Input {...(visitype !== 'create' ? { type: "password" } : {})} />
          </FormItem>
          {visitype === 'create' && <FormItem
            style={{ width: '45%', marginTop: '10px' }}
            name="deptId"
            label="部门"

            {...layout}
            required
          >
            <TreeSelect
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeDefaultExpandAll
            >
              {renderTree(props.dept)}

            </TreeSelect>

          </FormItem>}
          {isAdmin() && visitype === 'create' && <FormItem
            name="isDeptAdmin"
            label="是否是部门管理人员"
            {...layout}
            style={{ width: '45%', marginTop: '10px' }}
          ><Switch checkedChildren="是" unCheckedChildren="否"></Switch></FormItem>}
        </Form>
      </Spin>
    </Modal>
  );
}
