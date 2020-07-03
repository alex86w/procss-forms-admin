//@ts-nocheck
import * as React from 'react';
import { Input, Select, Divider, Radio, Button } from 'antd';

import { Helper } from '@/components/Helper';
import { SwitchLine } from '@/components/SwitchLine';
import styles from './index.module.less';
import { useModel } from 'umi';
import { DeleteOutlined, FileAddOutlined, PushpinOutlined, PlusOutlined } from '@ant-design/icons';
import { generate } from 'shortid'
import { FormTabs } from '@/services/interface/forms.interface';
interface FormattrProps {
  // attr: {
  //   unviewtext?: string;
  //   fontcache?: boolean;
  //   multiTag?: boolean;
  //   pclayout?: string;
  //   mobilelayout?: string;
  // };
  // $attr: (s: any) => void;
}
const Option = Select.Option;
const Group = Radio.Group;

export const Formattr = function (props: FormattrProps) {

  const { updaFomrs, forms, addTabs, deleteTabs, updateTabsTab } = useModel('forms');

  function generTabs(num: number) {
    const array: Array<FormTabs> = [];
    for (let i = 0; i < num; i++) {
      array.push({ tabId: `tab_${generate()}`, title: `标签${i + 1}` })
    }
    return num === 1 ? array[0] : array;
  }

  return (
    <div className={styles.content}>
      <div className={styles.headerbar}>
        <span>
          不可见字段赋值{' '}
          <Helper text="根据业务需要，设置不可见字段值的处理方式" />
        </span>
      </div>
      <Select
        style={{ width: '100%' }}
      // onChange={v => $attr({ ...attr, unviewtext: v })}
      // value={attr.unviewtext || '1'}
      >
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
            业务前台缓存{' '}
            <Helper text="进入业务时，自动加载上次填写未提交的内容。基于浏览器缓存，无法跨设备读取。" />
          </span>
        }
        checked={false}
        onChange={v =>console.log(v)}
      />
      <Divider />
      <SwitchLine
        label={<span>多标签显示</span>}
        checked={forms.tabs && forms.tabs.length > 0 || false}
        onChange={v => v ? updaFomrs('tabs', generTabs(2)) : updaFomrs('tabs', [])}
      />
      <SwitchLine
        label={<span>启用二维码</span>}
        checked={forms.qrCode}
        onChange={v => updaFomrs('qrCode', v)}
      />
      <SwitchLine
        label={<span>是否允许退回</span>}
        checked={forms.cancelAble}
        onChange={v => updaFomrs('cancelAble', v)}

      />
      <SwitchLine
        label={<span>启用盘点功能</span>}
        checked={forms.assetsFrom}
        onChange={v => updaFomrs('assetsFrom', v)}

      />
      {forms.tabs && forms.tabs.length > 0 && < div >
        <Input.Group>
          {forms.tabs?.map((it, index) => <Input onChange={e => updateTabsTab(e.target.value, index)} key={`g_${index}`} style={{ marginTop: 5 }} addonAfter={<DeleteOutlined onClick={() => deleteTabs(index)} />} value={it.title} />)}
        </Input.Group>
        <Button type='link' style={{ paddingLeft: 0 }} onClick={() => addTabs(generTabs(1))} icon={<PlusOutlined />}>添加标签</Button>
      </div>}
      < Divider />
      {/* <div className={styles.headerbar}>
        <span>电脑端业务布局</span>
      </div>
      <Group
        value={attr.pclayout || '1'}
        onChange={e => $attr({ ...attr, pclayout: e.target.value })}
      >
        <Radio key="1" value="1">
          单列
        </Radio>
        <Radio key="2" value="2">
          双列
        </Radio>
      </Group>
      <Divider />
      <div className={styles.headerbar}>
        <span>移动端业务布局</span>
      </div>
      <Group
        value={attr.mobilelayout || '1'}
        onChange={e => $attr({ ...attr, mobilelayout: e.target.value })}
      >
        <Radio key="1" value="1">
          标准
        </Radio>
        <Radio key="2" value="2">
          紧凑
        </Radio>
      </Group> */}
    </div >
  );
};
