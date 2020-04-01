import React, { forwardRef } from 'react';
import UserTaskDetail from './UserTaskDetail';
import ReceiveTaskDetail from './ReceiveTaskDetail';
import FlowDetail from './FlowDetail';
import StartEventDetail from './StartEventDetail';
import EndEventDetail from './EndEventDetail';
import 'antd/lib/input/style';
import 'antd/lib/select/style';
import 'antd/lib/switch/style';
import styles from './index.less';

const DetailPanel = forwardRef(
  (
    {
      height,
      model,
      users,
      groups,
      messageDefs,
      signalDefs,
      onChange,
      readOnly = false,
      flowModel,
      formItems,
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={styles.detailPanel} style={{ height: 600, overflow: 'scroll' }}>
        {model.clazz === 'userTask' && (
          <UserTaskDetail
            model={model}
            onChange={onChange}
            readOnly={readOnly}
            users={users}
            groups={groups}
            formItems={formItems}
            flowModel={flowModel}
          />
        )}

        {model.clazz === 'receiveTask' && (
          <ReceiveTaskDetail
            model={model}
            onChange={onChange}
            readOnly={readOnly}
            flowModel={flowModel}
            formItems={formItems}
            users={users}
            groups={groups}
          />
        )}
        {model.clazz === 'flow' && (
          <FlowDetail
            model={model}
            onChange={onChange}
            readOnly={readOnly}
            flowModel={flowModel}
            formItems={formItems}
          />
        )}
        {model.clazz === 'start' && (
          <StartEventDetail
            model={model}
            onChange={onChange}
            readOnly={readOnly}
            formItems={formItems}
            flowModel={flowModel}
          />
        )}
        {model.clazz === 'end' && (
          <EndEventDetail
            model={model}
            onChange={onChange}
            readOnly={readOnly}
            formItems={formItems}
            flowModel={flowModel}
          />
        )}
      </div>
    );
  },
);

export default DetailPanel;
