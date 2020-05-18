import styles from './index.less';
import { DatePicker, Input, Select, Divider, Switch, TreeSelect } from 'antd';
import React, { useContext } from 'react';
import moment from 'moment';
import DefaultDetail from './DefaultDetail';
import LangContext from '../../util/context';
import { MultipleSelectMode } from '../../../MultipleSelectMode';

const UserTaskDetail = ({
  model,
  users,
  groups,
  onChange,
  readOnly = false,
  flowModel,
  formItems,
  roleTree
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
         
        </div>
        

        <div className={styles.panelContent}>
          <div className={styles.headerbar}>{`审核人需要签到`}</div>
          <Switch onChange={e => onChange('onlyExtra', { sign: e })} size="large" checked={model.onlyExtra?.sign} />
        </div>
        <div className={styles.panelContent}>
          <div className={styles.headerbar}>{`审核人`}</div>
          <MultipleSelectMode value={model.selectMode || []} onChange={v => onChange('selectMode', v)} useDynamic/>
        </div>
        

        <div className={styles.panelContent}>
          <div className={styles.headerbar}>{i18n['userTask.dueDate']}：</div>
          <DatePicker
            defaultValue={model.dueDate ? moment(model.dueDate, 'YYYY-MM-DD HH:mm:ss') : null}
            disabled={readOnly}
            placeholder={i18n['userTask.dueDate.placeholder']}
            showTime
            style={{ width: '100%', minWidth: null }}
            onChange={(value, dateString) => onChange('dueDate', moment(value).format("YYYY-MM-DD HH:mm:ss"))}
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
