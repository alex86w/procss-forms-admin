//@ts-nocheck
import React from 'react';
import {
  Button,
  Table,
  Empty,
  Modal,
  Row,
  Col,
  Checkbox,
} from 'antd';
import {
  UploadOutlined,
} from '@ant-design/icons';
import Publish from '../basic/publish'
import './index.less';
import { connect } from 'umi';


class DataManage extends React.Component {
  state = {
    visible: false,
    checked: [],
    exportVisible: false,
    createTime: false,
    createUser: false,
    produceNodeEndTime: false,

  }

  handleMenuBtnClick = () => {
    console.log('click');
  };
  checkAll = (e: React.ChangeEvent) => {
    const checked = e.target.checked;
    const items = this.props.col || [];
    this.setState({
      checked: checked ? items.map(it => it.dataIndex) : [],
      createTime: checked,
      createUser: checked,
      produceNodeEndTime: checked
    })
  }
  getCheckedAll = () => {
    const { checked, createTime, createUser, produceNodeEndTime } = this.state;
    if (checked.length === this.props.col.length) {
      return createTime && createUser && produceNodeEndTime
    }
    return false
  }
  handleChecked = (type: string, e: React.ChangeEvent) => {
    const checked = e.target.checked;
    this.setState({
      [type]: checked
    })


  }
  handleOk = () => {
    const { checked, createTime, createUser, produceNodeEndTime } = this.state;
    const params = { itemIds: checked, createUser, createTime, produceNodeEndTime };
    const dispatch = this.props.dispatch;
    dispatch({
      type: 'formData/export',
      payload: params,
      callback: success => {
        if (success) {
          this.setState({
            showExpt: false,
            checked: [],
            createTime: false,
            createUser: false,
            produceNodeEndTime: false
          })
        }
      }
    })
  }

  render() {
    const { loading, col, list, queryParams, dispatch } = this.props
    const { visible, createTime, createUser, produceNodeEndTime } = this.state;



    return (
      <div className="extension">
        <div className="data-content">
          <div className="tool-bar">
            <Button icon={<UploadOutlined />} type="primary" onClick={() => this.setState({ showExpt: true })}>导出</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <Table
            columns={col}
            bordered
            rowKey={(it, index) => it.id + `_` + index}
            dataSource={list.map(it => it.data)}
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
         
          <Modal
            visible={!!this.state.showExpt}
            title="导出Excel"
            destroyOnClose
            okText="导出"
            cancelText="取消"
            rowkey="id"
            style={{ padding: '0 auto' }}
            onCancel={() => this.setState({ showExpt: false })}
            onOk={this.handleOk}

          >
            <div>
              <Row style={{ marginTop: 20 }}>
                <span>请选择导出字段</span>
              </Row>
              <Row>
                <Col span={20} style={{ border: "1px solid #e0e0e0", overflow: 'scroll', height: 200 }}>
                  <Row style={{ background: 'rgba(255,255,255,.3)', padding: '5px 10px' }}><Checkbox onChange={this.checkAll} checked={this.getCheckedAll()}>全选</Checkbox></Row>
                  <Checkbox.Group onChange={v => this.setState({ checked: v })} value={this.state.checked} style={{ width: "100%" }} >
                    {col.map((item, index) => <div style={getStyles(index)} key={item.id+'_'+index}> <Row> <Checkbox value={item.dataIndex} key={item.dataIndex}>{item.title}</Checkbox> </Row></div>)}
                  </Checkbox.Group>
                  <Row style={getStyles(col.length)}><Checkbox onChange={this.handleChecked.bind(void (0), 'createTime')} checked={createTime}>创建时间</Checkbox></Row>
                  <Row style={getStyles(col.length + 1)}><Checkbox onChange={this.handleChecked.bind(void (0), 'createUser')} checked={createUser}>创建人</Checkbox></Row>
                  <Row style={getStyles(col.length)}><Checkbox onChange={this.handleChecked.bind(void (0), 'produceNodeEndTime')} checked={produceNodeEndTime}>审核完成时间</Checkbox></Row>
                </Col>
              </Row>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

function getStyles(index: number) {
  if (index % 2 === 0) return { background: 'rgba(255,255,224,.3)', padding: '5px 10px', border: '1px solid #e0e0e0', borderLeftWidth: 0, borderRightWidth: 0 }
  return { background: "rgba(255,255,255,.3)", padding: '5px 10px', border: '1px solid #e0e0e0', borderLeftWidth: 0, borderRightWidth: 0 }
}



export default connect(({ formData: { list, col, queryParams, src }, loading }) => ({ list, col, queryParams, src, loading: loading['effects'] }))(DataManage)
