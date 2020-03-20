import * as React from 'react';
import { Table, Row, Col, Tree, Dropdown, Menu } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'umi';
import { ConnectFC } from './ConnectFC';
import { Visitype } from './user';
import { DownOutlined } from '@ant-design/icons';
const { TreeNode } = Tree;
const { Item: MenuItem } = Menu;

const Dept = function(props: any) {
  const [visitype, $visitype] = React.useState<Visitype>(null);
  const [record, $record] = React.useState<any>({});
  const [openkey, $openkey] = React.useState<string[]>([]);
  const { dispatch, list } = props;
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
  const modalProps = { visitype, $visitype, record, dispatch };
  const menu = (
    <Menu>
      <MenuItem>
        <a>新建子部门</a>
      </MenuItem>
      <MenuItem>
        <a>修改名称</a>
      </MenuItem>
      <MenuItem>
        <a>删除</a>
      </MenuItem>
    </Menu>
  );
  const renderTree = (list: any[]) => {
    return list.map(node => (
      <TreeNode
        title={
          <div>
            {node.name}
            {'  '}
            <Dropdown trigger={['click']} overlay={menu}>
              <a>...</a>
            </Dropdown>
          </div>
        }
        key={node.id}
      >
        {node.children && node.children.length > 0 && renderTree(node.children)}
      </TreeNode>
    ));
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
                    onSelect={(key, info) => {
                      $record(info);
                    }}
                    showLine
                    onExpand={node => $openkey(node as string[])}
                    expandedKeys={openkey}
                  >
                    {renderTree(list)}
                  </Tree>
                </div>
              </Col>
              <Col span={16} style={{ paddingTop: '20px' }}>
                <Table columns={columns} bordered />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={2} />
      </Row>
    </>
  );
};

const ConnectDept = connect(({ dept, loading }: any) => ({ ...dept, loading }))(
  Dept,
) as ConnectFC;
ConnectDept.title = '部门管理';
ConnectDept.icon = 'usergroupAdd';

export default ConnectDept;
