import styles from './index.less';
import React, { useContext } from 'react';
import { Input } from 'antd'
import DefaultDetail from './DefaultDetail';
import LangContext from '../../util/context';


const StartEventDetail = ({ model, onChange, readOnly = false, flowModel,formItems }) => {
  const { i18n } = useContext(LangContext);
  return (
    <div data-clazz={model.clazz}>
      {/* <div className={styles.panelTitle}>{title}</div> */}
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

export default StartEventDetail;
