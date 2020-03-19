import React, { useContext } from 'react';
import { Button } from 'antd';
import { useDrag } from 'react-dnd';
import { generate } from 'shortid';
interface Props {
  title: string;
  icon?: React.ReactNode;
  type: string;
}
import { ContentContext } from '../formdes';

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
        addItems && addItems({ id: generate(), type: key, title });
      }
    },
  });

  return (
    <div ref={drag} style={{ opacity, cursor: 'move', marginTop: 10 }}>
      <Button
        style={{ width: 100 }}
        onClick={() => addItems({ id: generate(), type: key, title })}
        size="small"
        icon={icon}
      >
        {title}
      </Button>
    </div>
  );
};
