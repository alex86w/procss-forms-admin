import { useState } from 'react';

const constants = {
  '1': '我的待办',
  '4': '我的发起',
  '2': '我的处理',
  '3': '我的抄送',
  '5': '我的表单',
};

type ActiveKey = keyof typeof constants;
export default () => {
  const [activeKey, $activeKey] = useState<ActiveKey>('1');
  const [visible, $visible] = useState<boolean>(true);

  return {
    activeKey,
    $activeKey,
    visible,
    $visible,
    constants,
  };
};
