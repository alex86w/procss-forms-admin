import ContentBase, { ContentBaseProps } from './contentItemBase';
import React from 'react';
import { Divider } from 'antd';

interface SingleTitleProps extends ContentBaseProps { }

const DividerTitle: React.FC<SingleTitleProps> = props => {
  const { value } = props.item
  return (
    <ContentBase {...props}>
      {value !== 'none' && <Divider type='horizontal' dashed={value === 'dashed'}
        style={{ height: value === 'solid1' ? '1px' : '2px' }} />}
    </ContentBase >
  );
};

export default DividerTitle;
