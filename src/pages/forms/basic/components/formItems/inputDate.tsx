import React from 'react';
import ContentBase, { ContentBaseProps } from './contentItemBase';
import { DatePicker } from 'antd';
import moment from 'moment'
const InputDate: React.FC<ContentBaseProps> = props => {
    return (
        <ContentBase {...props}>
            <DatePicker value={moment(props.item.value, props.item.dateFormat)} />
        </ContentBase>
    );
};

export default InputDate;
