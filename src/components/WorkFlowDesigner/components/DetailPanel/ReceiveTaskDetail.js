import styles from './index.less';
import React, { useContext } from 'react';
import DefaultDetail from './DefaultDetail';
import LangContext from '../../util/context';
import { Select, Input,Divider } from "antd";

const ReceiveTaskDetail = ({
  model,
  onChange,
  readOnly = false,
  flowModel,
  formItems,
  users
}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['receiveTask'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelBody}>

        <div className={styles.panelContent}>
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
          <div className={styles.headerbar}>{i18n['userTask.assignType.person.title']}：</div>
          <Select
            mode="multiple"
            showSearch
            style={{ width: '100%', fontSize: 12 }}
            placeholder={i18n['userTask.assignType.person.placeholder']}
            optionFilterProp="children"
            defaultValue={model.assignValue}
            onChange={e => onChange('assignValue', e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            disabled={readOnly}
          >
            {users &&
              users.map(user => (
                <Select.Option key={user.id}>{user.name}</Select.Option>
              ))}
          </Select>
        </div>
        <DefaultDetail
          model={model}
          onChange={onChange}
          readOnly={readOnly}
          flowModel={flowModel}
          formItems={formItems}
        />

      </div>
    </div>
  );
};

export default ReceiveTaskDetail;
