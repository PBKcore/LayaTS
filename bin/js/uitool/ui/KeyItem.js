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
        var Sprite = sear.Sprite;
        var Event = sear.Event;
        var ComKey = uitool.config.ComKey;
        /**
         * 组件的一条属性
         *
         * @author pbk
         */
        var KeyItem = /** @class */ (function (_super) {
            __extends(KeyItem, _super);
            function KeyItem() {
                var _this = _super.call(this) || this;
                _this.on(Event.BLUR, _this, _this.onBlur);
                return _this;
            }
            KeyItem.prototype.setData = function (ctrl, config) {
                this._ctrl = ctrl;
                this._config = config;
            };
            KeyItem.prototype.clear = function () {
                this._ctrl = null;
                this._config = null;
            };
            Object.defineProperty(KeyItem.prototype, "value", {
                get: function () {
                    if (this._config.type == ComKey.number) {
                        return parseInt("");
                    }
                    else {
                        return "";
                    }
                },
                enumerable: true,
                configurable: true
            });
            KeyItem.prototype.onBlur = function () {
                this._ctrl.setValue(this._config.key, this.value);
            };
            return KeyItem;
        }(Sprite));
        ui.KeyItem = KeyItem;
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=KeyItem.js.map