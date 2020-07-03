import { Select, Row,Input } from 'antd';
import React from 'react';
import { SwitchLine } from '@/components/SwitchLine';
import styles from './index.less';
const Option = Select.Option;
export const startNode = [
  'node:operation',
  'submit',
  // 'submitWithPrint',
  'endable'
];
export const viewNode = [
  'node:view',
  'suggest',
  'handWritten',
  'node:operation',
  'submit',
  // 'submitWithPrint',
  'refuse',
  'forward',
  'endable',
  // 'bluksubmit',
  // 'node:validation',
  'flow:rule',
  'flow:signGroup'
];
export const DrawRow = ({ array, onChange, model }) => {
  return array.map(arr => {
    switch (arr) {
      case 'node:operation':
        return <Row key={arr}><span className={styles.title}>节点操作</span></Row>;
      case 'submit':
        return <Row key={arr}><SwitchLine label="提交" onChange={v => onChange('submit', v)} checked={model.submit || false} /></Row>;
      // case 'submitWithPrint':
      //   return <Row key={arr}><SwitchLine label="提交并打印" onChange={v => onChange('submitWithPrint', v)} checked={model.submitWithPrint || false} /></Row>;
      case 'node:view':
        return <Row key={arr}><span className={styles.title}>审批意见</span></Row>;
      case 'suggest':
        return <Row key={arr}><SwitchLine label="文本意见" onChange={v => onChange('suggest', v)} checked={model.suggest || false} /></Row>;
      case 'handWritten':
        return <Row key={arr}><SwitchLine label="手写签名" onChange={v => onChange('handWritten', v)} checked={model.handWritten || false} /></Row>;
      case 'refuse':
        return <Row key={arr}><SwitchLine label="回退" onChange={v => onChange('refuse', v)} checked={model.refuse || false} /></Row>;
      case 'forward':
        return <Row key={arr}><SwitchLine label="转交" onChange={v => onChange('forward', v)} checked={model.forward || false} /></Row>;
      case 'endable':
        return <Row key={arr}><SwitchLine label="结束流程" onChange={v => onChange('endable', v)} checked={model.endable || false} /></Row>;
      // case 'bluksubmit':
      //   return <Row key={arr}><SwitchLine label="批量提交" onChange={v => onChange('bluksubmit', v)} checked={model.bluksubmit || false} /></Row>;
      case 'node:validation':
        return <Row key={arr}>
          <div className={styles.title}>节点校验条件</div>
          <Select style={{ width: "100%", margin: '10px 0' }}>
            <Option key=""></Option>
            <Option></Option>
          </Select>
        </Row>;
      case 'flow:rule':
        return <Row key={arr}>
          <div className={styles.title}>流转规则</div>
          <Select style={{ width: "100%", margin: '10px 0' }} value={model.submitRule} onChange={(v) => onChange('submitRule', v)}>
            <Option key="all" value="all">所有负责人提交后进入下一节点</Option>
            <Option key="any" value="any">任意负责人提交后进入下一节点</Option>
          </Select>
        </Row>;
      case 'flow:signGroup':
        return <Row key={arr}>
          <div className={styles.title}>签字组名</div>
          <Input value={model.signGroup} onChange={e => onChange('signGroup', e.target.value)} />
        </Row>;
    }
  });
};
