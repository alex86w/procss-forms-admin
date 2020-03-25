import React from 'react';
import { } from 'antd';
import { MultipleSelectMode } from '@/components/MultipleSelectMode';

interface roleProps { }
const role = function (props: roleProps) {
  // return <LazyLoader type="delay" loader={[() => new Promise(function (resolve, reject) {
  //   return setTimeout(() => ({ ahaya: 123 }), 5000)
  // }).then((v) => console.log(v)).catch(e => console.log('e', e))]} component={resolve('../../pages/system/auth')} />;
 return <MultipleSelectMode/>
};
role.title = '角色管理';
role.icon = 'team';
role.sort = 2;
export default role;
