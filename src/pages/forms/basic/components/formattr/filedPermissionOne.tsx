import React, { useContext, useEffect } from 'react';
import { Checkbox } from 'antd';
import { useModel } from 'umi';


const FiledPermissionOne = () => {
  const { selectItem, updateItem } = useModel('forms')
  useEffect(() => {
    if (selectItem.visible === undefined) {
      updateItem(true, 'visible')
    }
  }, [selectItem.id]);
  
  return (
    <>
      <span className="title">字段权限</span>
      <div>
        <Checkbox checked={selectItem.visible} onChange={e => updateItem(e.target.checked, 'visible')} >可见</Checkbox>
      </div>
    </>
  );
};

export default FiledPermissionOne;
