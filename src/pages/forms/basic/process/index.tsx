//@ts-nocheck
import Designer from '@/components/MyWorkFlow';
import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.less';
class FormProcess extends Component {
  constructor(props) {
    super(props);
    this.wfdRef = React.createRef();
  }

  render() {
    const data = {
      nodes: [
        { id: 'startNode1', x: 50, y: 200, label: '起始节点', clazz: 'start' },
        { id: 'userTask', x: 187, y: 196, clazz: 'userTask', label: '审批节点' },
        { id: 'endNode', x: 300, y: 200, label: '终止节点', clazz: 'end' },
        { id: "receiveTask", x: 191, y: 98, label: "抄送节点", clazz: 'receiveTask' }
      ],
      edges: [
        { clazz: 'flow', source: "startNode1", target: "userTask", sourceAnchor: 1, targetAnchor: 3 },
        { clazz: 'flow', source: "userTask", target: 'endNode', sourceAnchor: 1, targetAnchor: 2 },
        { clazz: 'flow', source: "userTask", target: "receiveTask", sourceAnchor: 0, targetAnchor: 2 }
      ],
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
          onClick={() => console.log(this.wfdRef.current.graph.save())}
        >
          打印数据
        </Button>
        <Designer
          ref={this.wfdRef}
          data={data}
          height={height}
          mode={'edit'}
          users={candidateUsers}
          groups={candidateGroups}
          lang={'zh'}
        />
      </div>
    );
  }
}
FormProcess.title = '基础设置--流程设置'
export default FormProcess;
