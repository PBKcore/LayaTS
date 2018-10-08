var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var Event = sear.Event;
        var TreeItem = ui.tree.TreeItem;
        var KeyItemCtrl = ui.comkey.KeyItemCtrl;
        var UIBound = ui.select.UIBound;
        var HashList = sear.struct.HashList;
        /**
         * 单个组件控制
         *
         * @author pbk
         */
        var ComponentCtrl = /** @class */ (function () {
            function ComponentCtrl(data, uiIns) {
                if (uiIns === void 0) { uiIns = null; }
                // ============================================================ 树状图组件项
                // ----------------------------------------------- 树状结构
                this._parent = null; // 父节点
                this._childs = []; // 子节点列表
                this._index = -1;
                this._selected = false;
                this._isOpen = false;
                this._config = data;
                this.setUIInstance(uiIns);
                this.initParam();
                this.initTreeItem();
            }
            ComponentCtrl.prototype.destroy = function (destroyChild) {
                if (destroyChild === void 0) { destroyChild = true; }
                this._config = null;
                if (destroyChild) {
                    for (var _i = 0, _a = this._childs; _i < _a.length; _i++) {
                        var item = _a[_i];
                        item.destroy(destroyChild);
                    }
                }
                this._parent = null;
                this._childs.length = 0;
                this._childs = null;
                this._uiIns.destroy(destroyChild);
                this._uiIns = null;
                this._treeItem.destroy(destroyChild);
                this._treeItem = null;
                for (var _b = 0, _c = this._paramMap.values; _b < _c.length; _b++) {
                    var keyCtrl_1 = _c[_b];
                    keyCtrl_1.destroy();
                }
                this._paramMap.clear();
                this._paramMap = null;
                if (this._uiBound) {
                    this._uiBound.destroy();
                    this._uiBound = null;
                }
            };
            ComponentCtrl.prototype.clone = function () {
                var ret = new ComponentCtrl(this.config, this._uiIns["clone"]());
                for (var _i = 0, _a = this._childs; _i < _a.length; _i++) {
                    var child = _a[_i];
                    ret.addChild(child.clone());
                }
                return ret;
            };
            Object.defineProperty(ComponentCtrl.prototype, "config", {
                get: function () {
                    return this._config;
                },
                enumerable: true,
                configurable: true
            });
            ComponentCtrl.prototype.setUIInstance = function (uiIns) {
                if (uiIns === void 0) { uiIns = null; }
                uiIns || (uiIns = new this._config.uiClass());
                this._uiIns = uiIns;
                this._uiIns.on(Event.DRAG_START, this, this.onDragStart);
                this._uiIns.on(Event.DRAG_END, this, this.onDragEnd);
            };
            /** 修改属性值*/
            ComponentCtrl.prototype.setValue = function (key, value, isRecord, force) {
                if (isRecord === void 0) { isRecord = true; }
                if (force === void 0) { force = false; }
                var keyItem = this.getParam(key);
                if (keyItem) {
                    keyItem.setValue(value, isRecord, force);
                }
            };
            Object.defineProperty(ComponentCtrl.prototype, "uiIns", {
                get: function () {
                    return this._uiIns;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComponentCtrl.prototype, "name", {
                /** 组件名字*/
                get: function () {
                    return this._uiIns.name;
                },
                enumerable: true,
                configurable: true
            });
            ComponentCtrl.prototype.onDragStart = function () {
                uitool.selectCtrl.dragStart(this);
            };
            ComponentCtrl.prototype.onDragEnd = function () {
                uitool.selectCtrl.dragEnd(this);
            };
            ComponentCtrl.prototype.updateBound = function () {
                if (this.selected) {
                    this._uiBound || (this._uiBound = new UIBound(this));
                    this._uiBound.updateShow();
                    this._uiIns.addChild(this._uiBound);
                }
                else {
                    if (this._uiBound) {
                        this._uiBound.removeSelf();
                    }
                }
            };
            ComponentCtrl.prototype.initParam = function () {
                this._paramMap = new HashList();
                for (var _i = 0, _a = this._config.keys; _i < _a.length; _i++) {
                    var comKey = _a[_i];
                    this._paramMap.add(comKey.key, new KeyItemCtrl(comKey, this));
                }
            };
            ComponentCtrl.prototype.getParam = function (key) {
                return this._paramMap.get(key);
            };
            Object.defineProperty(ComponentCtrl.prototype, "params", {
                get: function () {
                    return this._paramMap.values;
                },
                enumerable: true,
                configurable: true
            });
            ComponentCtrl.prototype.addChild = function (child, isRecord) {
                if (isRecord === void 0) { isRecord = true; }
                this.addChildAt(child, this.childCount, isRecord);
            };
            ComponentCtrl.prototype.addChildAt = function (child, index, isRecord) {
                if (isRecord === void 0) { isRecord = true; }
                if (!child) {
                    return;
                }
                if (index < 0) {
                    index = 0;
                }
                else if (index > this.childCount) {
                    index = this.childCount;
                }
                var orders = [child.parent, child._index];
                if (child.parent) {
                    // 有父对象
                    if (child.parent === this) {
                        if (index == this.childCount) { // 添加到末尾
                            if (child._index + 1 == index) {
                                return; // 当前以及是最后一个
                            }
                            index = this.childCount - 1;
                        }
                        else {
                            if (child._index == index) {
                                return; // 当前是统一位置
                            }
                        }
                        this._childs.splice(child._index, 1);
                    }
                    else {
                        child.parent._childs.splice(child._index, 1);
                    }
                    this._childs.splice(index, 0, child);
                }
                else {
                    this._childs.push(child);
                }
                child.parent = this;
                this.updateChildIndex();
                if (isRecord) {
                    orders.push(this, child._index);
                    uitool.record.recordOrder(uitool.record.ADD, child, orders);
                }
                this._uiIns.addChildAt(child._uiIns, index);
                uitool.panelCtrl.treeCtrl.updateShowLater();
            };
            ComponentCtrl.prototype.removeChild = function (child, isRecord) {
                if (isRecord === void 0) { isRecord = true; }
                if (!child || child.parent != this) {
                    return;
                }
                if (isRecord) {
                    uitool.record.recordOrder(uitool.record.DELETE, child, [this, child._index]);
                }
                this._childs.splice(child._index, 1);
                child.parent = null;
                this.updateChildIndex();
                this._uiIns.removeSelf();
                uitool.panelCtrl.treeCtrl.updateShowLater();
                uitool.selectCtrl.unselect(child);
            };
            ComponentCtrl.prototype.removeSelf = function () {
                if (this._parent) {
                    this._parent.removeChild(this);
                }
                else {
                    uitool.panelCtrl.treeCtrl.delHead(this);
                }
            };
            ComponentCtrl.prototype.updateChildIndex = function () {
                for (var i = 0, len = this._childs.length; i < len; ++i) {
                    this._childs[i]._index = i;
                }
            };
            /** 组件层级前移*/
            ComponentCtrl.prototype.toTop = function () {
                if (!this._parent) {
                    return;
                }
                this._parent.addChildAt(this, this._index - 1);
            };
            /** 组件层次后移*/
            ComponentCtrl.prototype.toBottom = function () {
                if (!this._parent) {
                    return;
                }
                this._parent.addChildAt(this, this._index + 1);
            };
            Object.defineProperty(ComponentCtrl.prototype, "parent", {
                get: function () {
                    return this._parent;
                },
                set: function (value) {
                    this._parent = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComponentCtrl.prototype, "childs", {
                get: function () {
                    return this._childs;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComponentCtrl.prototype, "childCount", {
                /** 子节点数*/
                get: function () {
                    return this._childs.length;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComponentCtrl.prototype, "index", {
                /** 节点列表位置*/
                get: function () {
                    return this._index;
                },
                enumerable: true,
                configurable: true
            });
            ComponentCtrl.prototype.initTreeItem = function () {
                this._treeItem = new TreeItem(this);
            };
            Object.defineProperty(ComponentCtrl.prototype, "treeItem", {
                get: function () {
                    return this._treeItem;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComponentCtrl.prototype, "treeItemWidth", {
                get: function () {
                    return this._treeItem.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComponentCtrl.prototype, "treeItemHeight", {
                get: function () {
                    return this._treeItem.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComponentCtrl.prototype, "selected", {
                /** 是否已选择该控件*/
                get: function () {
                    return this._selected;
                },
                set: function (value) {
                    if (this._selected == value) {
                        return;
                    }
                    this._selected = value;
                    this._treeItem.updateShow();
                    this.updateBound();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComponentCtrl.prototype, "isOpen", {
                /** 是否开启显示子控件*/
                get: function () {
                    return this._isOpen;
                },
                set: function (value) {
                    if (this._isOpen == value) {
                        return;
                    }
                    this._isOpen = value;
                },
                enumerable: true,
                configurable: true
            });
            return ComponentCtrl;
        }());
        ui.ComponentCtrl = ComponentCtrl;
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=ComponentCtrl.js.map