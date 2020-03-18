import { Input, Select, Checkbox } from 'antd';
import React, { useContext, useReducer } from 'react';
import LangContext from '../../util/context';
import { CustomCheckBox } from '@/components/checkbox';
import { ButtonTabs, TraditionTabs } from '@/components/Tabs';
import { SwitchLine } from '@/components/SwitchLine';
import { Helper } from '@/components/Helper';
import styles from './index.less';

const { Option } = Select;

const DrawsConditions = function({ conditions = [] }) {
  return (
    <>
      {conditions.map(cond => (
        <div key={cond.label + cond.key}>
          <Divider />
          <div style={{ width: '100%' }}>
            <div className={styles.condFont}>
              <span>{cond.label} </span>{' '}
              <Select size="small" placeholder="选择条件"></Select>
            </div>
            <Input style={{ width: '100%' }} />
          </div>
        </div>
      ))}
    </>
  );
};

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

const reducer = function(store, action) {
  let cache;
  const onChange = action.onChange;
  switch (action.type) {
    case 'reset':
      cache = action.payload;
    case 'update':
      cache = action.payload;
    default:
      cache = { ...store, [action.type]: action.payload };
  }
  onChange && onChange('flow', cache);
  return cache;
};

const storecfg = {
  cancelable: false,
  viewable: false,
  conditiontype: null, // custom,else,null;
  autosubmit: '0',
  conditions: [],
};

const fields = [
  { key: 'userName', label: '用户名', type: 'number' },
  { key: 'select', label: '单选', type: 'select' },
];

const DefaultDetail = ({
  model,
  onChange,
  readOnly = false,
  type,
  flowModel,
}) => {
  const [store, dispatch] = useReducer(reducer, storecfg);
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
        <Checkbox
          checked={flowModel.useWeChart || false}
          onChange={e =>
            onChange('flowModel', {
              ...flowModel,
              useWeChart: e.target.checked,
            })
          }
        >
          使用微信提醒节点负责人，抄送人{' '}
        </Checkbox>
        <Checkbox
          checked={flowModel.useEmail || false}
          onChange={e =>
            onChange('flowModel', { ...flowModel, useEmail: e.target.checked })
          }
          style={{ marginLeft: 0 }}
        >
          使用邮件提醒节点负责人，抄送人{' '}
        </Checkbox>
        <Divider />
        <SwitchLine
          checked={flowModel.cancelable || false}
          onChange={v => onChange('flowModel', { ...flowModel, cancelable: v })}
          label={
            <span>
              流程发起后允许撤回
              <Helper text="开启功能后，当后续节点负责人尚未处理时，发起人可撤回流程。" />
            </span>
          }
        />
        <Divider />
        <SwitchLine
          checked={flowModel.viewable || false}
          onChange={v => onChange('flowModel', { ...flowModel, viewable: v })}
          label={
            <span>
              允许查看流程日志和流转图
              <Helper text="开启功能后，节点负责人可以查看流程日志和流转图。" />
            </span>
          }
        />
        <Divider />
        <div className={styles.headerbar}>
          自动提交规则
          <Helper text="设置自动提交规则后，系统会帮助该流程内满足下述规则的负责人自动提交流程数据，无需人为操作。" />
        </div>
        <Select
          style={{ width: '100%' }}
          value={flowModel.autosubmit || ''}
          onChange={v => onChange('flowModel', { ...flowModel, autosubmit: v })}
        >
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
      </div>
    </>
  );
  const EdgeFlowPane = (
    <>
      <div className={styles.panelRow}>
        <div className={styles.headerbar}>数据流转条件</div>
        <Select
          style={{ width: '100%' }}
          value={store.conditiontype}
          onChange={v =>
            dispatch({ onChange, model, type: 'conditiontype', payload: v })
          }
        >
          <Option vlaue="custom" key={'custom'}>
            使用自定义流转条件
          </Option>
          <Option vlaue="else" key={'else'}>
            使用ELSE条件
          </Option>
        </Select>
        {store.conditiontype === 'custom' && (
          <>
            <Divider />
            <Select
              mode="multiple"
              placeholder="添加流转条件"
              value={store.conditions}
              labelInValue
              onChange={v =>
                dispatch({ onChange, model, type: 'conditions', payload: v })
              }
              style={{ width: '100%' }}
            >
              {fields.map(item => (
                <Option key={item.key} value={item.key}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </>
        )}
        <DrawsConditions conditions={store.conditions} />
      </div>
    </>
  );
  return (
    <div className={styles.panelContent}>
      <TraditionTabs
        components={[
          {
            key: type ? '线段属性' : '节点属性',
            component: type ? EdgeFlowPane : NodePane,
          },
          { key: '流程属性', component: FlowPane },
        ]}
      />
    </div>
  );
};

export default DefaultDetail;
