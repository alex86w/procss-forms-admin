import React, { useState } from 'react';
import { SwitchLine } from '@/components/SwitchLine';
import { Helper } from '@/components/Helper';

function ahayaPage() {
  const [checked, $checked] = useState(false);
  return (
    <SwitchLine
      checked={checked}
      label={
        <span>
          流程发起后允许撤回
          <Helper text="开启功能后，当后续节点负责人尚未处理时，发起人可撤回流程。" />
        </span>
      }
      onChange={$checked}
    />
  );
}

ahayaPage.title = 'perk';
ahayaPage.icon = 'android';
export default ahayaPage;
