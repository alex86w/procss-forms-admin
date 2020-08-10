import React, { useContext, useEffect } from 'react';
import { Checkbox } from 'antd';
import { useModel } from 'umi';


const FiledPermission = () => {
  const { selectItem, updateItem } = useModel('forms')
  useEffect(() => {
    if (selectItem.visible === undefined) {
      updateItem(true, 'visible')
      updateItem(true, 'enable')
    }
  }, [selectItem.id]);

  function enableNeedVisible(enable: boolean) {
    if (enable && !selectItem.visible) {
      updateItem(true, 'visible')
    }
    updateItem(enable, 'enable')
  }

 

  return (
    <>
      <span className="title">字段权限</span>
      <div>
        <Checkbox checked={selectItem.visible} onChange={e => updateItem(e.target.checked, 'visible')} >可见</Checkbox>
        <Checkbox checked={selectItem.enable} onChange={e => enableNeedVisible(e.target.checked)} >可编辑</Checkbox>
      </div>
    </>
  );
};

export default FiledPermission;
