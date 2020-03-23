import React from 'react';
import { } from 'antd';
import { LazyLoader } from '@/components/lazyLoader';

interface roleProps { }
const role = function (props: roleProps) {
  return <LazyLoader type="delay" loader={() => setTimeout(() => ({ 'ahaya': 'str' }), 5000)} />;
};
role.title = '角色管理';
role.icon = 'team';
role.sort = 2;
export default role;
