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
        var Rectangle = sear.math.Rectangle;
        /**
         *
         *
         * @author pbk
         */
        var RawButton = /** @class */ (function (_super) {
            __extends(RawButton, _super);
            function RawButton(skin, label) {
                if (skin === void 0) { skin = null; }
                if (label === void 0) { label = ""; }
                return _super.call(this, skin, label) || this;
            }
            /** 注册点击回调*/
            RawButton.prototype.onClick = function (caller, method, args) {
                if (args === void 0) { args = null; }
                this.clickHandler = Laya.Handler.create(caller, method, args, false);
            };
            Object.defineProperty(RawButton.prototype, "rectangle", {
                get: function () {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(RawButton.prototype, "toolTip", {
                set: function (value) {
                    this._toolTip = value;
                },
                enumerable: true,
                configurable: true
            });
            return RawButton;
        }(laya.ui.Button));
        ui.RawButton = RawButton;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=RawButton.js.map