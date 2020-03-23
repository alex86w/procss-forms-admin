import React, { useContext } from 'react';
import { Checkbox } from 'antd';
import { useModel } from 'umi';


const VerifyOne = () => {
  const { selectItem, updateItem } = useModel('forms')
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
