import React, { forwardRef } from 'react';
import { Tooltip } from 'antd';

const ItemPanel = forwardRef((props, ref) => {
  return (
    <span ref={ref}>
      <Tooltip title="流程节点">
        <img
          data-item={
            "{clazz:'userTask',size:'80*44',label:'" + '流程节点' + "',suggest:true,submit:true,assignType:'person',onlyExtra:{sign:false},selectMode:[],submitRule:'any',signGroup:'' }"
          }
          src={require('../../WorkFlowDesigner/assets/flow/user-task.svg')}
          style={{ width: 70, height: 26 }}
        />
      </Tooltip>
      <Tooltip title="抄送节点">
        <img
          data-item={
            "{clazz:'receiveTask',size:'80*44',label:'" + '流程节点' + "',suggest:true,submit:true,assignType:'person',onlyExtra:{sign:false},selectMode:[] }"
          }
          src={require('../../WorkFlowDesigner/assets/flow/receive-task.svg')}
          style={{ width: 70, height: 26 }}
        />
      </Tooltip>
    </span>
  );
});

export default ItemPanel;
