var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var tree;
        (function (tree) {
            var Sprite = sear.Sprite;
            var Event = sear.Event;
            var BindPosition = sear.tools.BindPosition;
            var Layout = sear.ui.Layout;
            var dragCtrl = null;
            var bindPos = null;
            var bindFrame = null;
            function startDrag(ctrl) {
                if (dragCtrl != ctrl) {
                    if (!bindFrame) {
                        bindFrame = sysui.getLabel(ctrl.treeItemWidth, ctrl.treeItemHeight);
                        bindFrame.align = Layout.ALIGN_CENTER;
                        bindFrame.valign = Layout.VALIGN_MIDDLE;
                        bindFrame.borderColor = "#ff0000";
                    }
                    if (!bindFrame.parent) {
                        sear.stage.addChild(bindFrame);
                    }
                    bindFrame.text = ctrl.name;
                    bindPos || (bindPos = new BindPosition());
                    bindPos.bind(bindFrame);
                }
            }
            function stopDrag() {
                if (bindPos) {
                    bindPos.unloadAll();
                }
                if (bindFrame) {
                    bindFrame.removeSelf();
                }
            }
            /**
             * 树状图显示项
             *
             * @author pbk
             */
            var TreeItem = /** @class */ (function (_super) {
                __extends(TreeItem, _super);
                function TreeItem(ctrl) {
                    var _this = _super.call(this) || this;
                    // 拖动
                    _this._isDown = false;
                    // -----------------------------------------------
                    _this._isOver = false;
                    _this._moveType = 0; // 0中；1上；2下
                    _this._ctrl = ctrl;
                    _this.height = 20;
                    _this._labName = sysui.getLabel(50, _this.height);
                    _this._labName.x = 0;
                    _this._labName.y = 0;
                    _this.addChild(_this._labName);
                    _this.on(Event.CLICK, _this, _this.onClick);
                    _this.on(Event.MOUSE_DOWN, _this, _this.onDown);
                    _this.on(Event.MOUSE_UP, _this, _this.onUp);
                    _this.on(Event.DOUBLE_CLICK, _this, _this.onDoubleClick);
                    _this.on(Event.MOUSE_OVER, _this, _this.onOver);
                    _this.on(Event.MOUSE_OUT, _this, _this.onOut);
                    _this.on(Event.MOUSE_MOVE, _this, _this.onMove);
                    _this.updateShow();
                    return _this;
                }
                TreeItem.prototype.destroy = function (destroyChild) {
                    if (destroyChild === void 0) { destroyChild = true; }
                    this._ctrl = null;
                    _super.prototype.destroy.call(this, destroyChild);
                };
                // ================================================================================== 树状分支显示控件
                TreeItem.prototype.updateShow = function () {
                    var name = this._ctrl.name;
                    if (!this._ctrl.isOpen && this._ctrl.childCount > 0) {
                        name += ("(" + this._ctrl.childCount + ")");
                    }
                    this._labName.name = name;
                    this.graphics.clear();
                    var color;
                    if (this._isOver) {
                        color = "#949494";
                    }
                    else if (this._ctrl.selected) {
                        color = "#f6cb38";
                    }
                    else {
                        color = "#ffffff";
                    }
                    this.width = Math.max(this._labName.textWidth + 2, 50);
                    this.graphics.drawRect(0, 0, this.width, this.height, color);
                    if (this._moveType == 1) {
                        this.graphics.drawLine(0, 0, this.width, 0, "#000000");
                    }
                    else if (this._moveType == 2) {
                        this.graphics.drawLine(0, this.height, this.width, this.height, "#000000");
                    }
                };
                // ==================================================================================
                // 选中当前组件
                TreeItem.prototype.onClick = function () {
                    uitool.selectCtrl.select(this._ctrl, false);
                };
                // 选中并开关子节点
                TreeItem.prototype.onDoubleClick = function () {
                    this._ctrl.isOpen = !this._ctrl.isOpen;
                    uitool.selectCtrl.select(this._ctrl, true);
                };
                TreeItem.prototype.onDown = function () {
                    this._isDown = true;
                    sear.stage.on(Event.MOUSE_UP, this, this.onUpStage);
                };
                TreeItem.prototype.onUpStage = function () {
                    sear.stage.off(Event.MOUSE_UP, this, this.onUpStage);
                    stopDrag();
                    this._isDown = false;
                };
                // 放下
                TreeItem.prototype.onUp = function () {
                    if (dragCtrl != this._ctrl) {
                        uitool.record.recordNew();
                        if (this._moveType == 1) {
                            // 上一层
                            this._ctrl.addChildAt(dragCtrl, this._ctrl.index - 1);
                        }
                        else if (this._moveType == 2) {
                            // 下一层
                            this._ctrl.addChildAt(dragCtrl, this._ctrl.index + 1);
                        }
                        else {
                            // 子对象
                            this._ctrl.addChild(dragCtrl);
                        }
                    }
                    stopDrag();
                    this._isDown = false;
                };
                TreeItem.prototype.onOver = function () {
                    this._isOver = true;
                };
                TreeItem.prototype.onOut = function () {
                    this._isOver = false;
                    this.moveType = 0;
                };
                TreeItem.prototype.onMove = function (e) {
                    if (this._isOver) {
                        var mY = e.currentTarget.mouseY;
                        if (mY < 5) {
                            this.moveType = 1;
                        }
                        else if (mY > this.height - 5) {
                            this.moveType = 2;
                        }
                        else {
                            this.moveType = 0;
                        }
                    }
                    if (this._isDown) {
                        startDrag(this._ctrl);
                    }
                };
                Object.defineProperty(TreeItem.prototype, "moveType", {
                    set: function (value) {
                        if (this._moveType == value) {
                            return;
                        }
                        this._moveType = value;
                        this.updateShow();
                    },
                    enumerable: true,
                    configurable: true
                });
                return TreeItem;
            }(Sprite));
            tree.TreeItem = TreeItem;
        })(tree = ui.tree || (ui.tree = {}));
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=TreeItem.js.map