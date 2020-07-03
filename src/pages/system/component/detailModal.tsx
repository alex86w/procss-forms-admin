import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class DetailModal extends Component<any, any> {
  form = React.createRef<FormInstance | null>();
  constructor(props: any) {
    super(props);
  }

  render() {
    const { item = [], visitype, onCancel, record, dispatch } = this.props;
    return (
      <Modal
        visible={!!visitype}
        title="编辑字典"
        onCancel={onCancel}
        destroyOnClose
        onOk={() =>
          this.form.current
            ?.validateFields()
            .then(v => {
              dispatch({
                type: `dict/${visitype}`,
                payload: { ...record, ...v },
                callback: (success: boolean) => success && onCancel(),
              });
            })
            .catch(e =>console.log(e))
        }
      >
        {
          //@ts-ignore
          <Form ref={this.form} initialValues={record}>
            {item.map((it: any) => (
              <Form.Item
                label={it.label}
                {...formItemLayout}
                key={it.label}
                name={it.key}
                required
              >
                <Input />
              </Form.Item>
            ))}
          </Form>
        }
      </Modal>
    );
  }
}
export default DetailModal;
