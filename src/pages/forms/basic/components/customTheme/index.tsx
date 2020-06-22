import React, { useState } from 'react'
import ColorImagePicker from '../ColorImagePicker'
import { Divider, Radio, Select } from 'antd'

import {
    AlignCenterOutlined,
    AlignLeftOutlined, AlignRightOutlined, FontColorsOutlined, BoldOutlined, ItalicOutlined, UnderlineOutlined
} from '@ant-design/icons'
import { useModel } from 'umi'
import ColorModal from '@/components/ColorPicker/colorModal'
const { Option } = Select
function CustomTheme() {
    const { forms, updateFormsDeep } = useModel('forms')
    const [visible, setVisible] = useState(false)
    return (
        <div style={{ margin: 10, height: '100vh', }}>
            <span className="title">页面背景</span>
            <ColorImagePicker themKey='background' />
            <span style={{ fontSize: 6, color: 'gray' }}>支持jpg、gif、png格式 大小不超过 1M</span>
            <Divider />
            <span className="title">表头样式</span>
            <ColorImagePicker themKey='banner' />
            <Divider />
            <span className="title">标题样式</span>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                <span style={{ textAlign: 'left', width: 70 }}>对齐方式</span>
                <Radio.Group value={forms.theme.custom.title?.textAlign} onChange={v => updateFormsDeep({ theme: { custom: { title: { textAlign: { $set: v.target.value } } } } })} size='small'>
                    <Radio.Button value='left' ><AlignLeftOutlined /></Radio.Button>
                    <Radio.Button value='center'><AlignCenterOutlined /></Radio.Button>
                    <Radio.Button value='right'><AlignRightOutlined /></Radio.Button>
                </Radio.Group>
                <Radio.Group size='small'>
                    <Radio.Button checked={false} onClick={() => setVisible(true)}><FontColorsOutlined style={{ color: forms.theme.custom.title?.color }} /></Radio.Button>
                </Radio.Group>
                <ColorModal visible={visible} onChange={v => updateFormsDeep({ theme: { custom: { title: { color: { $set: v } } } } })} onClose={() => setVisible(false)} color={forms.theme.custom.title?.color} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                <span style={{ textAlign: 'left', width: 70 }}>样式</span>
                <Select
                    onChange={v => updateFormsDeep({ theme: { custom: { title: { fontSize: { $set: parseInt(v) } } } } })}
                    value={(forms.theme.custom.title?.fontSize || 20) + ''} size='small' style={{ width: 60 }} defaultValue='20'>
                    <Option value='20'>
                        20
                    </Option>
                    <Option value='18'>
                        18
                    </Option>
                    <Option value='13'>
                        13
                    </Option>
                </Select>
                <Radio.Group
                    value={forms.theme.custom.title?.fontStyle}
                    onChange={v => updateFormsDeep({ theme: { custom: { title: { fontStyle: { $set: v.target.value } } } } })}
                    size='small'>
                    <Radio.Button value='bold'><BoldOutlined /></Radio.Button>
                    <Radio.Button value='italic'><ItalicOutlined /></Radio.Button>
                    <Radio.Button value='underline'><UnderlineOutlined /></Radio.Button>
                </Radio.Group>
            </div>
            <Divider />
            <span className="title">提交按钮</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                <ColorImagePicker themKey='submit_btn' />
            </div>
        </div>
    )
}

export default CustomTheme;
