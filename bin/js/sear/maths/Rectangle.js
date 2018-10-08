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
    var maths;
    (function (maths) {
        /**
         * 矩形
         *
         * @author pbk
         */
        var Rectangle = /** @class */ (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle(x, y, width, height) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                return _super.call(this, x, y, width, height) || this;
            }
            return Rectangle;
        }(laya.maths.Rectangle));
        maths.Rectangle = Rectangle;
    })(maths = sear.maths || (sear.maths = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Rectangle.js.map