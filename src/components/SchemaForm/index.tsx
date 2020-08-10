import React, { Component, RefObject, forwardRef } from 'react';
import { Form, Select, Input, Divider, Radio, Checkbox, DatePicker, InputNumber, Row, Col, Button } from 'antd'
import { FormInstance, FormItemProps } from 'antd/lib/form';
import PicturesWall from '../FileUpload/picturesWall';
import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};

interface ItemSchemaOpts {
    label: string;
    value: string;
}

interface SubFormSchema extends FormItemSchema {
    label: string;
    name: React.ReactText;
}

interface FormItemSchema {
    id: string;
    enable: boolean;
    required: boolean;
    visible: boolean;
    name: React.ReactText;
    description: string;
    title: string;
    type: string;
    items: ItemSchemaOpts[] | SubFormSchema[];
}

interface FormItem_Attr extends FormItemProps {
    key: string;
    mode: 'multiple' | 'tags' | undefined;
    type: string;
    label: string;
    disabled: boolean;
    items: ItemSchemaOpts[] | SubFormSchema[]
}

interface SchemaFormProps {
    formRef?: RefObject<FormInstance>;
    schema: FormItemSchema[];
    record: any;
}

interface SchemaFormState {

}
interface ExtraProperties {
    disabled: boolean;
    key: React.ReactText;
    showTime?: boolean;
}

const SchemaStringTypeDatePicker = forwardRef<Component<PickerProps<Moment>, any, any> | null, ExtraProperties>(function (props: PickerProps<Moment> & ExtraProperties, ref) {
    return <DatePicker {...Object.assign({}, props, { value: moment(props.value) })} ref={ref} />
})

const SchemaForwardRefRadios = forwardRef<any, { attr: FormItem_Attr }>(function (props, ref) {
    const { attr, ...rest } = props;
    return <Radio.Group key={attr.key} disabled={attr.disabled} {...rest} >
        {(attr.items as ItemSchemaOpts[]).map(function (child, r) {
            return <Radio key={attr.key! + r} value={child.value}>{child.label}</Radio>
        })}
    </Radio.Group>;

})
const UI_Adapter = function (attr: FormItem_Attr) {
    switch (attr.type) {
        case "singText": return <Input disabled={attr.disabled} key={attr.key} />;
        case "mutileText": return <Input.TextArea disabled={attr.disabled} key={attr.key} />;
        case "numberText": return <InputNumber disabled={attr.disabled} key={attr.key} />;
        case "inputDate": return <SchemaStringTypeDatePicker disabled={attr.disabled} key={attr.key} showTime />;
        case "divider": return <Divider key={attr.key} />
        case "radios": return <SchemaForwardRefRadios attr={attr} />;
        case "checks": return <Checkbox.Group options={(attr.items as ItemSchemaOpts[]).map((it) => it.value)} />;
        case "select":
        case "selectCheck":
            return <Select
                key={attr.key}
                disabled={attr.disabled}
                {...attr.type === 'selectCheck' ? { mode: "multiple" } : {}} >
                {(attr.items as ItemSchemaOpts[]).map(function (child, r) {
                    return <Select.Option key={attr.key! + r} value={child.value}>{child.label}</Select.Option>
                })}
            </Select>;
        case "image":
        case "signName":
            return <PicturesWall length={attr.type === 'signName' ? 1 : 3} enable={!attr.disabled} />;
        default: return <></>
    }
}



export class SchemaForm extends Component<SchemaFormProps, SchemaFormState> {
    formRef: RefObject<FormInstance> | undefined;
    form_item_attr: FormItem_Attr[] | undefined = undefined;

    constructor(props: SchemaFormProps) {
        super(props);
        if (!props.formRef) {
            try {
                throw new Error('properties formRef in SchemaForm is required.')
            } catch (error) {
            }
        }
        this.formRef = props.formRef;
        this.mapSchemaToForm_attr = this.mapSchemaToForm_attr.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem = function (this: SchemaForm) {
        const form_item_attr = this.mapSchemaToForm_attr(this.props.schema);
        return form_item_attr?.map(function (attr) {
            const items = attr.items as SubFormSchema[]
            if (attr.type === 'ChildrenTable') {
                return <Form.Item label={attr.label} {...formItemLayout} style={{ width: "85%" }} key={attr.key}>
                    <Form.List name={attr.name!} {...attr}  >
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Row style={{ border: '1px solid rgba(0,0,0,.1)', padding: '20px 0px 20px 0px', marginTop: 10 }} key={index}>
                                        <Col span={22}>
                                            {items.map(item => <Form.Item
                                                {...formItemLayout} style={{ width: "100%" }}
                                                name={[field.name, item.name]}
                                                fieldKey={[field.fieldKey, item.name]}
                                                rules={[{ required: item.required }]}
                                                label={item.label}
                                                key={field.fieldKey + '' + item.name}
                                            >
                                                {UI_Adapter(item as unknown as FormItem_Attr)}
                                            </Form.Item>)}
                                        </Col>
                                        <Col span={2} >
                                            <DeleteOutlined onClick={remove.bind(void 0, field.name)} />
                                        </Col>
                                    </Row>))}
                                <Button onClick={add} icon={<PlusSquareOutlined />}>添加</Button>
                            </>)
                        }
                    </Form.List>
                </Form.Item>

            }
            else return <Form.Item {...attr} {...formItemLayout} style={{ width: "85%" }} key={attr.key}>
                {UI_Adapter(attr)}
            </Form.Item>
        })
    }
    componentDidMount() {
        this.form_item_attr = this.mapSchemaToForm_attr(this.props.schema);
    }

    mapSchemaToForm_attr = function (this: SchemaForm, items: FormItemSchema[]): FormItem_Attr[] {
        const { mapSchemaToForm_attr } = this;
        return items.reduce(function (pre: any[], next) {
            return pre.concat([{
                key: next.id,
                name: next.id,
                label: next.title,
                mode: next.type === 'selectCheck' ? 'multiple' : undefined,
                rules: [{ required: next.required }],
                style: {
                    visibility: next.visible ? 'visible' : 'none'
                },
                type: next.type,
                disabled: (next.enable ?? true) ? false : true,
                items: next.type === 'ChildrenTable' ?
                    //@ts-expect-error
                    mapSchemaToForm_attr.call(this, next.items)
                    : next.items
            } as FormItem_Attr])

        }, [])
    }


    render() {
        console.log(this.props.record)
        return <Form ref={this.formRef} layout="horizontal" initialValues={this.props.record}>
            {this.renderItem()}
        </Form>
    }
}