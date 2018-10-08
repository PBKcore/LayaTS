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
         * 二维坐标，x表示水平轴，y表示垂直轴
         *
         * @author pbk
         */
        var Point = /** @class */ (function (_super) {
            __extends(Point, _super);
            function Point(x, y) {
                if (x === void 0) { x = 0.0; }
                if (y === void 0) { y = 0.0; }
                return _super.call(this, x, y) || this;
            }
            Point.prototype.clone = function () {
                var ret = new Point();
                ret.x = this.x;
                ret.y = this.y;
                return ret;
            };
            Object.defineProperty(Point.prototype, "isZero", {
                /** 是否在(0, 0)点*/
                get: function () {
                    return this.x == 0 && this.y == 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Point.prototype, "xInt", {
                /** 整形x坐标*/
                set: function (value) {
                    this.x = value | 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Point.prototype, "yInt", {
                /** 整形y坐标*/
                set: function (value) {
                    this.y = value | 0;
                },
                enumerable: true,
                configurable: true
            });
            /** 临时数据。（建议在单个执行单元中使用，避免递归和回调使用）*/
            Point.TEMP = new Point();
            return Point;
        }(laya.maths.Point));
        maths.Point = Point;
    })(maths = sear.maths || (sear.maths = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Point.js.map