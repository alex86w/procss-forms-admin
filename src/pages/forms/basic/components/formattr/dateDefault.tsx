import { Select, DatePicker, Divider } from 'antd'
import React, { useContext, useState, useEffect } from 'react'
import { useModel } from 'umi';

const { Option } = Select

function DateDefault() {
    const { selectItem, updateItem } = useModel('forms');
    const [modStr, setMod] = useState('')
    useEffect(() => {
        if (selectItem.value && selectItem.value === 'today') {
            setMod('today')
        } else if (selectItem.value) {
            setMod('custom')
        }
    }, [selectItem.id])
    function modChange(v: string) {
        if (v === 'today') {
            updateItem(v, 'value')
        } else if (v === 'custom' && selectItem.value === 'today') {
            updateItem('', 'value')
        }
        setMod(v);
    }
    return (
        <>
            <span className="title">类型</span>
            <Select style={{ width: '100%' }} value={selectItem.dateFormat} onSelect={e => updateItem(e, 'dateFormat')}>
                <Option value="YYYY-MM-DD">日期</Option>
                <Option value="YYYY-MM-DD HH:mm">日期时间</Option>
            </Select>
            <Divider />
            <span className="title">默认值</span>
            <Select value={modStr} onSelect={modChange} style={{ width: '100%' }}>
                <Option value='today'>填写当天</Option>
                <Option value='custom'>自定义</Option>
            </Select>
            {modStr === 'custom' && <DatePicker
                format={selectItem.dateFormat}
                onChange={e => updateItem(e?.format(selectItem.dateFormat), 'value')}
                showTime={selectItem.dateFormat && selectItem.dateFormat.indexOf('HH:mm') >= 0 || false}
                style={{ width: '100%', marginTop: 10 }} />}
        </>
    )
}



export default DateDefault
