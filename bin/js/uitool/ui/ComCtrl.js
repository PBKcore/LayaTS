var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var Event = sear.Event;
        /**
         * 组件实例修改控制器
         *
         * @author pbk
         */
        var ComCtrl = /** @class */ (function () {
            function ComCtrl(config, parent) {
                this._config = config;
                this._comUI = new config.uiClass();
                this.setParent(parent, -1);
                this.comUI.on(Event.DRAG_START, this, this.onDragStart);
                this.comUI.on(Event.DRAG_END, this, this.onDragEnd);
            }
            ComCtrl.prototype.destroy = function () {
                if (this._comUI) {
                    this._comUI.destroy();
                    this._comUI = null;
                }
                this._config = null;
            };
            /** 添加/修改父容器，修改层级*/
            ComCtrl.prototype.setParent = function (parent, layer) {
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
            ComCtrl.prototype.delParent = function () {
                if (!this.comUI.parent) {
                    return;
                }
                uitool.record.recordOrder(this, uitool.record.DELETE, [this.comUI.parent, this.comUI.getChildIndex(this.comUI)]);
                this.comUI.removeSelf();
            };
            /** 修改属性值*/
            ComCtrl.prototype.setValue = function (key, value) {
                if (this.comUI[key] == value) {
                    return;
                }
                uitool.record.recordOrder(this, uitool.record.CHANGE, [key, this.comUI[key], value]);
                this.comUI[key] = value;
            };
            ComCtrl.prototype.onDragStart = function () {
                this._dragX = this.comUI.x;
                this._dragY = this.comUI.y;
            };
            ComCtrl.prototype.onDragEnd = function () {
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
            Object.defineProperty(ComCtrl.prototype, "comUI", {
                get: function () {
                    return this._comUI;
                },
                enumerable: true,
                configurable: true
            });
            return ComCtrl;
        }());
        ui.ComCtrl = ComCtrl;
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=ComCtrl.js.map