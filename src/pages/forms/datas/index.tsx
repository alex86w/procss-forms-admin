//@ts-nocheck
import React from 'react';
import { PageHeader, Button, Tabs, Table, Dropdown, Menu, Empty } from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
  CloudSyncOutlined,
  SettingOutlined,
  SwitcherOutlined,
  UserOutlined,
  DownOutlined,
  FormOutlined,
  PrinterOutlined,
  PaperClipOutlined,
  QrcodeOutlined,
  StopOutlined,
} from '@ant-design/icons';
import './index.less';
const { TabPane } = Tabs;

export default class DataManage extends React.Component {
  handleMenuBtnClick = () => {
    console.log('click');
  };
  render() {
    const data = [];
    const columns = [
      {
        title: 'Column 1',
        dataIndex: 'address',
        key: '1',
        width: 150,
      },
      {
        title: 'Column 2',
        dataIndex: 'address',
        key: '2',
        width: 150,
      },
      {
        title: 'Column 3',
        dataIndex: 'address',
        key: '3',
        width: 150,
      },
      {
        title: 'Column 4',
        dataIndex: 'address',
        key: '4',
        width: 150,
      },
      {
        title: 'Column 5',
        dataIndex: 'address',
        key: '5',
        width: 150,
      },
      {
        title: 'Column 6',
        dataIndex: 'address',
        key: '6',
        width: 150,
      },
      {
        title: 'Column 7',
        dataIndex: 'address',
        key: '7',
        width: 150,
      },
      { title: 'Column 8', dataIndex: 'address', key: '8', width: 150 },
      { title: 'Column 9', dataIndex: 'address', key: '9', width: 150 },
      { title: 'Column 10', dataIndex: 'address', key: '10', width: 150 },
      { title: 'Column 11', dataIndex: 'address', key: '11', width: 150 },
      { title: 'Column 12', dataIndex: 'address', key: '12', width: 150 },
      { title: 'Column 13', dataIndex: 'address', key: '13', width: 150 },
      { title: 'Column 14', dataIndex: 'address', key: '14', width: 150 },
      { title: 'Column 15', dataIndex: 'address', key: '15', width: 150 },
    ];
    const footBar =
      data.length === 0 ? (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={
            <span>
              暂无数据，你可以将表单发布给团队成员或公开发布来收集数据
            </span>
          }
        >
          <Button type="primary">立即发布</Button>
        </Empty>
      ) : (
          ''
        );
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Button
            onClick={this.handleMenuBtnClick}
            icon={<FormOutlined />}
            type="link"
          >
            批量修改
          </Button>
        </Menu.Item>
        <Menu.Item key="2">
          <Button
            onClick={this.handleMenuBtnClick}
            icon={<PrinterOutlined />}
            type="link"
          >
            批量打印
          </Button>
        </Menu.Item>
        <Menu.Item key="3">
          <Button
            onClick={this.handleMenuBtnClick}
            icon={<PaperClipOutlined />}
            type="link"
          >
            批量导出附件
          </Button>
        </Menu.Item>
        <Menu.Item key="4">
          <Button
            onClick={this.handleMenuBtnClick}
            icon={<QrcodeOutlined />}
            type="link"
          >
            批量打印二维码
          </Button>
        </Menu.Item>
        <Menu.Item key="5">
          <Button
            onClick={this.handleMenuBtnClick}
            icon={<UserOutlined />}
            type="link"
          >
            批量调整负责人
          </Button>
        </Menu.Item>
        <Menu.Item key="6">
          <Button
            onClick={this.handleMenuBtnClick}
            icon={<StopOutlined />}
            type="link"
          >
            批量结束流程
          </Button>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="extension">
        <div className="data-content">
          <div className="tool-bar">
            <Button type="primary" icon={<PlusOutlined />}>
              添加
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button icon={<DownloadOutlined />}>导入</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button icon={<UploadOutlined />}>导出</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Dropdown overlay={menu}>
              <Button icon={<SwitcherOutlined />}>
                批量操作
                <DownOutlined />
              </Button>
            </Dropdown>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button icon={<DeleteOutlined />}>删除</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button icon={<CloudSyncOutlined />}>数据回收站</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <Table
            columns={columns}
            bordered
            dataSource={data}
            scroll={{ x: true }}
          />
          {footBar}
        </div>
      </div>
    );
  }
}
