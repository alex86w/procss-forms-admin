import { Input, Select, Checkbox, Row } from 'antd';
import React, { useContext, useReducer } from 'react';
import LangContext from '../../util/context';
import { CustomCheckBox } from '@/components/checkbox';
import { ButtonTabs, TraditionTabs } from '@/components/Tabs';
import { SwitchLine } from '@/components/SwitchLine';
import { Helper } from '@/components/Helper';
import styles from './index.less';

const { Option } = Select;

//等于 不等于 包含 不包含  为空 不为空 范围;



export const startNode = [
  'node:operation',
  'submit',
  'submitWithPrint',
  'endable'
]
export const viewNode = [
  'node:view',
  'suggest',
  'handWritten',
  'node:operation',
  'submit',
  'submitWithPrint',
  'refuse',
  'forward',
  'endable',
  'bluksubmit',
  // 'node:validation',
  'flow:rule',
]


const DrawRow = ({ array, onChange, model }) => {
  return array.map(arr => {
    switch (arr) {
      case 'node:operation':
        return <Row key={arr}><span className={styles.title}>节点操作</span></Row>;
      case 'submit':
        return <Row key={arr}><SwitchLine label="提交" onChange={v => onChange('submit', v)} checked={model.submit || false} /></Row>;
      case 'submitWithPrint':
        return <Row key={arr}><SwitchLine label="提交并打印" onChange={v => onChange('submitWithPrint', v)} checked={model.submitWithPrint || false} /></Row>;
      case 'node:view':
        return <Row key={arr}><span className={styles.title}>审批意见</span></Row>;
      case 'suggest':
        return <Row key={arr}><SwitchLine label="文本意见" onChange={v => onChange('suggest', v)} checked={model.suggest || false} /></Row>;
      case 'handWritten':
        return <Row key={arr}><SwitchLine label="手写签名" onChange={v => onChange('handWritten', v)} checked={model.handWritten || false} /></Row>;
      case 'refuse':
        return <Row key={arr}><SwitchLine label="回退" onChange={v => onChange('refuse', v)} checked={model.refuse || false} /></Row>;
      case 'forward':
        return <Row key={arr}><SwitchLine label="转交" onChange={v => onChange('forward', v)} checked={model.forward || false} /></Row>;
      case 'endable':
        return <Row key={arr}><SwitchLine label="结束流程" onChange={v => onChange('endable', v)} checked={model.endable || false} /></Row>;
      case 'bluksubmit':
        return <Row key={arr}><SwitchLine label="批量提交" onChange={v => onChange('bluksubmit', v)} checked={model.bluksubmit || false} /></Row>;
      case 'node:validation':
        return <Row key={arr}>
          <div className={styles.title}>节点校验条件</div>
          <Select style={{ width: "100%", margin: '10px 0' }}>
            <Option key=""></Option>
            <Option></Option>
          </Select>
        </Row>
      case 'flow:rule':
        return <Row key={arr}>
          <div className={styles.title}>流转规则</div>
          <Select style={{ width: "100%", margin: '10px 0' }}>
            <Option key="0" value="0">所有负责人提交后进入下一节点</Option>
            <Option key="1" value="1">任意负责人提交后进入下一节点</Option>
          </Select>
        </Row>

    }

  })

}
const EndNode = (<div
  style={{
    width: "100%",
    margin: 8,
    padding: '10px 30px',
    background: "rgba(0,0,0,.03)",
    color: 'green'
  }}
>
  没有下级节点的节点会自动连接至流程结束；
  如果您需要在中途结束流程，
  请将需要结束流程的节点，
  连接到流程结束，
  并设置相应的流转条件。
</div>)

const primaryConditions = [

  { key: 'equal', label: '等于' },
  { key: 'notEqual', label: '不等于' },
  { key: 'null', label: '为空' },
  { key: 'notNull', label: '不为空' }
]
const secondPrimaryConditions = [
  ...primaryConditions,
  { key: 'include', label: '包含' },
  { key: 'exclude', label: '不包含' },
]
const thirdPrimaryConditions = [
  ...secondPrimaryConditions,
  { key: 'inRange', label: '范围中' },
  { key: 'outOfRange', label: '范围之外' }
]

/***
 * conditions [等于，不等于，包含，不包含，为空，不为空]
 * type='time'|'number' [范围]
 */
const DrawsConditions = function ({ conditions = [], model }) {
  console.log(conditions)
  return (
    <>
      {conditions.map(cond => {
        const item = JSON.parse(cond.value);

        switch (item.type) {
          case 'input':
            return <div key={cond.label + cond.key}>
              <Divider />
              <div style={{ width: '100%' }}>
                <div className={styles.condFont}>
                  <span>{cond.label} </span>{' '}
                  <Select size="small" placeholder="选择条件" onChange={v => onChange('conditionsrules', { ...cond, conditionsType: v, conditionsValue: '' })} >
                    {secondPrimaryConditions.map(opt => <Select.Option key={opt.key} value={opt.key}>{opt.label}</Select.Option>)}
                  </Select>
                </div>
                <Input style={{ width: '100%' }} />
              </div>
            </div>
          case 'select':
            return <div key={cond.label + cond.key}>
              <Divider />
              <div style={{ width: '100%' }}>
                <div className={styles.condFont}>
                  <span>{cond.label} </span>{' '}
                  <Select size="small" placeholder="选择条件" onChange={v => onChange('conditionsrules', { ...cond, conditionsType: v, conditionsValue: '' })} >
                    {primaryConditions.map(opt => <Select.Option key={opt.key} value={opt.key}>{opt.label}</Select.Option>)}
                  </Select>
                </div>
                <Select>
                </Select>
              </div>
            </div>

          default:
            return <div key={cond.label} />
        }

      }

      )}
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

const reducer = function (store, action) {
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
  { key: 'userName', label: '用户名', type: 'input' },
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

      <div className={styles.panelRow} style={{ marginTop: 15 }}>
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
          morePaneComponent={
            model.clazz === 'receiveTask' ? <div /> : <DrawRow array={model.clazz === "start" ? startNode : viewNode} onChange={onChange} model={model} />
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
                <Option key={item.key} value={JSON.stringify(item)}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </>
        )}
        <DrawsConditions conditions={store.conditions} onChange={onChange} model={model} />
      </div>
    </>
  );
  return (
    <div className={styles.panelContent}>

      <TraditionTabs
        components={[
          {
            key: model.clazz === 'flow' ? '线段属性' : '节点属性',
            component: model.clazz === 'flow' ? EdgeFlowPane : model.clazz === 'end' ? EndNode : NodePane,
          },
          { key: '流程属性', component: FlowPane },
        ]}
      />
    </div>
  );
};

export default DefaultDetail;
