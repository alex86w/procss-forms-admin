import { useState, useEffect } from 'react';
import React from 'react';
import { Modal, Form, Input, Spin, notification } from 'antd';

export const FormItem = Form.Item;
export const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export function AppModal(props: any) {
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
      title={`${visitype === 'create' ? '新建' : '修改'}应用`}
      destroyOnClose
      onOk={() =>
        form
          .validateFields()
          .then(value => {
            $loading(true);
            dispatch({
              type: `app/${visitype}`,
              payload: { ...record, ...value },
              callback: (success: boolean) => {
                success && $visitype(null);
                success && $loading(false);
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
        <Form form={form} initialValues={record} layout="inline">
          <FormItem
            style={{ width: '45%', marginTop: '10px' }}
            name="name"
            label="应用名称"
            {...layout}
          >
            <Input />
          </FormItem>
        </Form>
      </Spin>
    </Modal>
  );
}
