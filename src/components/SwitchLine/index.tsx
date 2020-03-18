import React, { ReactElement } from 'react';
import { Switch } from 'antd';

import styles from './index.module.less';

interface SwitchLineProps {
  onChange: (v: boolean) => void;
  checked: boolean;
  label: ReactElement;
}

export const SwitchLine = function(props: SwitchLineProps) {
  const { checked, onChange, label } = props;

  return (
    <div className={styles.line}>
      <div className={styles.label}>
        <span>{label}</span>
        <div className={styles.action}>
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            checked={checked}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};
