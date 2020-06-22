import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import styles from './index.module.less';
const Group = Checkbox.Group;
export const titleType = {
  visible: 'visible',
  editable: 'editable',
  brief: 'brief',
};
export type Ttype = keyof typeof titleType;
export interface CheckProps {
  onChange: (e: CheckboxValueType[]) => void;
  title: Ttype[];
  style?: React.CSSProperties;
  data: Array<any>;
  model: any;
  keyr: string;
}
const handleChange = function ({ model, keyr, value, onChange }: any) {
  const editable = (model[keyr] || []).filter((it: string) => it.includes('editable'));
  const visible = (model[keyr] || []).filter((it: string) => it.includes('visible'));
  const brief = (model[keyr] || []).filter((it: string) => it.includes('brief'));
  let _editable: string[] = value.filter((it: string) => it.includes('editable'));
  const _visible: string[] = value.filter((it: string) => it.includes('visible'));
  let _brief: string[] = value.filter((it: string) => it.includes('brief'));
  const editableAdd = _editable.filter(it => !editable.includes(it));
  const visibleRemove: string[] = visible.filter((it: string) => !_visible.includes(it));
  if (editableAdd.length > 0) {
    editableAdd.forEach(it => _visible.push(it.split(':')[0] + ':visible'));
  }
  if (visibleRemove.length > 0) {
    visibleRemove.forEach(item => {
      _editable = _editable.filter(it => !it.includes(item.split(':')[0]));
    });
  }
  if (brief.length === 3 && _brief.length > 3) {
    _brief = brief as string[];
  }
  const _value = [..._brief, ..._visible, ..._editable];
  onChange && onChange(_value);
};
const checkedAll = function (type: string, checked: boolean) {
};
export const CustomCheckBox = function (props: CheckProps) {
  const { onChange, title, style, data, model, keyr } = props;
  const len = title.length;
  const span = 24 / (len + 1);
  return (<div style={style}>
    <div className={styles.headerbar}>字段权限控制</div>
    <Group style={{ width: '100%' }} onChange={value => handleChange({ model, keyr, value, onChange })} value={model[keyr] || []}>
      <Row>
        <Col span={span} className={styles.colspan} />
        {title.map(one => (<Col span={span} key={one} className={styles.colspan}>
          {one === 'brief' ? '简报' : one === 'editable' ? '可编辑' : one === 'visible' ? '可见' : ''}
        </Col>))}
        <div />
        {title.map(one => (<Col span={span} key={one}>
          {one === 'brief' ? <div /> : <Checkbox key={`checkedAll:${one}`} value={`checkedAll:${one}`}></Checkbox>}
        </Col>))}
        {data.map(({ id, title: label }: any) => (<Row key={id} style={{ width: '100%', marginTop: '12px' }}>
          <Col span={span} style={{ paddingLeft: 5 }}>
            {label}
          </Col>
          {title.map((one, index) => (<Col span={span} key={`${id}:${one}`}>
            <Checkbox value={`${id}:${one}`}></Checkbox>
          </Col>))}
        </Row>))}
      </Row>
    </Group>
  </div>);
};
