var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var tree;
        (function (tree) {
            /**
             * 树状结构图控件
             *
             * @author pbk
             */
            var TreeItemCtrl = /** @class */ (function () {
                function TreeItemCtrl() {
                    // ================================================================================== 树形节点相关
                    this._parent = null; // 父节点
                    this._childs = []; // 子节点列表
                    this._selected = false;
                    this._isOpen = false;
                }
                TreeItemCtrl.prototype.destroy = function (destroyChild) {
                    if (destroyChild === void 0) { destroyChild = true; }
                    if (destroyChild) {
                        if (this._parent) {
                            this._parent.destroy(destroyChild);
                        }
                        for (var _i = 0, _a = this._childs; _i < _a.length; _i++) {
                            var item = _a[_i];
                            item.destroy(destroyChild);
                        }
                    }
                    this._parent = null;
                    this._childs.length = 0;
                    this._childs = null;
                    this._comItemCtrl.destroy();
                    this._comItemCtrl = null;
                    this._treeItem.destroy(destroyChild);
                    this._treeItem = null;
                };
                TreeItemCtrl.prototype.setComItemCtrl = function (comItemCtrl) {
                    this._comItemCtrl = comItemCtrl;
                };
                Object.defineProperty(TreeItemCtrl.prototype, "comItemCtrl", {
                    get: function () {
                        return this._comItemCtrl;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeItemCtrl.prototype, "name", {
                    /** 当前控件名*/
                    get: function () {
                        return this._comItemCtrl.comUI.name;
                    },
                    enumerable: true,
                    configurable: true
                });
                TreeItemCtrl.prototype.addChild = function (child) {
                    if (!child) {
                        return;
                    }
                };
                TreeItemCtrl.prototype.addChildAt = function (child, index) {
                };
                TreeItemCtrl.prototype.delChild = function (child) {
                    if (!child) {
                        return;
                    }
                };
                Object.defineProperty(TreeItemCtrl.prototype, "parent", {
                    get: function () {
                        return this._parent;
                    },
                    set: function (value) {
                        this._parent = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeItemCtrl.prototype, "childCount", {
                    /** 子节点数*/
                    get: function () {
                        return this._childs.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeItemCtrl.prototype, "index", {
                    /** 节点列表位置*/
                    get: function () {
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                TreeItemCtrl.prototype.setTreeItem = function (item) {
                    this._treeItem = item;
                    item.setItemCtrl(this);
                };
                Object.defineProperty(TreeItemCtrl.prototype, "width", {
                    get: function () {
                        return this._treeItem.width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeItemCtrl.prototype, "height", {
                    get: function () {
                        return this._treeItem.height;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeItemCtrl.prototype, "selected", {
                    /** 是否已选择该控件*/
                    get: function () {
                        return this._selected;
                    },
                    set: function (value) {
                        if (this._selected == value) {
                            return;
                        }
                        this._selected = value;
                        if (value) {
                            uitool.selectCtrl.select(this);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeItemCtrl.prototype, "isOpen", {
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
                return TreeItemCtrl;
            }());
            tree.TreeItemCtrl = TreeItemCtrl;
        })(tree = ui.tree || (ui.tree = {}));
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=TreeItemCtrl.js.map