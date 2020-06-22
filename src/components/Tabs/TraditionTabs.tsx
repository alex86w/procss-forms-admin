import React, { useState, Component } from 'react';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;
export interface TraditionTabsProps {
  components: {
    key: string;
    component?: JSX.Element;
  }[];
}
export const TraditionTabs = function(props: TraditionTabsProps) {
  const [selected, $selected] = useState<string>('1');
  const { components } = props;

  return (
    <Tabs activeKey={selected} onChange={$selected}>
      {components.map((item, index) => (
        <TabPane key={(index + 1).toString()} tab={item.key}>
          {item.component}
        </TabPane>
      ))}
    </Tabs>
  );
};
