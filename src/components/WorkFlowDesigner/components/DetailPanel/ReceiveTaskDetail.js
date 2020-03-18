import styles from './index.less';
import { Input } from 'antd';
import React, { useContext } from 'react';
import DefaultDetail from './DefaultDetail';
import LangContext from '../../util/context';

const ReceiveTaskDetail = ({
  model,
  onChange,
  readOnly = false,
  flowModel,
}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['receiveTask'];
  return (
    <div data-clazz={model.clazz}>
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

export default ReceiveTaskDetail;
