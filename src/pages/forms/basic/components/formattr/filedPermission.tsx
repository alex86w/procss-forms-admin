import React, { useContext } from 'react';
import { Checkbox } from 'antd';
import { useModel } from 'umi';


const FiledPermission = () => {
  const { selectItem, updateItem } = useModel('forms')
  return (
    <>
      <span className="title">字段权限</span>
      <div>
        <Checkbox checked={selectItem.visible} onChange={e => updateItem(e.target.checked, 'visible')} >可见</Checkbox>
        <Checkbox checked={selectItem.enable} onChange={e => updateItem(e.target.checked, 'enable')} >可编辑</Checkbox>
      </div>
    </>
  );
};

export default FiledPermission;
