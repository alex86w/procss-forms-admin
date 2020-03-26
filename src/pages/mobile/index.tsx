import React, { useEffect, useState } from 'react'
import { useModel } from 'umi'
import { Input, Form, InputNumber, Select, Radio, Checkbox, Button } from 'antd'
import { FormItems, } from '@/services/interface/forms.interface'
import './index.less'
import { useForm } from 'antd/lib/form/util'

import { FormType } from '@/services/constants'
import PicCard from '@/components/FileUpload/picturesWall'
//@ts-ignore
import moment from 'moment'
import Datepicker from './components/datapicker'
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



const Mobile = (props: any) => {
    const { forms } = useModel('forms')
    const [form] = useForm();
    const { items: formItems, theme: { custom } } = forms
    const { title, background, banner } = custom
    const backgroundImage = background?.image && `url(/api/file/get/${background.image})`

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
                    {it.items?.map((x, index) => <Select.Option key={`${it.id}_${index}`} value={x.value}>
                        {x.value}
                    </Select.Option>)
                    }
                </Select>;
            case FormType[FormType.radios]:
                const vertical = it.layout !== 'horizontal'
                return <Radio.Group style={{ padding: vertical ? '0px' : '5px', margin: 0 }} className="item_inputbox">
                    {it.items?.map((x, i) => vertical ?
                        <div key={`${it.id}_${i}`} className={
                            //@ts-ignore
                            i === it.items?.length - 1 ? "other_item" : "group_item"} style={{ padding: '5px' }}>
                            <Radio style={x} value={x.value}>
                                {x.value}
                            </Radio>
                        </div> :
                        <Radio key={`${it.id}_${i}`} value={x.value}>
                            {x.value}
                        </Radio>)
                    }
                </Radio.Group>;
            case FormType[FormType.inputDate]:
                return <Datepicker item={it} />
            case FormType[FormType.checks]: {
                const vertical = it.layout !== 'horizontal'
                return <Checkbox.Group style={{ padding: vertical ? '0px' : '5px', margin: 0 }} className="item_inputbox">
                    {it.items?.map((x, i) => vertical ?
                        <div key={`${it.id}_${i}`} className={
                            //@ts-ignore
                            i === it.items?.length - 1 ? "other_item" : "group_item"} style={{ padding: '5px' }}>
                            <Checkbox style={x} value={x.value}>
                                {x.value}
                            </Checkbox>
                        </div> :
                        <Checkbox key={`${it.id}_${i}`} value={x.value}>
                            {x.value}
                        </Checkbox>)
                    }
                </Checkbox.Group>;
            }
            case FormType[FormType.image]:
                return <PicCard />
            default:
                return <div />
        }
    }

    return (
        <div style={{ width: '100%', height: '100%', textAlign: 'center', background: background?.mode === 'image' ? backgroundImage : background?.color || "#f5f7fa" }}>
            <div style={{ height: 100, width: '100%', background: banner?.mode === 'color' ? banner.color : `url(/api/file/get/${banner?.image})` }}>
            </div>
            <div style={{ textAlign: title?.textAlign || 'left', width: '100%', marginTop: 10 }}>
                <span style={{ fontStyle: title?.fontStyle, fontSize: title?.fontSize, color: title?.color }}> {forms.name}</span>
            </div>
            <div style={{ textAlign: 'left' }}>
                <Form form={form} style={{ background: 'transparent(rgb(0,0,0.2))' }}>
                    {formItems.map(it => <div className="item_warper">
                        <span className="item_title">{it.title}</span>
                        <div dangerouslySetInnerHTML={{ __html: it.description || '' }} />
                        <Item rules={[{ required: it.required, message: `请填写${it.title}` }]} key={it.id} name={`${it.id}_${it.title}`} >
                            {rendItem(it)}
                        </Item>
                    </div>
                    )}
                </Form>
            </div>
            <Button onClick={() => {
                form.validateFields().then(e => console.log(e))
            }} style={{ width: '80%', marginBottom: '20px' }} type='primary'>提交</Button>
        </div >
    )
}

export default Mobile

