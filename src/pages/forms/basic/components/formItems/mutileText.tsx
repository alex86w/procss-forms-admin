import React from 'react';

import ContentBase, { ContentBaseProps } from './contentItemBase';
import { Input } from 'antd';

const MutileText: React.FC<ContentBaseProps> = props => {
  return (
    <ContentBase {...props}>
      <Input.TextArea></Input.TextArea>
    </ContentBase>
  );
};

export default MutileText;
