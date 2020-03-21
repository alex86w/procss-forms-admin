import * as React from 'react';
import { Table, Row, Col, Tree, Dropdown, Menu, Button, message } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'umi';
import { ConnectFC } from './ConnectFC';
import { DownOutlined } from '@ant-design/icons';
import DeptModal, { UserAdd } from './component/DeptModal';
import { TableRowSelection } from 'antd/lib/table/interface';

type visitype = 'create' | 'modify' | 'addUser' | null;
const { TreeNode } = Tree;
const { Item: MenuItem } = Menu;

const renderTree = (
  list: any[],
  menu: any,
  $record: (v: any) => void,
  subMenu: any,
  hasParent?: boolean,
) => {
  return list.map(node => (
    <TreeNode
      title={
        <div>
          {node.name}
          <Dropdown trigger={['click']} overlay={hasParent ? subMenu : menu}>
            <a
              style={{ marginLeft: 10 }}
              onClick={e => {
                e.stopPropagation();
                $record(node);
              }}
            >
              ...
            </a>
          </Dropdown>
        </div>
      }
      key={node.id}
    >
      {node.children &&
        node.children.length > 0 &&
        renderTree(node.children, menu, $record, subMenu, true)}
    </TreeNode>
  ));
};
const Dept = function(props: any) {
  const [visitype, $visitype] = React.useState<visitype>(null);
  const [record, $record] = React.useState<any>({});
  const [openkey, $openkey] = React.useState<string[]>([]);
  const [selected, $selected] = React.useState<any[]>([]);
  const [visible, $visible] = React.useState<boolean>(false);
  const { dispatch, list, userList, allUsers } = props;
  const columns: ColumnProps<any>[] = [
    { dataIndex: 'name', key: 'name', title: '名称' },
    { dataIndex: 'mobile', key: 'mobile', title: '手机' },
    { dataIndex: 'eMail', key: 'eMail', title: '邮箱' },
    { dataIndex: 'role', key: 'role', title: '角色' },
  ];
  const treeData = [
    { title: '123', key: '0' },
    { title: '1234', key: '12' },
  ];
  const menu = (
    <Menu>
      <MenuItem>
        <a
          onClick={e => {
            e.stopPropagation();
            $visitype('create');
          }}
        >
          新建子部门
        </a>
      </MenuItem>
      <MenuItem>
        <a
          onClick={e => {
            e.stopPropagation();
            $visitype('modify');
          }}
        >
          修改名称
        </a>
      </MenuItem>
    </Menu>
  );
  const subMenu = (
    <Menu>
      <MenuItem>
        <a
          onClick={e => {
            e.stopPropagation();
            $visitype('create');
          }}
        >
          新建子部门
        </a>
      </MenuItem>
      <MenuItem>
        <a
          onClick={e => {
            e.stopPropagation();
            $visitype('modify');
          }}
        >
          修改名称
        </a>
      </MenuItem>
      <MenuItem>
        <a
          onClick={e => {
            e.stopPropagation();
            dispatch({ type: 'dept/remove', payload: record.id });
          }}
        >
          删除
        </a>
      </MenuItem>
    </Menu>
  );
  const treeModalProps = {
    visitype,
    $visitype,
    record,
    dispatch,
  };
  const rowSelection: TableRowSelection<any> = {
    onChange: (selectedRowKeys, selectedRows) => {
      $selected(selectedRows);
    },
  };

  return (
    <>
      <Row>
        <Col span={2} />
        <Col span={20}>
          <div
            style={{
              border: '1px solid transparent',
              height: '600px',
              background: 'white',
              padding: 10,
            }}
          >
            <Row>
              <Col span={8}>
                <div style={{ width: '100%', padding: '20px' }}>
                  <div
                    style={{
                      fontSize: 15,
                      width: '100%',
                      padding: '10px',
                      background: 'rgba(0,0,0,.01)',
                    }}
                  >
                    <span>部门管理</span>
                  </div>
                  <Tree
                    switcherIcon={<DownOutlined />}
                    showIcon={false}
                    onSelect={(key, e) => {
                      dispatch({
                        type: 'dept/queryUsers',
                        payload: { deptId: e.node.key },
                      });
                      $record({ id: e.node.key });
                    }}
                    showLine
                    onExpand={node => $openkey(node as string[])}
                    expandedKeys={openkey}
                  >
                    {renderTree(list, menu, $record, subMenu)}
                  </Tree>
                </div>
              </Col>
              <Col span={16} style={{ paddingTop: '20px' }}>
                <Row>
                  <Button
                    onClick={() => {
                      record.id
                        ? $visible(true)
                        : message.error('请选择部门！');
                    }}
                  >
                    添加人员
                  </Button>
                  &nbsp;&nbsp;
                  {/* <Button>调整部门</Button>
                  &nbsp;&nbsp; */}
                  <Button
                    onClick={() => {
                      if (selected.length === 0)
                        return message.error('没有选择用户！');
                      const ids: string[] = selected.map(it => it.id);
                      dispatch({
                        type: 'dept/removeUsers',
                        payload: ids,
                        record,
                      });
                    }}
                  >
                    批量删除
                  </Button>
                </Row>
                <Table
                  columns={columns}
                  bordered
                  dataSource={userList}
                  style={{ marginTop: '10px' }}
                  rowKey={it => it.id}
                  rowSelection={rowSelection}
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={2} />
      </Row>
      <DeptModal {...treeModalProps} />
      <UserAdd
        visible={visible}
        source={allUsers}
        target={userList}
        $visible={$visible}
        record={record}
        dispatch={dispatch}
      />
    </>
  );
};

const ConnectDept = connect(({ dept, loading }: any) => ({ ...dept, loading }))(
  Dept,
) as ConnectFC;
ConnectDept.title = '部门管理';
ConnectDept.icon = 'usergroupAdd';
ConnectDept.sort = 4;

export default ConnectDept;
