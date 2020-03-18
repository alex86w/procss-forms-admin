import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import './index.module.less';

import styles from './index.module.less';
const Group = Checkbox.Group;
export const titleType = {
  visible: 'visible',
  editable: 'editable',
  brief: 'brief',
};
export type Ttype = keyof typeof titleType;
export interface CheckProps {
  onChange: (e: CheckboxValueType[]) => void;
  title: Ttype[];
  style?: React.CSSProperties;
  data: Array<string>;
  model: any;
  keyr: string;
}

export const CustomCheckBox = function(props: CheckProps) {
  const { onChange, title, style, data, model, keyr } = props;
  const len = title.length;
  const span = 24 / (len + 1);
  return (
    <div style={style}>
      <div className={styles.headerbar}>字段权限控制</div>
      <Group
        style={{ width: '100%' }}
        onChange={onChange}
        value={model[keyr] || []}
      >
        <Row>
          <Col span={span} className={styles.colspan} />
          {title.map(one => (
            <Col span={span} key={one} className={styles.colspan}>
              {one}
            </Col>
          ))}
          {data.map(label => (
            <Row key={label} style={{ width: '100%', marginTop: '12px' }}>
              <Col span={span} style={{ paddingLeft: 5 }}>
                {label}
              </Col>
              {title.map(one => (
                <Col span={span} key={`${label}:${one}`}>
                  <Checkbox value={`${label}:${one}`}></Checkbox>
                </Col>
              ))}
            </Row>
          ))}
        </Row>
      </Group>
    </div>
  );
};
