//@ts-nocheck

import React, { Component, useEffect } from 'react';
import { Button, notification, Popconfirm, message } from 'antd';

import { useModel } from 'umi';

import shortid from 'shortid';
import { query as queryUser } from '@/services/user';
import { query as queryDept, queryUserDepts } from '@/services/dept';
import { FormItems } from '@/services/interface/forms.interface';
import { query, update, remove } from '@/services/flow';
import Designer from '@/components/MyWorkFlow';
import 'antd/dist/antd.less';

const startId = shortid.generate();
const userTaskId = shortid.generate();
const endNodeId = shortid.generate();
const initialData = {
  nodes: [
    { id: startId, x: 200, y: 200, label: '起始节点', clazz: 'start',selectMode:[] },
    { id: userTaskId, x: 400, y: 200, clazz: 'userTask', label: '审批节点', suggest: true, submit: true, assignType: 'person', assignPerson: [], submitRule: 'any', signGroup: '' },
    { id: endNodeId, x: 600, y: 200, label: '终止节点', clazz: 'end',selectMode:[] },
  ],
  edges: [
    {
      clazz: 'flow', source: startId, target: userTaskId, sourceAnchor: 1, targetAnchor: 3, flow: {
        conditiontype: 'undefined'
      }
    },
    {
      clazz: 'flow', source: userTaskId, target: endNodeId, sourceAnchor: 1, targetAnchor: 2, flow: {
        conditiontype: 'undefined'
      }
    },
  ],
}
class FormProcess extends Component {

  constructor(props) {
    super(props);
    this.wfdRef = React.createRef();
    this.state = {
      flowModel: {},
      loading: true,
      data: {},
      users: [],
      depts: [],
      loadingbt: false
    }
  }
  async componentDidMount() {
    this.fetchData();
    const { data: users, success: successa } = await queryUser({ page: 0, size: 1000 });
    const { data: depts, success: successb } = await queryUserDepts({ page: 0, size: 1000 });
    if (successa) {
      this.setState({ users });
    } else {
      message.error("数据获取异常", 2)
    }
    if (successb) {
      this.setState({ depts });
    } else {
      message.error("数据获取异常", 2)
    }
  }
  async fetchData() {
    const formId = location.search.replace('?', '').split("=")[1];
    const res = await query({ formId });
    if (res.success) {
      const { flowModel, ...rest } = res.data || {};
      this.setState({
        flowModel: flowModel || {},
        data: { ...initialData, ...rest }
      })
    }
    this.setState({
      formId
    })

  }

  async update() {
    this.setState({ loadingbt: true })
    const data = this.wfdRef.current.graph.save();
    const flowModel = this.state.flowModel;
    const formId = this.state.formId;
    const res = await update({
      formId,
      flowModel,
      ...data
    });
    if (res.success) {
      notification.success({ message: "操作成功" })
      this.setState({ loadingbt: false })
    } else {
      notification.error({ message: "操作失败" + res.message || res.mes })
      this.setState({ loadingbt: false })
    }
  }
  async delete() {
    const formId = location.search.replace('?', '').split("=")[1];
    const res = await remove({ formId });
    if (res.success) {
      message.success('操作成功', 2)
      this.fetchData()
    } else {
      notification.error({
        message: "操作失败" + res.message || res.mes
      })
    }

  }

  render() {
    const data = {

    };


    const height = 600;
    return (
      <div>
        <Popconfirm title="是否确定要删除流程？" onConfirm={this.delete.bind(this)}>
          <Button
            style={{ float: 'right', marginTop: 6, marginRight: 6 }}
          >
            删除流程
        </Button>
        </Popconfirm>
        <Button
          style={{ float: 'right', marginTop: 6, marginRight: 6 }}
          onClick={() => this.update()}
          loading={this.state.loadingbt}
        >
          {!this.state.loadingbt && '提交保存'}
        </Button>
        <Designer
          ref={this.wfdRef}
          data={this.state.data}
          height={height}
          mode={'edit'}
          users={this.state.users}
          groups={this.state.depts}
          lang={'zh'}
          formItems={this.props.formItems as FormItems}
          onFlowModelChange={(v) => this.setState({ flowModel: v })}
          flowModel={this.state.flowModel}
          roleTree={this.props.roleTree}
        />
      </div>
    );
  }
}
FormProcess.title = '基础设置--流程设置';
const FormP = function (props: any) {
  const formItems = useModel('forms').formItems;
  const { roleTree, AsyncFetch } = useModel('mode');
  useEffect(() => {
    AsyncFetch()
  }, [])
  return <FormProcess {...props} formItems={formItems} roleTree={roleTree} />
}
export default FormP;
