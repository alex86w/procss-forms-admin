import ContentBase, { ContentBaseProps } from './contentItemBase';
import React from 'react';
import { Divider } from 'antd';

interface SingleTitleProps extends ContentBaseProps {}

const DividerTitle: React.FC<SingleTitleProps> = props => {
  const { title } = props;
  return (
    <ContentBase {...props}>
      <span>{title}</span>
      <Divider />
    </ContentBase>
  );
};

export default DividerTitle;
