import React, { useState, useEffect } from 'react';
import { Modal, Input, Row, Col, Transfer } from 'antd';
import './index.less';

const DeptModal = function(props: any) {
  const [state, $state] = useState<string | undefined>();
  const { visitype, $visitype, record, dispatch } = props;
  useEffect(() => {
    if (visitype === 'modify') {
      $state(record.name);
    } else {
      $state('');
    }
  }, [record.name]);

  return (
    <Modal
      style={{ width: '40%' }}
      visible={!!visitype}
      onCancel={() => $visitype(null)}
      onOk={() => {
        const payload =
          visitype === 'create'
            ? { name: state, parentId: record.id }
            : { ...record, name: state };
        dispatch({
          type: `dept/${visitype}`,
          payload,
          callback: (success: boolean) => success && $visitype(null),
        });
      }}
    >
      <Row>
        <Col span={4}>
          <span>部门名称 ：</span>{' '}
        </Col>
        <Col span={18}>
          <Input onChange={e => $state(e.target.value)} value={state} />
        </Col>
      </Row>
    </Modal>
  );
};

export default DeptModal;

export const UserAdd = function(props: any) {
  const [selects, $selects] = useState<string[]>([]);
  const [targets, $targets] = useState<string[]>([]);

  const { visible, source, target, $visible, record, dispatch } = props;
  useEffect(() => {
    const _target = (target || []).map((it: any) => it.id);
    $targets(_target);
  }, [target]);

  return (
    <Modal
      visible={visible}
      width="55%"
      title="添加人员"
      onCancel={() => {
        $selects([]);
        $targets([]);
        $visible(false);
      }}
      onOk={() => {
        dispatch({
          type: 'dept/addUsers',
          payload: { userIds: targets, targetDeptIds: record.id },
          callback: (success: boolean) => {
            if (success) {
              $selects([]);
              $targets([]);
              $visible(false);
            }
          },
        });
      }}
    >
      <Transfer
        dataSource={source.map((it: any) => ({ ...it, key: it.id }))}
        titles={['用户列表', '部门成员']}
        onSelectChange={(selected, targets) =>
          $selects([...selected, ...targets])
        }
        onChange={e => $targets(e)}
        targetKeys={targets}
        selectedKeys={selects}
        render={item => <span>{item.name}</span>}
      />
    </Modal>
  );
};
