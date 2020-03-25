import styles from './index.less';
import { DatePicker, Input, Select, Divider } from 'antd';
import React, { useContext } from 'react';
import moment from 'moment';
import DefaultDetail from './DefaultDetail';
import LangContext from '../../util/context';

const UserTaskDetail = ({
  model,
  users,
  groups,
  onChange,
  readOnly = false,
  flowModel,
  formItems
}) => {
  const { i18n } = useContext(LangContext);
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
          <div className={styles.headerbar}>
            {i18n['userTask.assignType']}：
          </div>
          <Select
            style={{ width: '100%', fontSize: 12 }}
            placeholder={i18n['userTask.assignType.placeholder']}
            defaultValue={'person'}
            value={model.assignType}
            onChange={e => {
              onChange('assignType', e);

              onChange(e === 'person' ? 'assignPerson' : 'assignDept', []);


            }}
            disabled={readOnly}
          >
            <Select.Option key="person">
              {i18n['userTask.assignType.person']}
            </Select.Option>
            <Select.Option key="persongroup">
              {i18n['userTask.assignType.persongroup']}
            </Select.Option>
          </Select>
        </div>
        {model.assignType === 'person' && (
          <div className={styles.panelContent}>
            <div className={styles.headerbar}>{i18n['userTask.assignType.person.title']}：</div>
            <Select
              mode="multiple"
              showSearch
              style={{ width: '100%', fontSize: 12 }}
              placeholder={i18n['userTask.assignType.person.placeholder']}
              optionFilterProp="children"
              defaultValue={model.assignPerson}
              onChange={e => onChange('assignPerson', e)}
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
        )}
        {model.assignType === 'persongroup' && (
          <div className={styles.panelContent}>
            <div className={styles.headerbar}>{i18n['userTask.assignType.persongroup.title']}：</div>
            <Select
              mode="multiple"
              showSearch
              style={{ width: '100%', fontSize: 12 }}
              placeholder={i18n['userTask.assignType.persongroup.placeholder']}
              optionFilterProp="children"
              defaultValue={model.assignDept}
              onChange={e => onChange('assignDept', e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              disabled={readOnly}
            >
              {groups &&
                groups.map(group => (
                  <Select.Option key={group.id}>{group.name}</Select.Option>
                ))}
            </Select>
          </div>
        )}

        <div className={styles.panelContent}>
          <div className={styles.headerbar}>{i18n['userTask.dueDate']}：</div>
          <DatePicker
            defaultValue={model.dueDate ? moment(model.dueDate) : null}
            disabled={readOnly}
            placeholder={i18n['userTask.dueDate.placeholder']}
            showTime
            style={{ width: '100%', minWidth: null }}
            onChange={(value, dateString) => onChange('dueDate', value)}
          />
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

export default UserTaskDetail;
