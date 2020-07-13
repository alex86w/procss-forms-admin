import React, { forwardRef } from 'react';
import { Select, Input, DatePicker } from 'antd';
import moment from 'moment';
import './index.less';

const disabledValue = ['null','notNull']

export const SelectFilter = forwardRef((props: any, ref: any) => {
    const { value, onChange, methods, opts, ...rest } = props;
    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Select onChange={val => onChange({ ...(value as any || {}), method: val })} value={(value || {}).method} style={{ width: 100 }} placeholder="请选择筛选条件">
            {Array.isArray(methods) && methods.map(method => <Select.Option key={method.key} value={method.key}>{method.label}</Select.Option>)}
        </Select>
        {!disabledValue.includes(value?.method) && <Select onChange={val => onChange({ ...(value as any || {}), value: val })} value={(value || {}).value} {...rest} style={{ width: 200 }}>
            {Array.isArray(opts) && opts.map(opt => <Select.Option key={opt.value||opt.label} value={opt.value||opt.label}>{opt.label}</Select.Option>)}
        </Select>}
    </div>
})

export const InputFilter = forwardRef((props: any, ref: any) => {
    const { value, onChange, methods, opts, ...rest } = props;

    return <div style={{ width: 280 }}>
        <Select onChange={val => onChange({ ...(value as any || {}), method: val })} value={(value || {}).method} placeholder="请选择筛选条件">
            {Array.isArray(methods) && methods.map(method => <Select.Option key={method.key} value={method.key}>{method.label}</Select.Option>)}
        </Select>
        {!disabledValue.includes(value?.method) &&  <Input onChange={e => onChange({ ...(value as any || {}), value: e.target.value })} value={(value || {}).value} {...rest} style={{ width: 200 }}/>}
    </div>
})

export const DateFilter = forwardRef((props: any, ref: any) => {
    const { value, onChange, methods, opts, ...rest } = props;
    return <div style={{ width: 280 }}>
        <Select onChange={val => onChange({ ...(value as any || {}), method: val })} value={(value || {}).method} placeholder="请选择筛选条件">
            {Array.isArray(methods) && methods.map(method => <Select.Option key={method.key} value={method.key}>{method.label}</Select.Option>)}
        </Select>
        {!disabledValue.includes(value?.method) && <DatePicker onChange={v => onChange({ ...(value || {}), value: moment(v as any).format('YYYY-MM-DD hh:mm') })} showTime value={(value || {}).value ? moment(value.value) : undefined} style={{ width: 200 }}/>}

    </div>
})