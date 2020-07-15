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
  Upload,
  message,
  Alert,
  Select,
  Form,
  Switch,
  Input,
} from 'antd';
import {
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import './index.less';
import { connect } from 'umi';
import { getToken } from '@/utils/request';
import { DateFilter, InputFilter, SelectFilter } from '@/components/MutilpFilter/select';
import { FormInstance } from 'antd/lib/form';
import { generate } from 'shortid';
export const methodSelect = [
  { label: '存在任意一个', key: 'overlap' }
]
export const methodText = [
  { label: '等于', key: 'eq' }
]
export const methodNumber = [
  { label: '大于', key: 'gt' },
  { label: '小于', key: 'lt' },
  { label: '大于等于', key: 'gte' },
  { label: '小于等于', key: 'lte' },
]
export const notRq = [
  { label: '为空', key: 'null' },
  { label: '不为空', key: 'notNull' }
]




const renderFilter = (item: any) => {
  switch (item.type) {
    case 'inputDate':
      return <DateFilter methods={item.required ? methodNumber : methodNumber.concat(notRq)} />
    case 'mutileText':
    case 'singText':
      return <InputFilter methods={item.required ? methodText : methodText.concat(notRq)} />
    case 'select':
    case 'radios':
      return <SelectFilter methods={item.required ? methodSelect : methodSelect.concat(notRq)} opts={item.items} {...{ mode: item.type === 'radio' ? undefined : 'multiple' }} />
    case "numberText":
      return <InputFilter methods={item.required ? methodNumber : methodNumber.concat(notRq)} />
    default:
      return <></>
  }
}


class DataManage extends React.Component<any, any> {
  state = {
    upload: false,
    checked: [],
    produceNodeEndTime: false,
    showFilter: false,
    filter: [],
    showCheck: false,
    loading:false
  }
  form = React.createRef<FormInstance>();

  handleFilter = () => {
    this.form.current.validateFields().then(values => {
      const keys = Object.keys(values);
      const isCheck = values.isCheck;
      const arr = [];
      let status = undefined
      keys.forEach(key => {
        if (key === 'status') {
          status = values[key]
        } else if (values[key] && values[key]?.method && values[key]?.value) {
          arr.push({ id: key, ...values[key] })
        }
      })
      if (isCheck) {
        this.props.dispatch({
          type: 'formData/queryChecked',
          payload: {
            status,
            fliedQuery: arr
          }
        })
        return;
      }
      this.props.dispatch({
        type: 'formData/query',
        payload: {
          status,
          fliedQuery: arr
        }
      })
    }).catch(e => console.log(e))

  }

  checkAll = (e: React.ChangeEvent) => {
    const checked = e.target.checked;
    const items = this.props.col || [];
    const state = {}
    state.checked = checked ? items.filter(it => !it.onlyCol).map(it => it.dataIndex) : [];
    items.filter(it => it.onlyCol).map(it => state[it.dataIndex] = checked);
    this.setState({
      ...state,
      produceNodeEndTime: checked
    })
  }
  getCheckedAll = () => {
    const { checked, ...rest } = this.state;
    if (checked.length === this.props.col.filter(it => !it.onlyCol).length) {
      const extra = Object.keys(rest).filter(it => it !== 'showExpt');
      if (extra.length === this.props.col.filter(it => it.onlyCol).length + 1) {
        extra.forEach(it => {
          if (this.state[it] === false) {
            return false
          }
        })
        return true
      }
      return false
    }
    return false
  }
  handleChecked = (type: string, e: React.ChangeEvent) => {
    const checked = e.target.checked;
    this.setState({
      [type]: checked
    })
  }
  handleChange = (type: string, v: string) => {
    this.setState({
      [type]: v
    })
  }
  handleOk = () => {
    const { checked, type, ...rest } = this.state;
    const isCheck = this.state.showCheck;
    const params = { itemIds: checked, isCheck, ...rest };
    const dispatch = this.props.dispatch;
    const _rest = {}

    Object.keys(rest).forEach(it => _rest[it] = false);
    this.setState({ loading: true })
    if (type === 'pdf') {
      dispatch({
        type: 'formData/exptPDF',
        payload: params,
        callback: success => {
          if (success) {
            this.setState({
              checked: [],
              type: '',
              loading:false,
              showExpt:''
            
            })
          }

        }
      })
    }
    else dispatch({
      type: 'formData/export',
      payload: params,
      callback: success => {
        if (success) {
          this.setState({
            checked: [],
            loading:false,
            showExpt:''
          })
        }
      }
    })
    
  }
  getFormId = () => {
    return location.search.substring(8, location.search.length)
  }

  render() {
    const { loading, col, list, queryParams, dispatch, items, assetsFrom, signGroup, subcol } = this.props
    const { produceNodeEndTime } = this.state;
    const uploadProps = {
      name: 'file',
      action: `/api/form/importFormExcel/${this.getFormId()}`,
      headers: {
        authorization: getToken()
      },
      onChange(response) {
        if (response.file.status !== 'uploading') {

        }
        if (response.file.status === 'done') {
          message.success(`${response.file.name} 文件 上传成功。`, 2)
        } else if (response.file.status === 'error') {
          message.success(`${response.file.name} 文件 上传失败。`, 2)
        }
      }
    }
    return (
      <div className="extension">
        <div className="data-content">
          <div className="tool-bar">
            <Button icon={<DownloadOutlined />} type="primary" onClick={() => this.setState({ showExpt: true })}>导出</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button icon={<UploadOutlined />} type="primary" onClick={() => this.setState({ upload: true })}>批量导入</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {assetsFrom && <Button icon={<DownloadOutlined />} type="primary" onClick={() => this.setState({ showCheck: true })}>导出资产信息</Button>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ width: 'calc(100% - 350px)', overflowX: 'scroll' }}>
              <Table
                columns={col.concat([{
                  title: '操作', key: 'operation', render: (text, record) => <Button onClick={() => this.setState({
                    showExpt: true,
                    type: 'pdf',
                    formDataId: record.id
                  })}>导出pdf</Button>
                }])}
                bordered
                rowKey={(it) => it.id + `_`}
                dataSource={list.map(it => {
                  const { data, ...rest } = it;
                  return { ...data, ...rest }
                })}

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
                          <span>可以讲业务发不给团队成员或者公开发布来收集数据。</span>
                        </span>
                      } >
                    </Empty>
                }}
                loading={loading[`formData`]}
                pagination={{
                  total: queryParams.total,
                  pageSize: queryParams.size,
                  current: queryParams.page + 1,
                  onChange: v => dispatch({
                    type: "formData/query",
                    payload: { page: v - 1 }
                  })
                }}
              />
            </div>
            <div style={{ width: "300px", display: 'flex', flexDirection: 'column' }}>
              <span>筛选条件</span><span style={{ float: 'right' }}><Button onClick={this.handleFilter} loading={loading['formData']}>搜索</Button></span>
              <span>
                <Select mode="multiple" value={this.state.filter} onChange={v => this.setState({ filter: v })} style={{ width: "100%" }} placeholder="请添加">
                  {col.filter(it => !it.onlyCol && (it.title !== '子表单')).map(it => <Select.Option key={it.dataIndex} value={it.dataIndex}>{it.title}</Select.Option>)}
                </Select>
              </span>
              <div>
                <Form ref={this.form} style={{ width: "300px", marginTop: 20 }} layout="inline" >
                  {assetsFrom && <Form.Item label="查看盘点数据" name="isCheck" valuePropName="checked">
                    <Switch />
                  </Form.Item>}
                  <Form.Item label="数据类型" name="status" >
                    <Select style={{ width: 200 }}>
                      <Select.Option value="start">
                        初始数据
                    </Select.Option>
                      <Select.Option value="task">
                        审批数据
                    </Select.Option>
                      <Select.Option value="end">
                        最终数据
                    </Select.Option>
                      <Select.Option value="import">
                        导入数据
                    </Select.Option>
                    </Select>
                  </Form.Item>
                  {(this.state.filter || []).map((id: string) => {
                    const lip = items.find(it => it.id === id);
                    if (lip) {
                      return <Form.Item label={lip.title} key={lip.id} name={lip.id} style={{ marginTop: 20 }}>
                        {renderFilter(lip)}
                      </Form.Item>
                    }
                    return <></>
                  })}
                </Form>
              </div>
            </div>
          </div>
          <Modal
            visible={!!this.state.showExpt}
            title="导出"
            destroyOnClose
            okText="导出"
            cancelText="取消"
            rowkey="id"
            style={{ padding: '0 auto' }}
            onCancel={() => this.setState({ showExpt: false })}
            onOk={this.handleOk}
            confirmLoading={this.state.loading}

          >
            <div>

              <Row>
                {this.state.type === 'pdf' && <Col span={20}>
                  <Row>标题：<Input onChange={(e) => this.handleChange('title', e.target.value)} /></Row>
                  <div style={{ marginTop: 10 }}>签字组名：<Select style={{ minWidth: 220 }} >
                    {signGroup?.map(it => <Select.Option key={generate()} value={it.signGroup} onChange={this.handleChange.bind(void 0, 'signGroup')}>
                      {it.signGroup}
                    </Select.Option>)}
                  </Select></div>
                </Col>}
                <Row style={{ marginTop: 20 }}>
                  <span>请选择导出字段</span>
                </Row>
                <Col span={20} style={{ border: "1px solid #e0e0e0", overflow: 'scroll', height: 200, marginTop: 20 }}>
                  <Row style={{ background: 'rgba(255,255,255,.3)', padding: '5px 10px' }}><Checkbox onChange={this.checkAll} checked={this.getCheckedAll()}>全选</Checkbox></Row>
                  <Checkbox.Group onChange={v => this.setState({ checked: v })} value={this.state.checked} style={{ width: "100%" }} >
                    {col.filter(it => !it.onlyCol).map((item, index) => <div style={getStyles(index)} key={item.id + '_' + index}> <Row> <Checkbox value={item.dataIndex} key={item.dataIndex}>{item.title}</Checkbox> </Row></div>)}
                  </Checkbox.Group>
                  {col.filter(it => it.onlyCol).map((item, index) => <Row style={getStyles(col.length)} key={item.id + '' + index} style={getStyles(col.filter(it => !it.onlyCol).length + index)}><Checkbox onChange={this.handleChecked.bind(void (0), item.dataIndex)} checked={this.state[item.dataIndex] || false}>{item.title}</Checkbox></Row>)}
                  <Row style={getStyles(col.length)}><Checkbox onChange={this.handleChecked.bind(void (0), 'produceNodeEndTime')} checked={produceNodeEndTime}>审核完成时间</Checkbox></Row>
                </Col>
              </Row>
            </div>
          </Modal>
          <Modal
            visible={!!this.state.showCheck}
            title="导出资产数据"
            destroyOnClose
            okText="导出"
            cancelText="取消"
            rowkey="id"
            style={{ padding: '0 auto' }}
            onCancel={() => this.setState({ showCheck: false })}
            onOk={this.handleOk}
            confirmLoading={this.state.loading}
          >
            <div>
              <Row style={{ marginTop: 20 }}>
                <span>请选择五个导出字段</span>
              </Row>
              <Row>
                <Col span={20} style={{ border: "1px solid #e0e0e0", overflow: 'scroll', height: 200 }}>
                  <Checkbox.Group onChange={v => {
                    if (v.length > 5) v.shift();
                    this.setState({ checked: v })
                  }} value={this.state.checked} style={{ width: "100%" }} >
                    {col.filter(it => !it.onlyCol).map((item, index) => <div style={getStyles(index)} key={item.id + '_' + index}> <Row> <Checkbox value={item.dataIndex} key={item.dataIndex}>{item.title}</Checkbox> </Row></div>)}
                  </Checkbox.Group>
                </Col>
              </Row>
            </div>
          </Modal>
          <Modal visible={this.state.upload}
            title="批量导入"
            destroyOnClose
            footer={false}
            onCancel={() => { this.setState({ upload: false }) }}
            closable
          >
            <Alert type="warning" message="注意" style={{ marginBottom: 20 }} description="请先下载模版装填数据，完成数据装填后点击上传，提交模版批量导入。" />
            <span><Button icon={<DownloadOutlined />} type="primary" onClick={() => dispatch({
              type: 'formData/queryTemplate',
              payload: this.getFormId()
            })}>下载导入模版</Button></span>
            <span style={{ float: 'right' }}>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} type="primary" >上传导入文件</Button>
              </Upload>
            </span>
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



export default connect(({ formData: { list, col, queryParams, src, items, assetsFrom, signGroup, children: subcol }, loading }) => ({ list, col, queryParams, src, loading: loading['models'], items, assetsFrom, signGroup, subcol }))(DataManage)
