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
         *
         *
         * @author pbk
         */
        var UIGroup = /** @class */ (function (_super) {
            __extends(UIGroup, _super);
            function UIGroup() {
                return _super.call(this) || this;
            }
            return UIGroup;
        }(laya.ui.UIGroup));
        ui.UIGroup = UIGroup;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=UIGroup.js.map