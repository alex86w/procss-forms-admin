import styles from './index.less';
import React from 'react';
import DefaultDetail from './DefaultDetail';

const FlowDetail = ({ model, onChange, readOnly = false, flowModel }) => {
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelBody}>
        <DefaultDetail
          type="flow"
          model={model}
          onChange={onChange}
          readOnly={readOnly}
          flowModel={flowModel}
        />
      </div>
    </div>
  );
};

export default FlowDetail;
