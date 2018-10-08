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
         * [组件]
         *
         * @author pbk
         */
        var HScrollBar = /** @class */ (function (_super) {
            __extends(HScrollBar, _super);
            function HScrollBar() {
                return _super.call(this) || this;
            }
            HScrollBar.prototype.clone = function (ret) {
                if (ret === void 0) { ret = null; }
                ret || (ret = new HScrollBar());
                _super.prototype.clone.call(this, ret);
                return ret;
            };
            HScrollBar.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.slider.isVertical = false;
            };
            return HScrollBar;
        }(ui.VScrollBar));
        ui.HScrollBar = HScrollBar;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=HScrollBar.js.map