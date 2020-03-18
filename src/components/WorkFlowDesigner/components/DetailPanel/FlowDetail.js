import styles from './index.less';
import React from 'react';

const FlowDetail = ({ model, onChange, readOnly = false }) => {
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelBody}>
        <div className={styles.panelRow}></div>
        <div className={styles.panelRow}></div>
        <div className={styles.panelRow}></div>
      </div>
    </div>
  );
};

export default FlowDetail;
