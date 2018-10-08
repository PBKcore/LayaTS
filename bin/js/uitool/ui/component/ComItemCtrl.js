var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var component;
        (function (component) {
            var Event = sear.Event;
            /**
             * 单个组件控件
             *
             * @author pbk
             */
            var ComItemCtrl = /** @class */ (function () {
                function ComItemCtrl() {
                }
                ComItemCtrl.prototype.destroy = function () {
                };
                ComItemCtrl.prototype.setComUI = function (comUI) {
                    this._comUI = comUI;
                    this._comUI.on(Event.DRAG_START, this, this.onDragStart);
                    this._comUI.on(Event.DRAG_END, this, this.onDragEnd);
                };
                /** 添加/修改父容器，修改层级*/
                ComItemCtrl.prototype.setParent = function (parent, layer) {
                    if (this.comUI.parent == parent && parent.getChildIndex(this.comUI) == layer) {
                        return;
                    }
                    var orders = [this.comUI.parent, this.comUI.parent ? this.comUI.parent.getChildIndex(this.comUI) : 0];
                    if (layer == -1) {
                        parent.addChild(this.comUI);
                    }
                    else {
                        parent.addChildAt(this.comUI, layer);
                    }
                    orders.push(parent, parent.getChildIndex(this.comUI));
                    uitool.record.recordOrder(this, uitool.record.ADD, orders);
                };
                /** 删除对象*/
                ComItemCtrl.prototype.delParent = function () {
                    if (!this.comUI.parent) {
                        return;
                    }
                    uitool.record.recordOrder(this, uitool.record.DELETE, [this.comUI.parent, this.comUI.getChildIndex(this.comUI)]);
                    this.comUI.removeSelf();
                };
                /** 修改属性值*/
                ComItemCtrl.prototype.setValue = function (key, value) {
                    if (this.comUI[key] == value) {
                        return;
                    }
                    uitool.record.recordOrder(this, uitool.record.CHANGE, [key, this.comUI[key], value]);
                    this.comUI[key] = value;
                };
                Object.defineProperty(ComItemCtrl.prototype, "comUI", {
                    get: function () {
                        return this._comUI;
                    },
                    enumerable: true,
                    configurable: true
                });
                ComItemCtrl.prototype.onDragStart = function () {
                    this._dragX = this.comUI.x;
                    this._dragY = this.comUI.y;
                };
                ComItemCtrl.prototype.onDragEnd = function () {
                    if (this.comUI.x == this._dragX) {
                        if (this.comUI.y == this._dragY) {
                            return;
                        }
                        else {
                            uitool.record.recordOrder(this, uitool.record.CHANGE, ["y", this._dragY, this.comUI.y]);
                        }
                    }
                    else {
                        if (this.comUI.y == this._dragY) {
                            uitool.record.recordOrder(this, uitool.record.CHANGE, ["x", this._dragX, this.comUI.x]);
                        }
                        else {
                            uitool.record.recordOrder(this, uitool.record.CHANGE, ["x", this._dragX, this.comUI.x, "y", this._dragY, this.comUI.y]);
                        }
                    }
                };
                return ComItemCtrl;
            }());
            component.ComItemCtrl = ComItemCtrl;
        })(component = ui.component || (ui.component = {}));
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=ComItemCtrl.js.map