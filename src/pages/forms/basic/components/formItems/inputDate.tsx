import React from 'react';
import ContentBase, { ContentBaseProps } from './contentItemBase';
import { DatePicker } from 'antd';
import moment from 'moment'
const InputDate: React.FC<ContentBaseProps> = props => {
    const m = props.item.value === 'today' ? moment() : moment(props.item.value, props.item.dateFormat)
    return (
        <ContentBase {...props}>
            <DatePicker value={m}/>
        </ContentBase>
    );
};

export default InputDate;
