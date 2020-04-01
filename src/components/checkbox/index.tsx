import React, { useReducer, Fragment, useEffect } from 'react';
import { Checkbox, Col, Row } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import './index.module.less';

import styles from './index.module.less';
import { Action } from '@/pages/models/ModelBase';
const Group = Checkbox.Group;
export const titleType = {
  visible: 'visible',
  editable: 'editable',
  brief: 'brief',
};
const constant: { [key: string]: string } = {
  visible: '可见',
  editable: '可编辑',
  brief: '简报'
}
export type Ttype = keyof typeof titleType;
export interface CheckProps {
  onChange: (e: CheckboxValueType[]) => void;
  title: Ttype[];
  style?: React.CSSProperties;
  data: Array<any>;
  model: any;
  keyr: string;
}
function getValueByKey(state: any, str: string) {
  return state[str] || []
}

function handleChange(state: any, onChange: any, keyr: string) {
  const value: any[] = []
  const stateKeys = Object.keys(state);
  if (stateKeys.length > 0) {
    stateKeys.forEach(str => state[str].forEach((cc: any) => {
      value.push(str + ':' + cc)
    }))
  }
  onChange && onChange(value)
}

const reducer = (state: any, action: Action) => {
  if (action.type === 'init') {
    return action.payload
  }
  const stateKeys = Object.keys(state);
  const brief = stateKeys.filter(str => getValueByKey(state, str).includes('brief'))
  const briefLen = brief.length;
  if (action.type === 'checkedall') {
    if (action.payload === 'editable') {
      if (!stateKeys.every(str => getValueByKey(state, str).includes('editable'))) {
        // 全选editable
        stateKeys.map((str) => state[str] = (getValueByKey(state, str).includes('brief') ? ['editable', 'visible', 'brief'] : ['editable', 'visible']))
      } else {
        //反全选
        stateKeys.map((str) => {
          getValueByKey(state, str).includes('editable') ? state[str].splice(state[str].indexOf('editable'), 1) : state[str]
          return '';
        })
      }
    } else if (action.payload === 'visible') {
      if (!stateKeys.every(str => getValueByKey(state, str).includes('visible'))) {
        //全选 visible
        stateKeys.map((str) => {
          getValueByKey(state, str).includes('visible') ? state[str] : state[str].push('visible');
          return;
        })
      } else {
        //反全选
        stateKeys.map((str) => state[str] = getValueByKey(state, str).includes('brief') ? ['brief'] : []
        )
      }
    }
    handleChange(state, action.onChange, 'letter')
    return { ...state };
  } else {
    if (action.payload.includes('brief')) {
      if (!brief.includes(action.type) && briefLen >= 3) {
        action.payload.splice(action.payload.indexOf('brief'), 1)
      }
    }
    if (!action.payload.includes('visible') && (state[action.type] || []).includes('visible')) {
      action.payload = (state[action.type] || []).includes('brief') ? ['brief'] : []
    }
    if (action.payload.includes('editable') && !(state[action.type] || []).includes('editable')) {
      action.payload = (state[action.type] || []).includes('brief') ? ['brief', 'editable', 'visible'] : ['editable', 'visible']
    }
    handleChange({ ...state, [action.type]: action.payload }, action.onChange, 'letter')
    return { ...state, [action.type]: action.payload }
  }

}


export const CustomCheckBox = function (props: CheckProps) {
  const [state, dispatch] = useReducer(reducer, {})
  const { title, style, data, model, keyr, onChange } = props;
  const len = title.length;
  const span = 24 / (len + 1);
  useEffect(() => {
    if (Object.keys(state).length === 0) {
      if (!model[keyr]) {
        const obj: any = {};
        data.forEach(it => obj[it.id] = [])
        dispatch({
          type: 'init',
          payload: obj
        })
      } else {
        const obj: any = {};
        data.forEach(it => {
          obj[it.id] = [];
          (model[keyr] || []).map((item: string) => {
            if (item.includes(it.id)) {
              obj[it.id].push(item.split(':')[1])
            }
          })
        })
        dispatch({
          type: 'init',
          payload: obj
        })
      }
    }

  }, [data, model[keyr]])

  return (
    <div style={style}>
      <div className={styles.headerbar}>字段权限控制</div>
      <Row >
        <Col span={span} className={styles.colspan}></Col>
        {title.map(one => <Col span={span} className={styles.colspan} key={one}>{constant[one]}</Col>
        )}
        <Col span={span}> 全选</Col>
        {title.map(one => one === 'brief' ? <Col span={span} key={one} ><div /></Col> : <Col span={span} key={one} ><Checkbox onChange={e => dispatch({ type: "checkedall", payload: one, data, onChange })}
          checked={Object.keys(state).every(str => state[str].includes(one)) && (Object.keys(state).length > 0)} /></Col>
        )}
        {data.map(({ title: label, id }) => <Fragment key={id}>
          <Group onChange={v => dispatch({
            type: id,
            payload: v,
            data,
            onChange
          })} style={{ width: "100%", marginTop: 8 }} value={state[id]}>
            <Row>
              <Col span={span}><Row>{label}</Row></Col>
              {title.map(one => (<Col span={span} key={one + id}><Checkbox value={one} /></Col>))}
            </Row>
          </Group>
        </Fragment>
        )}
      </Row>
    </div >
  );
};
