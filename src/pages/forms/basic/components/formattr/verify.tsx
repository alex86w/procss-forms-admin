import React from 'react';
import { Checkbox } from 'antd';

const Verify = () => {
  return (
    <>
      <span className="title">校验</span>
      <div>
        <Checkbox>必填</Checkbox>
        <Checkbox>不允许重复</Checkbox>
      </div>
    </>
  );
};

export default Verify;
