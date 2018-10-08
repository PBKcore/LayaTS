var sear;
(function (sear) {
    var math;
    (function (math) {
        /**
         * 矩形
         *
         * @author pbk
         */
        var Rectangle = /** @class */ (function () {
            function Rectangle(x, y, width, height) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                this.setTo(x, y, width, height);
            }
            Rectangle.prototype.setTo = function (x, y, width, height) {
                this._x = x;
                this._y = y;
                this._width = width;
                this._height = height;
            };
            Rectangle.prototype.contains = function (x, y) {
                return x >= this.x && x <= this.right && y >= this.y && y <= this.bottom;
            };
            Rectangle.prototype.intersects = function (rect) {
                return !(rect.x > this.right || rect.right < this.x || rect.y > rect.bottom || rect.bottom < this.y);
            };
            Object.defineProperty(Rectangle.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (value) {
                    this._x = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (value) {
                    this._y = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "right", {
                get: function () {
                    return this.x + this.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "bottom", {
                get: function () {
                    return this.y + this.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "isEmpty", {
                get: function () {
                    return this.width <= 0 || this.height <= 0;
                },
                enumerable: true,
                configurable: true
            });
            return Rectangle;
        }());
        math.Rectangle = Rectangle;
    })(math = sear.math || (sear.math = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Rectangle.js.map