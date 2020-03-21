import ContentBase, { ContentBaseProps } from './contentItemBase';
import React from 'react';
import { Input } from 'antd';

interface SingleTitleProps extends ContentBaseProps { }

const SingleText: React.FC<SingleTitleProps> = props => {
    return (
        <ContentBase {...props}>
            <Input value={props.item.value} />
        </ContentBase>
    );
};

export default SingleText;
