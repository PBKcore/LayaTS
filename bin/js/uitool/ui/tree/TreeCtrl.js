var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var tree;
        (function (tree) {
            /**
             * 组件节点树控制（增删查改）
             *
             * @author pbk
             */
            var TreeCtrl = /** @class */ (function () {
                function TreeCtrl() {
                }
                TreeCtrl.prototype.clean = function () {
                    if (this._headNode) {
                        this.delHead(this._headNode);
                    }
                };
                /**
                 * 添加一个新组件，添加一个节点，会判空
                 * @param itemCtrl
                 * @param treeCtrl
                 */
                TreeCtrl.prototype.addNode = function (itemCtrl, treeCtrl) {
                    if (this._headNode) {
                        if (treeCtrl) {
                            treeCtrl.addChild(itemCtrl);
                        }
                        else {
                            this._headNode.addChild(itemCtrl);
                        }
                    }
                    else {
                        this.addHead(itemCtrl);
                    }
                };
                TreeCtrl.prototype.addHead = function (head, isRecord) {
                    if (isRecord === void 0) { isRecord = true; }
                    if (this._headNode) {
                        sear.error("Tree Head node add reapt!");
                        return;
                    }
                    if (isRecord) {
                        uitool.record.recordOrder(uitool.record.ADD, this._headNode, [null, 0, null, 0]);
                    }
                    this._headNode = head;
                    uitool.mainUI.layerShow.addChild(head.uiIns);
                    this.updateShowLater();
                };
                TreeCtrl.prototype.delHead = function (head, isRecord) {
                    if (isRecord === void 0) { isRecord = true; }
                    if (!this._headNode) {
                        sear.error("Tree Head node delete null!");
                        return;
                    }
                    else if (this._headNode != head) {
                        sear.error("Tree Head node delete different!");
                        return;
                    }
                    if (isRecord) {
                        uitool.record.recordOrder(uitool.record.DELETE, this._headNode, [null, 0]);
                    }
                    this._headNode.uiIns.removeSelf();
                    this._headNode = null;
                    this.updateShowLater();
                    uitool.selectCtrl.cancel();
                };
                TreeCtrl.prototype.updateShowLater = function () {
                    sear.callLater(this, this.updateShow);
                };
                TreeCtrl.prototype.updateShow = function () {
                    this.scroll.removeAllChilds(false);
                    this.showNode(this._headNode, 0, 0);
                };
                TreeCtrl.prototype.showNode = function (node, offY, layer) {
                    if (node) {
                        node.treeItem.x = layer * 20;
                        node.treeItem.y = offY;
                        offY += node.treeItemHeight;
                        this.scroll.addChild(node.treeItem);
                        layer += 1;
                        for (var _i = 0, _a = node.childs; _i < _a.length; _i++) {
                            var child = _a[_i];
                            offY = this.showNode(child, offY, layer);
                        }
                    }
                    return offY;
                };
                Object.defineProperty(TreeCtrl.prototype, "scroll", {
                    /** 滚动容器*/
                    get: function () {
                        return uitool.mainUI.scrollTree;
                    },
                    enumerable: true,
                    configurable: true
                });
                // ==================================================================================
                /** 根据名字查找组件*/
                TreeCtrl.prototype.find = function (name) {
                    return this.findNode(this._headNode, name);
                    ;
                };
                TreeCtrl.prototype.findNode = function (node, name) {
                    if (!node) {
                        return null;
                    }
                    if (node.name == name) {
                        return node;
                    }
                    for (var _i = 0, _a = node.childs; _i < _a.length; _i++) {
                        var child = _a[_i];
                        child = this.findNode(child, name);
                        if (child) {
                            return child;
                        }
                    }
                    return null;
                };
                return TreeCtrl;
            }());
            tree.TreeCtrl = TreeCtrl;
        })(tree = ui.tree || (ui.tree = {}));
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=TreeCtrl.js.map