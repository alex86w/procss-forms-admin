import styles from './index.less';
import React, { useContext } from 'react';
import DefaultDetail from './DefaultDetail';
import LangContext from '../../util/context';

const EndEventDetail = ({ model, onChange, readOnly = false, flowModel,formItems }) => {
  const { i18n } = useContext(LangContext);
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelBody}>
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

export default EndEventDetail;
