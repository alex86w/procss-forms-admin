import React, { useEffect, useState } from 'react'
import { useModel } from 'umi'
import { ListView } from 'antd-mobile'
import { Input, Form, InputNumber, Select, Radio } from 'antd'
import { FormItems } from '@/services/interface/forms.interface'
import './index.less'
import { useForm } from 'antd/lib/form/util'
import TextInput from './components/TextInput'
import { FormType } from '@/services/constants'
import TextAreaInput from './components/TextAreaInput'
//@ts-ignore

const { Item } = Form
const gendivierStyle = (value?: string) => {
    switch (value) {
        case 'dash':
            return '1px dash #c2c2c2';
        case 'solid1':
            return '1px solid #c2c2c2';
        case 'solid2':
            return '2px solid #c2c2c2';
        default:
            return '1px dash #c2c2c2';
    }
}

const rendItem = (it: FormItems) => {
    const placeholder = `请填写${it.title}`;
    switch (it.type) {
        case FormType[FormType.singText]:
            return <Input placeholder={placeholder} className="item_inputbox other_item" />
        case FormType[FormType.mutileText]:
            return <Input.TextArea placeholder={placeholder} className="item_inputbox other_item" />
        case FormType[FormType.numberText]:
            return <InputNumber width="100%" max={it.maxNumber} min={it.minNumber} placeholder={placeholder} className="item_inputbox other_item" />
        case FormType[FormType.divider]:
            return <div className="item_inputbox" style={{ borderBottom: gendivierStyle(it.value) }} />
        case FormType[FormType.select]:
            return <Select className="item_inputbox" defaultValue={it.value}>
                {it.items?.map(x => <Select.Option value={x.value}>
                    {x.value}
                </Select.Option>)
                }
            </Select>;
        case FormType[FormType.radios]:
            return <Radio.Group className="item_inputbox">
                
            </Radio.Group>
        default:
            return <div />
    }
}

const Mobile = (props: any) => {
    const { formItems } = useModel('forms')
    const [form] = useForm();
    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: "#f5f7fa" }}>
            <div className="header">
            </div>
            <Form>
                {formItems.map(it => <Item key={it.id} name={it.id} >
                    <div className="item_warper">
                        <span className="item_title">{it.title}</span>
                        <div dangerouslySetInnerHTML={{ __html: it.description || '' }} />
                        {rendItem(it)}
                    </div>
                </Item>)}
            </Form>
        </div >
    )
}

export default Mobile

