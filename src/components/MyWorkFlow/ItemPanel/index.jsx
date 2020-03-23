import React, { forwardRef, useContext } from 'react';
import { Tooltip } from 'antd';
import styles from './index.less';

const ItemPanel = forwardRef((props, ref) => {
  return (
    <span ref={ref}>
      <Tooltip title="审批节点">
        <img
          data-item={
            "{clazz:'userTask',size:'80*44',label:'" + '审批节点' + "',suggest:true,submit:true}"
          }
          src={require('../../WorkFlowDesigner/assets/flow/user-task.svg')}
          style={{ width: 70, height: 26 }}
        />
      </Tooltip>
      <Tooltip title="抄送节点">
        <img
          data-item={
            "{clazz:'receiveTask',size:'80*44',label:'" + '抄送节点' + "'}"
          }
          src={require('../../WorkFlowDesigner/assets/flow/receive-task.svg')}
          style={{ width: 70, height: 26 }}
        />
      </Tooltip>
    </span>
  );
});

export default ItemPanel;
