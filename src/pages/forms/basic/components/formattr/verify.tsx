import React, { useContext } from 'react';
import { Checkbox } from 'antd';
import { ContentContext } from '../../formdes';

const Verify = () => {
  const { selectItem, updateItem } = useContext(ContentContext)
  return (
    <>
      <span className="title">校验</span>
      <div>
        <Checkbox checked={selectItem.required} onChange={e => updateItem(e.target.checked, 'required')}>必填</Checkbox>
        <Checkbox checked={selectItem.noRepeat} onChange={e => updateItem(e.target.checked, 'noRepeat')}>不允许重复</Checkbox>
      </div>
    </>
  );
};

export default Verify;
