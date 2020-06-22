import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';

interface HelperProps {
  text: string;
}

export const Helper = function(props: HelperProps) {
  const { text } = props;
  return (
    <Tooltip placement="top" title={text}>
      <QuestionCircleTwoTone style={{ fontSize: 13 }} />
    </Tooltip>
  );
};
