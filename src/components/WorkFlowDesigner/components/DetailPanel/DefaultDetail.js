import styles from './index.less';
import { Input, Radio, Select, Button, Checkbox } from 'antd';
import React, { useContext, useState } from 'react';
import LangContext from '../../util/context';
import { CustomCheckBox } from '@/components/checkbox';
import { ButtonTabs, TraditionTabs } from '@/components/Tabs';
import { SwitchLine } from '@/components/SwitchLine';
import { Helper } from '@/components/Helper';

const { Option } = Select;

const Divider = () => (
  <div
    style={{
      width: '100%',
      margin: '15px 0',
      height: '1px',
      background: 'rgba(0,0,0,.1)',
    }}
  />
);

const DefaultDetail = ({ model, onChange, readOnly = false }) => {
  const [state, $state] = useState({ cancelable: false, viewable: false });
  const { i18n } = useContext(LangContext);
  const NodePane = (
    <>
      <div className={styles.panelRow}>
        <div className={styles.headerbar}>{i18n['label']}</div>
        <Input
          style={{ width: '100%', fontSize: 12 }}
          value={model.label}
          onChange={e => onChange('label', e.target.value)}
          disabled={readOnly}
        />
      </div>
      <Divider />
      <div className={styles.panelRow}>
        <ButtonTabs
          basePaneComponet={
            <CustomCheckBox
              data={['ahaya', 'test']}
              title={['brief', 'editable', 'visible']}
              onChange={v => onChange('letter', v)}
              model={model}
              keyr="letter"
            />
          }
        />
      </div>
    </>
  );

  const FlowPane = (
    <>
      <div className={styles.panelRow}>
        <div className={styles.headerbar}>流程提醒</div>
        <Checkbox>使用微信提醒节点负责人，抄送人 </Checkbox>
        <Checkbox style={{ marginLeft: 0 }}>
          使用邮件提醒节点负责人，抄送人{' '}
        </Checkbox>
        <Divider />
        <SwitchLine
          checked={state.cancelable}
          label={
            <span>
              流程发起后允许撤回
              <Helper text="开启功能后，当后续节点负责人尚未处理时，发起人可撤回流程。" />
            </span>
          }
          onChange={v => $state({ ...state, cancelable: v })}
        />
        <Divider />
        <SwitchLine
          checked={state.viewable}
          label={
            <span>
              允许查看流程日志和流转图
              <Helper text="开启功能后，节点负责人可以查看流程日志和流转图。" />
            </span>
          }
          onChange={v => $state({ ...state, viewable: v })}
        />
        <Divider />
        <div className={styles.headerbar}>
          自动提交规则
          <Helper text="设置自动提交规则后，系统会帮助该流程内满足下述规则的负责人自动提交流程数据，无需人为操作。" />
        </div>
        <Select style={{ width: '100%' }}>
          <Option vlaue="1" key={1}>
            负责人与上一节点相同
          </Option>
          <Option vlaue="2" key={2}>
            负责人处理过该流程
          </Option>
          <Option value="0" key={3}>
            不启用
          </Option>
        </Select>
        <Divider />
        <div className={styles.headerbar}>版本管理</div>
        <Button style={{ width: '100%' }}>管理流程版本</Button>
      </div>
    </>
  );
  return (
    <div className={styles.panelContent}>
      <TraditionTabs
        components={[
          { key: '节点属性', component: NodePane },
          { key: '流程属性', component: FlowPane },
        ]}
      />
    </div>
  );
};

export default DefaultDetail;
