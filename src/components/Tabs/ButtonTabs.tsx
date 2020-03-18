import React, { useState } from 'react';
import { Tabs, Radio, Row, Col } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import styles from './index.module.less';

type selectedType = 'base' | 'more';
interface CustomTabsProps {
  basePaneComponet?: any;
  morePaneComponent?: any;
}
const TabPane = Tabs.TabPane;
const { Group, Button: RButton } = Radio;
const theme = {
  default: {
    background: '#fff',
    color: '#1890ff',
    width: '100%',
    textAlign: 'center' as 'center',
  },
  active: {
    background: '#1890ff',
    color: '#fff',
    width: '100%',
    textAlign: 'center' as 'center',
  },
};

interface TabsButtonsProps {
  text: string;
  active: boolean;
  value: string;
}

export const TabsButtons = ({ text, active, value }: TabsButtonsProps) => (
  <RButton value={value} style={active ? theme.active : theme.default}>
    {text}
  </RButton>
);

export const CustomTabs = function(props: CustomTabsProps) {
  //default value
  const [selected, $selected] = useState<selectedType>('base');
  const { basePaneComponet, morePaneComponent } = props;

  return (
    <div className={styles.ButtonTabs}>
      <Group
        defaultValue={selected}
        onChange={(e: RadioChangeEvent) => $selected(e.target.value)}
        style={{ width: '100%' }}
      >
        <Row>
          <Col span={12}>
            <TabsButtons
              text="基础属性"
              value="base"
              active={selected === 'base'}
            />
          </Col>
          <Col span={12}>
            <TabsButtons
              text="更多属性"
              value="more"
              active={selected === 'more'}
            />
          </Col>
        </Row>
      </Group>
      <Tabs activeKey={selected} style={{ width: '100%' }}>
        <TabPane key={'base'} tab="">
          {basePaneComponet}
        </TabPane>
        <TabPane key={'more'} tab="">
          {morePaneComponent}
        </TabPane>
      </Tabs>
    </div>
  );
};
