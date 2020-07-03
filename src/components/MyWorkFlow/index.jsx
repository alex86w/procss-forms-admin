import React, { Component } from 'react';
import {
  Demo,
  G6,
  getShapeName,
  locale,
  Command,
  Toolbar,
  AddItemPanel,
  CanvasPanel,
  exportXML,
  LangContext,
  styles,
} from '../WorkFlowDesigner';

import ItemPanel from './ItemPanel';
import ToolPanel from './ToolPanel';
import DetailPanel from './DetailPanel';

const MyWorkFlowDesigner = class extends Component {
  constructor(props) {
    super(props);
    this.pageRef = React.createRef();
    this.toolbarRef = React.createRef();
    this.itemPanelRef = React.createRef();
    this.detailPanelRef = React.createRef();
    this.resizeFunc = () => { };
    this.state = {
      selectedModel: {},
      processModel: {
        id: '',
        name: '',
        clazz: 'process',
        dataObjs: [],
        signalDefs: [],
        messageDefs: [],
      },
      flowModel: {},
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data !== this.props.data) {
      if (this.graph) {
        this.graph.changeData(this.initShape(this.props.data));
        this.graph.setMode(this.props.mode);
        this.graph.emit('canvas:click');
        if (this.cmdPlugin) {
          this.cmdPlugin.initPlugin(this.graph);
        }
        if (this.props.isView) {
          this.graph.fitView(5);
        }
      }
    }
  }
  click = (e) => {
    if ((this.graph.get('selectedItems') || []).length === 0) {
      this.setState({
        selectedModel: {}
      })
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.click)
    const { isView, mode } = this.props;
    const height = this.props.height - 1;
    const width = this.pageRef.current.offsetWidth;
    let plugins = [];
    if (!isView) {
      this.cmdPlugin = new Command();
      const toolbar = new Toolbar({ container: this.toolbarRef.current });
      const addItemPanel = new AddItemPanel({
        container: this.itemPanelRef.current,
      });
      const canvasPanel = new CanvasPanel({ container: this.pageRef.current });
      plugins = [this.cmdPlugin, toolbar, addItemPanel, canvasPanel];
    }
    this.graph = new G6.Graph({
      plugins: plugins,
      container: this.pageRef.current,
      height: height,
      width: width,
      modes: {
        default: ['drag-canvas', 'clickSelected'],
        view: [],
        edit: [
          'drag-canvas',
          'hoverNodeActived',
          'hoverAnchorActived',
          'dragNode',
          'dragEdge',
          'dragPanelItemAddNode',
          'clickSelected',
          'deleteItem',
          'itemAlign',
          'dragPoint',
        ],
      },
      defaultEdge: {
        shape: 'flow-polyline-round',
      },
    });
    this.graph.saveXML = (createFile = true) =>
      exportXML(this.graph.save(), this.state.processModel, createFile);
    if (isView) {
      this.graph.setMode('view');
    } else {
      this.graph.setMode(mode);
    }
    this.graph.data(
      this.props.data
        ? this.initShape(this.props.data)
        : { nodes: [], edges: [] },
    );
    this.graph.render();
    if (isView && this.props.data && this.props.data.nodes) {
      this.graph.fitView(5);
    }
    this.initEvents();
  }

  initShape(data) {
    if (data && data.nodes) {
      return {
        nodes: data.nodes.map(node => {
          return {
            shape: getShapeName(node.clazz),
            ...node,
          };
        }),
        edges: data.edges,
      };
    }
    return data;
  }

  initEvents() {
    this.graph.on('afteritemselected', items => {
      if (items && items.length > 0) {
        let item = this.graph.findById(items[0]);
        if (!item) {
          item = this.getNodeInSubProcess(items[0]);
        }
        this.setState({ selectedModel: { ...item.getModel() } });
      } else {
        // this.setState({ selectedModel: this.state.processModel });
      }
    });
    const page = this.pageRef.current;
    const graph = this.graph;
    const height = this.props.height - 1;
    this.resizeFunc = () => {
      graph.changeSize(page.offsetWidth, height);
    };
    window.addEventListener('resize', this.resizeFunc);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.click)
    window.removeEventListener('resize', this.resizeFunc);
    this.graph.getNodes().forEach(node => {
      node.getKeyShape().stopAnimate();
    });
  }

  onItemCfgChange(key, value) {
    const items = this.graph.get('selectedItems');
    if (items && items.length > 0) {
      let item = this.graph.findById(items[0]);
      if (!item) {
        item = this.getNodeInSubProcess(items[0]);
      }
      if (this.graph.executeCommand) {
        this.graph.executeCommand('update', {
          itemId: items[0],
          updateModel: { [key]: value },
        });
      } else {
        this.graph.updateItem(item, { [key]: value });
      }
      this.setState({ selectedModel: { ...item.getModel() } });
    } else {
      const canvasModel = { ...this.state.selectedModel, [key]: value };
      this.setState({ selectedModel: {} });
      this.setState({ processModel: canvasModel });
    }
  }
  onFlowModelChange(value) {
    this.setState({ flowModel: value });
  }

  getNodeInSubProcess(itemId) {
    const subProcess = this.graph.find('node', node => {
      if (node.get('model')) {
        const clazz = node.get('model').clazz;
        if (clazz === 'subProcess') {
          const containerGroup = node.getContainer();
          const subGroup = containerGroup.subGroup;
          const item = subGroup.findById(itemId);
          return subGroup.contain(item);
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    if (subProcess) {
      const group = subProcess.getContainer();
      return group.getItem(subProcess, itemId);
    }
    return null;
  }

  render() {
    const height = this.props.height;
    const { isView, mode, users, groups, lang } = this.props;
    const { selectedModel, processModel } = this.state;
    const { signalDefs, messageDefs } = processModel;
    const i18n = locale[lang && lang.toLowerCase()];
    const readOnly = mode !== 'edit';
    return (
      <LangContext.Provider value={{ i18n, lang }}>
        <div className={styles.root}>
          {!isView && (
            <ToolPanel
              ref={this.toolbarRef}
              extra={
                !isView && <ItemPanel ref={this.itemPanelRef} height={height} />
              }
            />
          )}
          <div>
            <div
              ref={this.pageRef}
              className={styles.canvasPanel}
              style={{
                height,
                width: isView ? '100%' : '80%',
                marginLeft: 2,
                borderBottom: isView ? 0 : null,
              }}
            />
            {!isView && (
              <DetailPanel
                ref={this.detailPanelRef}
                // height={height}
                model={selectedModel}
                readOnly={readOnly}
                formItems={this.props.formItems}
                users={users}
                groups={groups}
                signalDefs={signalDefs}
                messageDefs={messageDefs}
                roleTree={this.props.roleTree}
                flowModel={this.props.flowModel}
                onChange={(key, val) => {
                  if (key === 'flowModel') return this.props.onFlowModelChange(val);
                  this.onItemCfgChange(key, val);
                }}
              />
            )}
          </div>
        </div>
      </LangContext.Provider>
    );
  }
};
export default MyWorkFlowDesigner;
