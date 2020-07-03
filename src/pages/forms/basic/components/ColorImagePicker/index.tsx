import React, { useState } from 'react'
import { Select } from 'antd'
import ColorPicker from '@/components/ColorPicker'
import update from 'immutability-helper'
import FileUpload from '@/components/FileUpload'
import { useModel } from 'umi'
const { Option } = Select
const State: { mode: string, value?: string } = { mode: 'image' };
interface Props {
    themKey: any,
}
function ColorImagePicker({ themKey }: Props) {
    const { forms, updateFormsDeep } = useModel('forms')
    const isBt = themKey === 'submit_btn';
    //@ts-ignore
    const data = forms.theme.custom[themKey]
    function onAttrChange(v: string) {
        if (isBt) {
            updateFormsDeep({ theme: { custom: { submit_btn: { backgroundColor: { $set: v } } } } });
            return;
        }
        const obj: any = { theme: { custom: {} } };
        obj.theme.custom[themKey] = {}
        obj.theme.custom[themKey][data.mode] = { $set: v };
        updateFormsDeep(obj)
    }

    function onSelectChange(v: string) {
        const obj: any = { theme: { custom: {} } };
        obj.theme.custom[themKey] = { mode: { $set: v } }
        updateFormsDeep(obj);
    }
    //@ts-ignore
   console.log(forms.theme.custom[themKey])
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
            <Select disabled={isBt} size='small'
                value={isBt ? 'color' : data.mode}
                onChange={onSelectChange} style={{ width: 70 }} >
                <Option value='image'>
                    图片
            </Option>
                <Option value='color'>
                    颜色
            </Option>
            </Select>
            {data.mode === 'image' && !isBt ? <FileUpload onChange={onAttrChange} /> : <ColorPicker color={isBt ? data.backgroundColor : data.color} onChange={onAttrChange} />}

        </div >
    )
}

export default ColorImagePicker
