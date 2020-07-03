import React, { useContext } from 'react';
import { Button } from 'antd';
import { useDrag } from 'react-dnd';
import { generate } from 'shortid';
interface Props {
  title: string;
  icon?: React.ReactNode;
  type: string;
}

import { FormType } from '@/services/constants';
import { useModel } from 'umi';
import { generateFormItem } from '@/utils';

export default ({ title, icon, type: key }: Props) => {
  const { addItems } = useModel('forms');
  const [{ opacity }, drag] = useDrag({
    item: { key, type: 'title', title },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
      isDragging: monitor.isDragging(),
    }),
    end: (dr, monitor) => {
      if (monitor.didDrop()) {
        doneAdd();
      }
    },
  });
  function doneAdd() {
    addItems(generateFormItem(key, title))
  }

  return (
    <div
      // ref={drag} 
      style={{ opacity, cursor: 'move', marginTop: 10 }}>
      <Button
        style={{ width: 100 }}
        onClick={doneAdd}
        size="small"
        icon={icon}
      >
        {title}
      </Button>
    </div>
  );
};
