//@ts-nocheck
import Designer from '@/components/MyWorkFlow';
import React, { Component } from 'react';
import { Button, notification } from 'antd';
import 'antd/dist/antd.less';
import { useModel } from 'umi';
import { FormItems } from '@/services/interface/forms.interface';
import { query, update } from '@/services/flow';
const initialData = {
  nodes: [
    { id: 'startNode1', x: 200, y: 200, label: '起始节点', clazz: 'start' },
    { id: 'userTask', x: 400, y: 200, clazz: 'userTask', label: '审批节点', assignType: 'person' },
    { id: 'endNode', x: 600, y: 200, label: '终止节点', clazz: 'end' },
  ],
  edges: [
    { clazz: 'flow', source: "startNode1", target: "userTask", sourceAnchor: 1, targetAnchor: 3 },
    { clazz: 'flow', source: "userTask", target: 'endNode', sourceAnchor: 1, targetAnchor: 2 },
  ],
}
class FormProcess extends Component {
  constructor(props) {
    super(props);
    this.wfdRef = React.createRef();
    this.state = {
      flowModel: {},
      loading: true,
      data: {}
    }
  }
  async componentDidMount() {
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
    const data = this.wfdRef.current.graph.save();
    const flowModel = this.state.flowModel;
    const formId = this.state.formId
    const res = await update({
      formId,
      flowModel,
      ...data
    });
    if (res.success) {
      notification.success({ message: "操作成功" })
    } else {
      notification.error({ message: "操作失败" + res.message || res.mes })
    }
  }

  render() {
    const data = {

    };

    const candidateUsers = [
      { id: '1', name: 'Tom' },
      { id: '2', name: 'Steven' },
      { id: '3', name: 'Andy' },
    ];
    const candidateGroups = [
      { id: '1', name: 'Manager' },
      { id: '2', name: 'Security' },
      { id: '3', name: 'OA' },
    ];
    const height = 600;
    return (
      <div>
        <Button
          style={{ float: 'right', marginTop: 6, marginRight: 6 }}
          onClick={() => this.wfdRef.current.graph.saveXML()}
        >
          导出XML
        </Button>
        <Button
          style={{ float: 'right', marginTop: 6, marginRight: 6 }}
          onClick={() => this.update()}
        >
          提交保存
        </Button>
        <Designer
          ref={this.wfdRef}
          data={this.state.data}
          height={height}
          mode={'edit'}
          users={candidateUsers}
          groups={candidateGroups}
          lang={'zh'}
          formItems={this.props.formItems as FormItems}
          onFlowModelChange={(v) => this.setState({ flowModel: v })}
          flowModel={this.state.flowModel}
        />
      </div>
    );
  }
}
FormProcess.title = '基础设置--流程设置';
const FormP = function (props: any) {
  const formItems = useModel('forms').formItems;
  return <FormProcess {...props} formItems={formItems} />
}
export default FormP;
