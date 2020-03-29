//@ts-nocheck
import React from 'react';
import {
  Button,
  Table,
  // Dropdown, 
  Menu,
  Empty,
  Modal
} from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  // DownloadOutlined,
  UploadOutlined,
  // CloudSyncOutlined,
  // SwitcherOutlined,
  UserOutlined,
  // DownOutlined,
  FormOutlined,
  PrinterOutlined,
  PaperClipOutlined,
  QrcodeOutlined,
  StopOutlined,
} from '@ant-design/icons';
import Publish from '../basic/publish'
import './index.less';
import { connect } from 'umi';

class DataManage extends React.Component {
  state = {
    visible: false
  }

  handleMenuBtnClick = () => {
    console.log('click');
  };

  render() {
    const { loading, col, data, queryParams, dispatch } = this.props
    const { visible } = this.state;


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
            {/* &nbsp;&nbsp;&nbsp;&nbsp;
            <Button icon={<DownloadOutlined />}>导入</Button>
            &nbsp;&nbsp;&nbsp;&nbsp; */}
            <Button icon={<UploadOutlined />}>导出</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {/* <Dropdown overlay={menu}>
              <Button icon={<SwitcherOutlined />}>
                批量操作
                <DownOutlined />
              </Button>
            </Dropdown>
            &nbsp;&nbsp;&nbsp;&nbsp; */}
            <Button icon={<DeleteOutlined />}>删除</Button>
            {/* &nbsp;&nbsp;&nbsp;&nbsp;
            <Button icon={<CloudSyncOutlined />}>数据回收站</Button>
            &nbsp;&nbsp;&nbsp;&nbsp; */}
          </div>
          <Table
            columns={col}
            bordered
            dataSource={data}
            scroll={{ x: true }}
            locale={{
              emptyText:
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 60 }}
                  description={
                    <span>
                      < span style={{ fontSize: 14, color: "#1890ff" }}>暂无数据</span>
                      <br />
                      <span>可以讲表单发不给团队成员或者公开发布来收集数据。</span>
                    </span>
                  } >
                  <Button type="primary" onClick={() => this.setState({ visible: true })}>立即发布</Button>
                </Empty>
            }}
            loading={loading[`formData/query`]}
            pagination={{
              total: queryParams.count,
              pageSize: queryParams.size,
              current: queryParams.page + 1,
              onChange: v => dispatch({
                type: "formData/query",
                payload: { page: v - 1 }
              })
            }}
          />
          <Modal visible={visible}
            destroyOnClose
            onCancel={() => this.setState({ visible: false })}
            width="70%"
          >
            <Publish />
          </Modal>
        </div>
      </div>
    );
  }
}


export default connect(({ formData: { list, col, queryParams }, loading }) => ({ list, col, queryParams, loading: loading['effects'] }))(DataManage)
