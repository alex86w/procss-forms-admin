import React, { useState } from 'react';
import { Checkbox, Row, Col } from 'antd';
import MathTool from '@/utils/MathTool';
import { generate } from 'shortid';

const Group = Checkbox.Group;

export interface BinaryCheckboxProps {}
interface Loop {
  [key: string]: number;
}
const initLoop: Loop = {
  join_001: 1,
  join_002: 3,
  join_003: 5,
  join_004: 7,
};
export const BinaryCheckbox = function(props: BinaryCheckboxProps) {
  const [loop, $loop] = useState<Loop>(initLoop);

  return (
    <div style={{ width: '100%' }}>
      <Row>
        <Col span={6} />
        <Col span={6}>可见</Col>
        <Col span={6}>可编辑</Col>
        <Col span={6}>简报</Col>
      </Row>
      {Object.keys(loop).map(key => {
        let lookeyArray = loop[key].toString(2).split('');
        return (
          <Row key={key}>
            <Col span={6}>{key}</Col>
            {lookeyArray.map((item, keyr) => (
              <Col span={6} key={item + '_' + keyr}>
                {' '}
                <Checkbox
                  checked={item === '1'}
                  onChange={({ target: { checked } }) => {
                    lookeyArray[keyr] = checked ? '1' : '0';
                    $loop({
                      ...loop,
                      [key]: MathTool.BinaryToDecimal(lookeyArray.join('')),
                    });
                  }}
                />
              </Col>
            ))}
          </Row>
        );
      })}
    </div>
  );
};
