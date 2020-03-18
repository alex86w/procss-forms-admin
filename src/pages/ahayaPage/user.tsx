import React, { useEffect, useRef } from 'react';
import G6 from '@antv/g6';
import { Button } from 'antd';
import { getBrowser } from '@/utils/getBrowser';
import { BinaryCheckbox } from '@/components/checkbox/BinaryCheckBox';

function ahayaPage() {
  return <BinaryCheckbox />;
}

ahayaPage.title = 'perk';
ahayaPage.icon = 'android';
export default ahayaPage;
