import styles from './index.less';
import React, { useContext } from 'react';
import DefaultDetail from './DefaultDetail';
import LangContext from '../../util/context';

const StartEventDetail = ({ model, onChange, readOnly = false, flowModel }) => {
  const { i18n } = useContext(LangContext);
  return (
    <div data-clazz={model.clazz}>
      {/* <div className={styles.panelTitle}>{title}</div> */}
      <div className={styles.panelBody}>
        <DefaultDetail
          model={model}
          onChange={onChange}
          readOnly={readOnly}
          flowModel={flowModel}
        />
      </div>
    </div>
  );
};

export default StartEventDetail;
