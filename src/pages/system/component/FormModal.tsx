import { useState, useEffect } from 'react';
import React from 'react';
import { Modal, Form, Input, Spin, notification, Select } from 'antd';

interface FormState {
  name: string;
  id: string;
  value: string;
}

export const FormItem = Form.Item;
export const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export function FormModal(props: any) {
  const [form] = Form.useForm();
  const [loading, $loading] = useState(false);
  const { visitype, $visitype, record, dispatch, formStatus } = props;
  useEffect(() => {
    form && form.resetFields && form.resetFields();
    
  },[record.id]);
  return (
    <Modal
      forceRender
      visible={!!visitype}
      width="70%"
      onCancel={() => $visitype(null)}
      title={`${visitype === 'create' ? '新建' : '修改'}表单`}
      destroyOnClose
      onOk={() =>
        form
          .validateFields()
          .then(value => {
            $loading(true);
            dispatch({
              type: `form/${visitype}`,
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
        <Form form={form} initialValues={record} layout="inline">
          <FormItem
            style={{ width: '45%', marginTop: '10px' }}
            name="name"
            label="表单名称"
            {...layout}
            required
          >
            <Input />
          </FormItem>
          <FormItem
            style={{ width: '45%', marginTop: '10px' }}
            name="type"
            label="表单类型"
            {...layout}
            required
          >
            <Select>
              {(formStatus || [] as FormState[]).map((it: any) => <Select.Option key={it.id} value={it.id}>{it.name}</Select.Option>)}
            </Select>
          </FormItem>
        </Form>
      </Spin>
    </Modal>
  );
}
