import React, { useContext } from 'react';
import { Checkbox } from 'antd';
import { ContentContext } from '../../formdes';

const VerifyOne = () => {
  const { selectItem, updateItem } = useContext(ContentContext)
  return (
    <>
      <span className="title">校验</span>
      <div>
        <Checkbox checked={selectItem.required} onChange={e => updateItem(e.target.checked, 'required')}>必填</Checkbox>
      </div>
    </>
  );
};

export default VerifyOne;
