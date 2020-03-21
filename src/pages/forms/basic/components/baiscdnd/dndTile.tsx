import React, { useContext } from 'react';
import { Button } from 'antd';
import { useDrag } from 'react-dnd';
import { generate } from 'shortid';
interface Props {
  title: string;
  icon?: React.ReactNode;
  type: string;
}
import { ContentContext } from '../../formdes';
import { FormType } from '@/services/constants';

export default ({ title, icon, type: key }: Props) => {
  const { addItems } = useContext(ContentContext);
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
    const data: any = { id: generate(), type: key, title };
    if (key === FormType[FormType.checks]
      || key === FormType[FormType.radios]
      || key === FormType[FormType.select]
      || key === FormType[FormType.selectCheck]) {
      data['items'] = [{
        label: '选项1',
        value: '选项1'
      }, {
        label: '选项2',
        value: '选项2'
      }, {
        label: '选项3',
        value: '选项3'
      }]
      addItems(data)
    } else {
      addItems(data)
    }
  }

  return (
    <div ref={drag} style={{ opacity, cursor: 'move', marginTop: 10 }}>
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
