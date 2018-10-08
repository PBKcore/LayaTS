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
    var display;
    (function (display) {
        /**
         *
         *
         * @author pbk
         */
        var Stage = /** @class */ (function (_super) {
            __extends(Stage, _super);
            function Stage() {
                return _super.call(this) || this;
            }
            return Stage;
        }(laya.display.Stage));
        display.Stage = Stage;
    })(display = sear.display || (sear.display = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Stage.js.map