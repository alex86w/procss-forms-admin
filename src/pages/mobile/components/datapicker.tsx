import React from 'react'
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
    const mode = item.dateFormat !== 'YYYY-MM-DD hh:mm' ? 'datetime' : 'date'
    function onChange(value: Date) {
        const str = moment(value).format(item.dateFormat);
        props.onChange && props.onChange(str)
    }
    return <DatePicker onChange={onChange} format={item.dateFormat} mode={mode}>
        <Input value={value} placeholder={`请选择${item.title}`} className="item_inputbox other_item" />
    </DatePicker>
}
