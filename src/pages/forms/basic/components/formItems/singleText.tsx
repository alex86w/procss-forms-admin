import ContentBase, { ContentBaseProps } from './contentItemBase';
import React from 'react';
import { Input } from 'antd';

interface SingleTitleProps extends ContentBaseProps {}

const SingleText: React.FC<SingleTitleProps> = props => {
  return (
    <ContentBase {...props}>
      <Input />
    </ContentBase>
  );
};

export default SingleText;
