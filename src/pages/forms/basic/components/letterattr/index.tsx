import * as React from 'react';
import { Input, Select, Divider, Radio } from 'antd';

import { Helper } from '@/components/Helper';
import { SwitchLine } from '@/components/SwitchLine';
import styles from './index.module.less';

interface FormattrProps {}
const Option = Select.Option;
const Group = Radio.Group;

export const Formattr = function(props: FormattrProps) {
  return (
    <div className={styles.content}>
      <div className={styles.headerbar}>
        <span>
          不可见字段赋值{' '}
          <Helper text="根据业务需要，设置不可见字段值的处理方式" />
        </span>
      </div>
      <Select style={{ width: '100%' }}>
        <Option key="1" value="1">
          保持原值
        </Option>
        <Option key="2" value="2">
          空值
        </Option>
      </Select>
      <Divider />
      <SwitchLine
        label={
          <span>
            表单前台缓存{' '}
            <Helper text="进入表单时，自动加载上次填写未提交的内容。基于浏览器缓存，无法跨设备读取。" />
          </span>
        }
        checked={false}
        onChange={v => console.log(v)}
      />
      <Divider />
      <SwitchLine
        label={<span>多标签显示</span>}
        checked={false}
        onChange={v => console.log(v)}
      />
      <Divider />
      <div className={styles.headerbar}>
        <span>电脑端表单布局</span>
      </div>
      <Group>
        <Radio>单列</Radio>
        <Radio>双列</Radio>
      </Group>
      <Divider />
      <div className={styles.headerbar}>
        <span>移动端表单布局</span>
      </div>
      <Group>
        <Radio>标准</Radio>
        <Radio>紧凑</Radio>
      </Group>
    </div>
  );
};
