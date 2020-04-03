import { Select, Checkbox } from 'antd';
import React, { useContext, useReducer, useEffect } from 'react';
import LangContext from '../../util/context';
import { CustomCheckBox } from '@/components/checkbox';
import { ButtonTabs, TraditionTabs } from '@/components/Tabs';
import { SwitchLine } from '@/components/SwitchLine';
import { Helper } from '@/components/Helper';
import styles from './index.less';
import { cloneDeep } from 'lodash'
import { DrawRow, startNode, viewNode } from './startNode';
import { DrawsConditions } from './primaryConditions';

const { Option } = Select;

//等于 不等于 包含 不包含  为空 不为空 范围;

const fieldsExp = new RegExp('checks|singText|mutileText|inputDate|numberText|selectCheck|radios|select');

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

export const Divider = () => (
  <div
    style={{
      width: '100%',
      margin: '15px 0',
      height: '1px',
      background: 'rgba(0,0,0,.1)',
    }}
  />
);
const exa = new RegExp('reset|update|conditionsrules');



const storecfg = {
  conditiontype: null, // custom,else,null;
  conditions: [],
};



const DefaultDetail = ({
  model,
  onChange,
  readOnly = false,
  type,
  flowModel,
  formItems
}) => {



  const reducer = function (store, action) {
    let cache;

    if (action.type === 'reset') {
      cache = action.payload;
      return cache;
    }
    if (action.type === 'conditionsrules') {
      if (store.conditions) {
        const index = store.conditions.findIndex(it => it.itemId === ((action.payload || {}).itemId));
        const conditions = cloneDeep(store.conditions);
        if (index >= 0) {
          const temp = Object.assign(conditions[index], action.payload);
          conditions.splice(index, 1, temp)
          cache = { ...store, conditions };
        } else {
          conditions.push(action.payload)
          cache = { ...store, conditions };
        }
      } else {
        cache = { ...store, conditions: [action.payload] }
      }
      onChange && onChange('flow', cache);
      return cache;
    }
    if (action.type === 'conditions') {
      const preState = store.conditions;
      const curPayload = action.payload;
      cache = { ...store, conditions: [] }
      if (Array.isArray(preState) && curPayload) {
        curPayload.reduce((_, cur) => {
          const pre = preState.find(it => it.itemId === cur.itemId);
          if (pre) {
            cache.conditions.push(pre)
          } else {
            cache.conditions.push(cur)
          }
        }, 0)
      };
      onChange && onChange('flow', cache);
      return cache
    }
    cache = { ...store, [action.type]: action.payload };
    onChange && onChange('flow', cache);
    return cache;
  };



  const [store, dispatch] = useReducer(reducer, storecfg);
  useEffect(() => {
    if (model.clazz === 'flow') {
      if (model.flow) {
        dispatch({ type: 'reset', payload: model.flow })
      }
    }
  }, [model.id])
  const { i18n } = useContext(LangContext);
  const NodePane = (
    <>

      <div className={styles.panelRow} style={{ marginTop: 15 }}>
        <ButtonTabs
          basePaneComponet={
            <CustomCheckBox
              data={(formItems || []).filter(it => it.type !== 'divider')}
              title={model.clazz === 'receiveTask' ? ['brief', 'visible'] : ['brief', 'editable', 'visible']}
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
            始终通过
          </Option>
        </Select>
      </div>
    </>
  );
  const flow = model.flow || {};
  const EdgeFlowPane = (
    <>
      <div className={styles.panelRow}>
        <div className={styles.headerbar}>数据流转条件</div>
        <Select
          style={{ width: '100%' }}
          value={flow.conditiontype}
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
          <Option value="undefined" key={'undefined'}>不启用</Option>
        </Select>
        {flow.conditiontype === 'custom' && (
          <>
            <Divider />
            <Select
              mode="multiple"
              placeholder="添加流转条件"
              value={flow.conditions}
              labelInValue
              onChange={v =>
                dispatch({
                  onChange, model, type: 'conditions', payload: v.map(item => {
                    let payload = formItems.find(it => it.id === item.value ) || {};
                    return {
                      itemId: payload.id,
                      title: payload.title,
                      type: payload.type,
                      value: item.value,
                      list: payload.items,
                      conditionsRule: item.conditionsRule,
                      conditionsValue: item.conditionsValue
                    }
                  })
                })
              }
              style={{ width: '100%' }}
            >
              {formItems.filter(it => fieldsExp.test(it.type)).map(item => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
            <DrawsConditions conditions={flow.conditions} dispatch={dispatch} model={model} formItems={formItems} />
          </>
        )}
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
