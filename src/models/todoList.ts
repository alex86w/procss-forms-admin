import { useState } from 'react';

export const constants = {
  '1': '待办事项',
  '4': '我发起的',
  '2': '我处理的',
  '3': '抄送我的',
  '5': '我的业务',
  '6': '完成事项',
};

export type ActiveKey = keyof typeof constants;
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
