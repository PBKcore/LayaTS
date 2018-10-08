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
var sear;
(function (sear) {
    var ui;
    (function (ui) {
        /**
         * 状态按钮
         * 未选择是up状态；选中时down状态
         *
         * @author pbk
         */
        var StateButton = /** @class */ (function (_super) {
            __extends(StateButton, _super);
            function StateButton() {
                var _this = _super.call(this) || this;
                _this.group = null;
                return _this;
            }
            StateButton.prototype.clone = function (ret) {
                if (ret === void 0) { ret = null; }
                ret || (ret = new StateButton());
                _super.prototype.clone.call(this, ret);
                ret.group = this.group;
                ret.dispatcher = this.dispatcher;
                return ret;
            };
            StateButton.prototype.destroy = function (destroyChild) {
                if (destroyChild === void 0) { destroyChild = true; }
                if (!this.dispatcher) {
                    this.dispatcher.destroy();
                    this.dispatcher = null;
                }
                _super.prototype.destroy.call(this, destroyChild);
            };
            Object.defineProperty(StateButton.prototype, "selected", {
                set: function (value) {
                    if (this._selected != value) {
                        this._selected = value;
                        this.state = this._selected ? 2 : 0;
                        this.checkGroup();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StateButton.prototype, "selectedMute", {
                set: function (value) {
                    if (this._selected != value) {
                        this._selected = value;
                        this.state = this._selected ? 2 : 0;
                    }
                },
                enumerable: true,
                configurable: true
            });
            StateButton.prototype.checkGroup = function () {
                if (!this.selected || !this.group || !this.parent) {
                    this.event(sear.Event.CHANGE);
                    return;
                }
                for (var _i = 0, _a = this.parent._childs; _i < _a.length; _i++) {
                    var child = _a[_i];
                    if (child instanceof StateButton && child.group == this.group && child != this) {
                        child.selectedMute = false;
                    }
                }
                if (this.dispatcher) {
                    this.dispatcher.event(sear.Event.CHANGE, this);
                }
            };
            return StateButton;
        }(ui.Button));
        ui.StateButton = StateButton;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=StateButton.js.map