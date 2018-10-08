var sear;
(function (sear) {
    var math;
    (function (math) {
        /**
         * 二维坐标，x表示水平轴，y表示垂直轴
         *
         * @author pbk
         */
        var Point = /** @class */ (function () {
            function Point(x, y) {
                if (x === void 0) { x = 0.0; }
                if (y === void 0) { y = 0.0; }
                this.x = x;
                this.y = y;
            }
            /**
             * 当前点到指定点(x, y)的距离
             * @param x
             * @param y
             */
            Point.prototype.Distance = function (x, y) {
                return Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y));
            };
            /** 标准化向量*/
            Point.prototype.Normalize = function () {
                if (this.isZero) {
                    return;
                }
                var id = 1.0 / Math.sqrt(this.x * this.x + this.y * this.y);
                this.x *= id;
                this.y *= id;
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
            return Point;
        }());
        math.Point = Point;
    })(math = sear.math || (sear.math = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Point.js.map