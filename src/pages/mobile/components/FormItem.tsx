import React from 'react'
import { FormItems } from '@/services/interface/forms.interface';
import { FormType } from '@/services/constants';
import { Input, InputNumber, Select, Radio, Checkbox, Form } from 'antd';
import Datepicker from './datapicker';
import SignNameItem from './signNameItem';
import PicCard from '@/components/FileUpload/picturesWall'
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

export const rendItem = (it: FormItems) => {
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
        case FormType[FormType.selectCheck]:
            return <Select mode='multiple' className="item_inputbox" defaultValue={it.value}>
                {it.items?.map((x, index) => <Select.Option key={`${it.id}_${index}`} value={x.value}>
                    {x.value}
                </Select.Option>)
                }
            </Select>;
        case FormType[FormType.radios]:
            const vertical = it.layout !== 'horizontal'
            return <Radio.Group key={`${it.id}_radio`} style={{ padding: vertical ? '0px' : '5px', margin: 0 }} className="item_inputbox">
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
            return <PicCard enable={it.enable} onlyCamera={it.onlyCamera} length={it.onlyOneImage ? 1 : 3} />
        case FormType[FormType.signName]:
            return <SignNameItem />
        default:
            return <div />
    }
}
function FormItem({ it, noDes, name }: { it: FormItems, noDes?: boolean, name?: string }) {


    return <div key={it.id} className="item_warper">
        <span className="item_title">  {it.title}</span>
        {!noDes && <div dangerouslySetInnerHTML={{ __html: it.description || '' }} />}
        {it.type === FormType[FormType.divider] ? rendItem(it) :
            <Item rules={[{ required: it.required, message: `请填写${it.title}` }]} name={name || it.id} >
                {rendItem(it)}
            </Item>
        }
        {!it.enable && <div className='mask' />}
    </div >
}

export default FormItem
