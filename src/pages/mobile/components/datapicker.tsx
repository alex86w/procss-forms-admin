import React, { useEffect } from 'react'
import { FormItems } from '@/services/interface/forms.interface'
import { Input } from 'antd';
import { DatePicker } from 'antd-mobile'
import moment from 'moment';
import form from '@/pages/models/form';
interface Props {
    onChange?: (value: any) => void,
    item: FormItems,
    value?: any
}
export default function Datepicker(props: Props) {
    const { item, value } = props;
    const dateFormat = item.dateFormat || 'YYYY-MM-DD'
    const dValue = value === 'today' ? moment().format(item.dateFormat) : value;
    useEffect(() => {
        if (value === 'today') {
            props.onChange && props.onChange(dValue)
        }
    })

    function onChange(value: Date) {
        const str = moment(value).format(dateFormat);
        props.onChange && props.onChange(str)
    }
    return <DatePicker onChange={onChange} format={dateFormat}  mode={dateFormat.includes('HH:mm') ? 'datetime' : 'date'}>
        <Input value={dValue} placeholder={`请选择${item.title}`} className="item_inputbox other_item" />
    </DatePicker>
}
