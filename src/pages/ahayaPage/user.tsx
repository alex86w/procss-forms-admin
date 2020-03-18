import React, { useEffect, useRef } from 'react';
import G6 from '@antv/g6';
import { Button } from 'antd';
import { getBrowser } from '@/utils/getBrowser';

function ahayaPage() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<any>(null);

  useEffect(() => {
    if (!graphRef.current && canvasRef.current) {
      graphRef.current = new G6.Graph({
        container: canvasRef.current as HTMLDivElement,
        width: 1000,
        height: 600,
        renderer: 'svg',
      });
    }
  });

  return (
    <div>
      <Button
        onClick={() => {
          // const graph = graphRef.current;
          // graph.add('node', {
          //   clazz: "userTask",
          //   size: [80, 44],
          //   label: "审批节点",
          //   shape: "user-task-node",
          //   x: 400,
          //   y: 113,
          //   id: "userTask1584422352037"
          // })
          getBrowser();
        }}
      >
        添加
      </Button>
      <div ref={canvasRef}></div>
    </div>
  );
}

ahayaPage.title = 'perk';
ahayaPage.icon = 'android';
export default ahayaPage;
