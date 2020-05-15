import editorStyle from '../util/defaultStyle';

export default function (G6) {
  G6.registerBehavior('dragEdge', {
    getDefaultCfg() {
      return {
        updateEdge: true,
        delegate: true,
        delegateStyle: {},
        dragEdge: false,
      };
    },
    getEvents() {
      return {
        'anchor:dragstart': 'onDragStart',
        'anchor:drag': 'onDrag',
        'anchor:dragend': 'onDragEnd',
        'anchor:dragenter': 'onDragEnter',
        'anchor:dragleave': 'onDragLeave',
      };
    },
    onDragEnter(e) {
      if (!this.origin) {
        return;
      }
      if (!this.sameNode(e)) {
        e.item.setHotspotActived(true);
        this.origin.targetNode = e.target
          .getParent()
          .getParent()
          .get('item');
        this.origin.targetAnchor = e.item.get('index');
      }
    },
    onDragLeave(e) {
      if (!this.origin) {
        return;
      }
      if (!this.sameNode(e)) {
        e.item.setHotspotActived(false);
        this.origin.targetNode = null;
        this.origin.targetAnchor = null;
      }
    },
    onDragStart(e) {
      const node = e.target
        .getParent()
        .getParent()
        .get('item');
      const anchorIndex = e.item.get('index');
      const point = node.getAnchorPoints()[anchorIndex];
      this.target = e.item;
      const groupId = node.get('groupId');
      if (groupId) {
        const subProcessNode = e.target
          .getParent()
          .getParent()
          .getParent()
          .getParent()
          .get('item');
        const subProcessBBox = subProcessNode.getBBox();
        this.origin = {
          x: point.x + subProcessBBox.x + subProcessBBox.width / 2,
          y: point.y + subProcessBBox.y + subProcessBBox.height / 2,
          sourceNode: node,
          sourceAnchor: anchorIndex,
        };
        this.dragEdgeBeforeShowAnchorBySub(subProcessNode);
      } else {
        this.origin = {
          x: point.x,
          y: point.y,
          sourceNode: node,
          sourceAnchor: anchorIndex,
        };
        this.dragEdgeBeforeShowAnchor(e);
      }
      this.graph.set('onDragEdge', true);
    },
    onDrag(e) {
      if (!this.origin) {
        return;
      }
      this._updateEdge(this.target, e);
    },
    onDragEnd(e) {
      if (!this.origin) {
        return;
      }

      const delegateShape = e.item.get('edgeDelegate');
      if (delegateShape) {
        delegateShape.remove();
        this.target.set('edgeDelegate', null);
      }
      this._updateEdge(this.target, e, true);
      this.graph.setItemState(this.origin.sourceNode, 'show-anchor', false);
      this.target = null;
      this.origin = null;
      this.graph.set('onDragEdge', false);
    },
    sameNode(e) {
      return (
        e.target.type === 'marker' &&
        e.target.getParent() &&
        e.target
          .getParent()
          .getParent()
          .get('item')
          .get('id') === this.origin.sourceNode.get('id')
      );
    },
    dragEdgeBeforeShowAnchorBySub(subProcessNode) {
      const group = subProcessNode.getContainer();
      group.nodes.forEach(a => {
        const aGroup = a.getContainer();
        aGroup.showAnchor(aGroup);
        aGroup.anchorShapes.forEach(b => b.get('item').showHotpot());
      });
    },
    dragEdgeBeforeShowAnchor(e) {
      const sourceNodeModel = this.origin.sourceNode.getModel();
      const sourceGroupId = sourceNodeModel.groupId;
      if (sourceNodeModel.clazz === 'receiveTask' ||
        sourceNodeModel.clazz === 'end')
        return;

      this.graph.getNodes().forEach(node => {
        if (
          node.getModel().clazz === 'start' ||
          node.getModel().clazz === 'timerStart' ||
          node.getModel().clazz === 'messageStart'
        )
          return;
        const targetGroupId = node.getModel().groupId;
        if (
          (!sourceGroupId && targetGroupId) ||
          (sourceGroupId && !targetGroupId) ||
          sourceGroupId !== targetGroupId
        )
          return;
        const group = node.getContainer();
        group.showAnchor(group);
        group.anchorShapes.forEach(a => a.get('item').showHotpot());
      });
    },
    _updateEdge(item, e, force) {
      const x = e.x;
      const y = e.y;
      if (this.delegate && !force) {
        this._updateEdgeDelegate(item, x, y);
        return;
      }
      const node = e.target
        .getParent()
        .getParent()
        .get('item');
      const groupId = node.get('groupId');
      if (groupId) {
        this._addSubProcessEdge(node, e);
      } else {
        this._addEdge(e);
      }
      this._clearAllAnchor();
      this.graph.paint();
    },
    _updateEdgeDelegate(item, x, y) {
      const self = this;
      let edgeShape = item.get('edgeDelegate');
      if (!edgeShape) {
        const parent = self.graph.get('group');
        edgeShape = parent.addShape('line', {
          attrs: {
            x1: this.origin.x,
            y1: this.origin.y,
            x2: x,
            y2: y,
            ...editorStyle.edgeDelegationStyle,
          },
        });
        edgeShape.set('capture', false);
        item.set('edgeDelegate', edgeShape);
      }
      edgeShape.attr({ x2: x, y2: y });
      this.graph.paint();
    },
    _clearAllAnchor() {
      this.graph.getNodes().forEach(node => {
        const group = node.getContainer();
        group.clearAnchor(group);
      });
    },
    _addSubProcessEdge(node, e) {
      if (this.origin.targetNode) {
        const group = node
          .getContainer()
          .getParent()
          .getParent();
        const subProcess = node
          .getContainer()
          .getParent()
          .getParent()
          .get('item');
        const sourceId = this.origin.sourceNode.get('id');
        const targetId = this.origin.targetNode.get('id');
        const addModel = {
          id: sourceId + '_to_' + targetId,
          clazz: 'flow',
          source: sourceId,
          target: targetId,
          sourceAnchor: this.origin.sourceAnchor,
          targetAnchor: this.origin.targetAnchor,
        };
        const resultModel = group.addEdgeModel(subProcess, addModel);
        if (this.graph.executeCommand) {
          this.graph.executeCommand('update', {
            itemId: subProcess.get('id'),
            updateModel: resultModel,
          });
        } else {
          this.graph.updateItem(node, resultModel);
        }
      }
    },
    _addEdge() {
      const existEdge = this.graph.findAll('edge', (edge) => {
        const target = edge.getModel().target;
        const source = edge.getModel().source;
        if (this.origin.targetNode && target === this.origin.targetNode.get('id') &&
          source === this.origin.sourceNode.get('id')
        ) {
          return true
        }
        return false
      })
      if (existEdge.length > 0) {
        this.graph.remove(existEdge[0])
      }

      if (this.origin.targetNode) {
        const addModel = {
          clazz: 'flow',
          source: this.origin.sourceNode.get('id'),
          target: this.origin.targetNode.get('id'),
          sourceAnchor: this.origin.sourceAnchor,
          targetAnchor: this.origin.targetAnchor,
          flow: {
            conditiontype: 'undefined'
          }
        };
        if (this.graph.executeCommand) {
          this.graph.executeCommand('add', {
            type: 'edge',
            addModel: addModel,
          });
        } else {
          this.graph.add('edge', addModel);
        }
      }
    },
  });
}
