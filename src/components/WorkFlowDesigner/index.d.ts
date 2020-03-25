interface Node {
    shape: string; //start-node|user-task-node|end-node|receive-task-node;
    id: string; //ID
    x: number; //position.x
    y: number;//position.y
    label: string;//text;
    clazz: string; //start|end|userTask|receiveTask
    size: [number, number]; //宽高

    assignType?: string; //审批类型  person 人员，persongroup 部门;
    assignPerson?: string[]; //审批人员 id
    assignDept?: string[]; //审批部门 id
    letter?: string[]; //"itemId:{v}" brief 简报；editable 编辑 visible 可见
    suggest?: boolean;//文本意见;
    handWritten?: boolean;//手写签名；
    submit?: boolean;//提交;
    submitWithPrint?: boolean;//提交并打印
    refuse?: boolean;//退回
    forward?: true;//转交
    endable?: boolean;//结束流程
    bluksubmit?: boolean;//批量提交
}
interface Point { //锚点位子 坐标
    x: number;
    y: number;
    index: number;
}
interface Conditions { //自定义流转条件
    itemId: string; //组件id;
    title: string;//组件标题;
    type: string; //组件类型;
    value: string; //组件 formItem 的字符串对象
    list?: { label: string; value: string }[] //下拉选项;
    conditionsRule: string; //规则条件
    conditionsValue: string; //规则值


}
interface Flow {
    conditiontype?: string; //流程规则 custom 自定义 ; else else规则 
    conditions?: Conditions[];
}
interface Edge {
    clazz: string;
    source: string; //ID 起点;
    target: string; //ID 终点;
    sourceAnchor: number; //起点的锚点序号
    targetAnchor: number; //终点的锚点序号
    shape: 'flow-polyline-round'; //typeof edge
    startPoint: Point;
    endPoint: Point;
    flow: Flow


}
interface FlowModel {
    useWeChart?:boolean;
    useEmail?:boolean;
    cancelable?:boolean;
    viewable?:boolean;
    autosubmit?: string; //0 负责人与上一节点相同 ;1 负责人处理过该流程; 2 不处理

}

export interface WorkFlow {
    nodes: Array<Node>;
    edges: Array<Edge>;
    flowModel:FlowModel
    groups: [];
}