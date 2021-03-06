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
  AppstoreAddOutlined,
} from '@ant-design/icons';
import './index.less';
import { connect } from 'umi';
import { getToken } from '@/utils/request';
import { FormInstance } from 'antd/lib/form';
import { generate } from 'shortid';
import { ColumnType } from 'antd/lib/table';
import { renderFilter } from './methodSelect';
import { SchemaForm } from '@/components/SchemaForm';
/**
 * @class DataManage
 */
class DataManage extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }
  state = {
    upload: false,
    checked: [],
    produceNodeEndTime: false,
    showFilter: false,
    filter: [],
    showCheck: false,
    loading: false,
    type: '',
    showExpt: false,
    visitype: '',
    record: {}

  }
  form = React.createRef<FormInstance>();
  formRef = React.createRef<FormInstance>();
  validateFilter = (
    callback: (values: any) => void
  ) => {
    this.form.current?.validateFields()
      .then(
        this.handleValues(callback)
      )
      .catch(e => console.log(e))
  }
  handleValues = (cb?: Function) => {
    return function (values: any) {
      const keys = Object.keys(values);
      const isCheck = values.isCheck;
      const arr: any[] = [];
      let status = undefined
      keys.forEach(key => {
        if (key === 'status') {
          status = values[key]
        } else if (values[key] && values[key]?.method && values[key]?.value) {
          arr.push({ id: key, ...values[key] })
        }
      })
      cb && cb.call(DataManage, {
        status,
        fliedQuery: arr,
        isCheck,
      })
    }
  }

  handleFilter = () => {
    this.validateFilter(
      this.queryFilter
    )
  }

  queryFilter = (
    queryParams: { status: any, fliedQuery: any, isCheck: boolean }
  ) => {
    const { status, fliedQuery, isCheck } = queryParams;
    if (isCheck) {
      this.props.dispatch({
        type: 'formData/queryChecked',
        payload: {
          status,
          fliedQuery
        }
      })
    } else {
      this.props.dispatch({
        type: 'formData/query',
        payload: {
          status,
          fliedQuery
        }
      })
    }
  }

  checkAll = (e: any) => {
    const checked = e.target.checked;
    const items = this.props.col || [];
    const state: any = {}
    state.checked = checked ? items.filter((it: any) => !it.onlyCol).map((it: any) => it.dataIndex) : [];
    items.filter((it: any) => it.onlyCol).map((it: any) => state[it.dataIndex] = checked);
    this.setState({
      ...state,
      produceNodeEndTime: checked
    })
  }
  getCheckedAll = () => {
    const { checked, ...rest } = this.state;
    if (checked.length === this.props.col.filter((it: any) => !it.onlyCol).length) {
      if (rest.produceNodeEndTime === true) {
        return true
      }
    }
    return false
  }
  handleChecked = (type: string, e: any) => {
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

  handleCB = () => {
    this.setState({
      checked: [],
      type: '',
      loading: false,
      showExpt: '',
      showCheck: false,
      upload: false,
      visitype: ''
    })
  }

  handleOk = () => {
    this.validateFilter(
      this.handleExpt
    )
  }
  createFormData = () => {
    this.setState({
      record: {},
      visitype: 'create'
    })
  }
  modifyFormData = (record: any) => {
    this.setState({
      record,
      visitype: 'modify'
    })
  }
  handleSubmit = () => {
    const { visitype: type, record } = this.state;
    const { dispatch } = this.props;
    const handleCancel = this.handleCancel
    this.formRef.current?.validateFields()
      .then(values => {
        dispatch({
          type: `formData/${type}`,
          payload: {
            ...record,
            ...values,
            data: type === 'modify' ? values : undefined,
            dataGroupStatus: '2'
          },
          callback: handleCancel
        })

      })
      .catch(e => console.log(e))
  }
  handleCancel = () => {
    this.handleCB()
  }

  handleExpt = ({ status, fliedQuery }: any) => {
    const { checked, type, ...rest } = this.state;
    const isCheck = this.state.showCheck;
    const params = { itemIds: checked, isCheck, ...rest };
    const _rest: any = {}

    Object.keys(rest).forEach(it => _rest[it] = false);
    this.setState({ loading: true })
    const dispatch = this.props.dispatch;
    if (type === 'pdf') {
      dispatch({
        type: 'formData/exptPDF',
        payload: Object.assign({}, params, {
          formDataQueryDto: {
            size: 100000,
            page: 0,
            status,
            fliedQuery,
          }
        }, {
          size: 100000,
          page: 0,
        }),
        callback: this.handleCB
      })
    }
    else dispatch({
      type: 'formData/export',
      payload: Object.assign({}, params, {
        formDataQueryDto: {
          size: 100000,
          page: 0,
          status,
          fliedQuery,
        }
      }, {
        size: 100000,
        page: 0,
      }),
      callback: this.handleCB
    })
  }
  getFormId = () => {
    return location.search.substring(8, location.search.length)
  }


  render() {
    const { loading, col, list, queryParams, dispatch, assetsFrom, items } = this.props
    return (
      <div className="extension" style={{ width: "100%", background: "white", minHeight: 800 }}>
        <div className="data-content">
          <div className="tool-bar">
            <Button icon={<DownloadOutlined />} type="primary" onClick={() => this.setState({ showExpt: true })}>??????</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button icon={<UploadOutlined />} type="primary" onClick={() => this.setState({ upload: true })}>????????????</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {assetsFrom && <Button icon={<DownloadOutlined />} type="primary" onClick={() => this.setState({ showCheck: true })}>??????????????????</Button>}
            &nbsp;&nbsp;&nbsp;&nbsp;<Button icon={<AppstoreAddOutlined />} onClick={this.createFormData}>??????</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ width: 'calc(100% - 350px)', overflowX: 'scroll' }}>
              <Table
                columns={col.concat([{
                  title: '??????', key: 'operation', fixed: 'right', width: 300, render: (text, record) => <>
                    {assetsFrom && <Button onClick={() => this.setState({
                      showExpt: true,
                      type: 'pdf',

                      formDataId: record.id
                    })}>??????pdf</Button>}
                    <Button onClick={this.modifyFormData.bind(void 0, record)}>??????</Button>
                    <Button onClick={() => {
                      this.props.dispatch({
                        type: "formData/remove",
                        payload: record.id
                      })
                    }}>??????</Button>
                  </>
                }] as ColumnType<any>[])}
                bordered
                rowKey={(it) => it.id + `_`}
                dataSource={list.map((it: any) => {
                  const { data, ...rest } = it;
                  return { ...data, ...rest }
                })}
                scroll={{ x: 'max-content' }}
                locale={{
                  emptyText:
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{ height: 60 }}
                      description={
                        <span>
                          < span style={{ fontSize: 14, color: "#1890ff" }}>????????????</span>
                          <br />
                          <span>????????????????????????????????????????????????????????????????????????</span>
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
              <span>????????????</span><span style={{ float: 'right' }}><Button onClick={this.handleFilter.bind(this)} loading={loading['formData']}>??????</Button></span>
              <span>
                <Select mode="multiple" value={this.state.filter} onChange={v => this.setState({ filter: v })} style={{ width: "100%" }} placeholder="?????????">
                  {col.filter((it: any) => !it.onlyCol && (it.title !== '?????????')).map((it: any) => <Select.Option key={it.dataIndex} value={it.dataIndex}>{it.title}</Select.Option>)}
                </Select>
              </span>
              <div>
                {this.renderForm()}
              </div>
            </div>
          </div>
          {this.renderModal1()}
          {this.renderModal2()}
          {this.renderModal3()}
          <Modal
            visible={!!this.state.visitype}
            width="55%"
            title={'schema_form'}
            closable={false}
            destroyOnClose={true}
            forceRender
            cancelText="??????"
            okText="??????"
            onOk={this.handleSubmit}
            onCancel={this.handleCancel}
          >
            <SchemaForm schema={items} formRef={this.formRef} record={this.state.record} />
          </Modal>
        </div>
      </div>
    );
  }
  /**
   * @method ????????????
   */
  renderForm(this: DataManage) {
    const {
      state: { filter }, props: { assetsFrom, items } } = this;
    return (<Form ref={this.form} style={{ width: "300px", marginTop: 20 }} layout="inline">
      {assetsFrom && <Form.Item label="??????????????????" name="isCheck" valuePropName="checked">
        <Switch />
      </Form.Item>}
      <Form.Item label="????????????" name="status">
        <Select style={{ width: 200 }} >
          <Select.Option value="start">
            ????????????
            </Select.Option>
          <Select.Option value="task">
            ????????????
            </Select.Option>
          <Select.Option value="end">
            ????????????
            </Select.Option>
          <Select.Option value="import">
            ????????????
            </Select.Option>
        </Select>
      </Form.Item>
      {(filter || []).map((id: string) => {
        const lip = items.find((it: any) => it.id === id);
        if (lip) {
          return <Form.Item label={lip.title} key={lip.id} name={lip.id} style={{ marginTop: 20 }}>
            {renderFilter(lip)}
          </Form.Item>;
        }
        return <></>;
      })}
    </Form>);
  }
  /**
   * @method ????????????????????????
   */
  renderModal3 = () => {
    const { showExpt, loading } = this.state;
    const { signGroup, col, produceNodeEndTime } = this.props;
    const modalProps = {
      visible: !!showExpt,
      title: '??????',
      destroyOnClose: true,
      okText: '??????',
      cancelText: '??????',
      style: { padding: '0 auto' },
      onCancel: () => this.setState({ showExpt: false }),
      onOk: this.handleOk,
      confirmLoading: loading
    };
    return <Modal
      {...modalProps}
    >
      <div>
        <Row>
          {this.state.type === 'pdf' && <Col span={20}>
            <Row>?????????<Input onChange={(e) => this.handleChange('title', e.target.value)} /></Row>
            <div style={{ marginTop: 10 }}>???????????????<Select style={{ minWidth: 220 }} onChange={this.handleChange.bind(void 0, 'signGroup')}>
              {signGroup?.map((it: any) => <Select.Option key={generate()} value={it.signGroup}>
                {it.signGroup}
              </Select.Option>)}
            </Select></div>
          </Col>}
          <Row style={{ marginTop: 20 }}>
            <span>?????????????????????</span>
          </Row>
          <Col span={20} style={{ border: "1px solid #e0e0e0", overflow: 'scroll', height: 200, marginTop: 20 }}>
            <Row style={{ background: 'rgba(255,255,255,.3)', padding: '5px 10px' }}><Checkbox onChange={this.checkAll} checked={this.getCheckedAll()}>??????</Checkbox></Row>
            <Checkbox.Group onChange={v => this.setState({ checked: v })} value={this.state.checked} style={{ width: "100%" }}>
              {col.filter((it: any) => !it.onlyCol).map((item: any, index: number) => <div style={getStyles(index)} key={item.id + '_' + index}> <Row> <Checkbox value={item.dataIndex} key={item.dataIndex}>{item.title}</Checkbox> </Row></div>)}
            </Checkbox.Group>
            {col.filter((it: any) => it.onlyCol).map((item: any, index: number) => <Row style={getStyles(col.length)} key={item.id + '' + index}><Checkbox onChange={this.handleChecked.bind(void (0), item.dataIndex)} checked={(this.state as any)[item.dataIndex] || false}>{item.title}</Checkbox></Row>)}
            <Row style={getStyles(col.length)}><Checkbox onChange={this.handleChecked.bind(void (0), 'produceNodeEndTime')} checked={this.state.produceNodeEndTime}>??????????????????</Checkbox></Row>
          </Col>
        </Row>
      </div>
    </Modal>;
  }

  /**
   * @method ????????????????????????
   */
  renderModal2 = () => {
    const { form } = this;
    const uploadProps = {
      name: 'file',
      action: `/api/form/importFormExcel/${this.getFormId()}`,
      headers: {
        authorization: getToken()
      },
      onChange: (response: any) => {

        if (response.file.status === 'done') {
          message.success(`${response.file.name} ?????? ???????????????`, 2)
          this.setState({ upload: false, filter: [] })
          dispatch({
            type: "formData/query",
            payload: {
              page: 0,
              size: 10,
              fliedQuery: []
            }
          })
          form.current?.resetFields();
        } else if (response.file.status === 'error') {
          message.error(`${response.file.name} ?????? ???????????????`, 2)
        }
      }
    }
    const { upload } = this.state;
    const { dispatch } = this.props;
    const modalProps = {
      title: '????????????',
      footer: false,
      onCancel: () => this.setState({ upload: false }),
      closable: true,
      destroyOnClose: true,
      visible: upload,
    };
    return <Modal
      {...modalProps}
    >
      <Alert type="warning" message="??????" style={{ marginBottom: 20 }} description="????????????????????????????????????????????????????????????????????????????????????????????????" />
      <span><Button icon={<DownloadOutlined />} type="primary" onClick={() => dispatch({
        type: 'formData/queryTemplate',
        payload: this.getFormId()
      })}>??????????????????</Button></span>
      <span style={{ float: 'right' }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} type="primary">??????????????????</Button>
        </Upload>
      </span>
    </Modal>;
  }

  /**
   * @method ????????????????????????
   */
  renderModal1 = () => {
    const { showCheck, loading, checked } = this.state;
    const { col } = this.props;
    const props = {
      title: '??????????????????',
      destroyOnClose: true,
      okText: '??????',
      cancelText: '??????',
      style: { padding: '0 auto' },
      onCancel: () => this.setState({ showCheck: false }),
      onOk: this.handleOk,
      confirmLoading: loading,
      visible: !!showCheck,
    };
    return <Modal
      {...props}
    >
      <div>
        <Row style={{ marginTop: 20 }}>
          <span>???????????????????????????</span>
        </Row>
        <Row>
          <Col span={20} style={{ border: "1px solid #e0e0e0", overflow: 'scroll', height: 200 }}>
            <Checkbox.Group onChange={v => {
              if (v.length > 5)
                v.shift();
              this.setState({ checked: v });
            }} value={checked} style={{ width: "100%" }}>
              {col.filter((it: any) => !it.onlyCol).map((item: any, index: number) => <div style={getStyles(index)} key={item.id + '_' + index}> <Row> <Checkbox value={item.dataIndex} key={item.dataIndex}>{item.title}</Checkbox> </Row></div>)}
            </Checkbox.Group>
          </Col>
        </Row>
      </div>
    </Modal>;
  }
}

function getStyles(index: number) {
  if (index % 2 === 0)
    return { background: 'rgba(255,255,224,.3)', padding: '5px 10px', border: '1px solid #e0e0e0', borderLeftWidth: 0, borderRightWidth: 0 }
  return { background: "rgba(255,255,255,.3)", padding: '5px 10px', border: '1px solid #e0e0e0', borderLeftWidth: 0, borderRightWidth: 0 }
}



export default connect(({ formData: { list, col, queryParams, src, items, assetsFrom, signGroup, children: subcol }, loading }: any) => ({ list, col, queryParams, src, loading: loading['models'], items, assetsFrom, signGroup, subcol }))(DataManage)
