var sear;
(function (sear) {
    var maths;
    (function (maths) {
        /**
         * 八方向
         *
         * @author pbk
         */
        var Direction8 = /** @class */ (function () {
            function Direction8(value) {
                this._value = 0;
                this.value = value;
            }
            /** 计算两点的方向*/
            Direction8.prototype.calcXY = function (startX, startY, endX, endY) {
                startX -= endX;
                startY -= endY;
                if (startX == 0) {
                    return startY > 0 ? Direction8.UP : Direction8.DOWN;
                }
                else if (startY == 0) {
                    return startX > 0 ? Direction8.LEFT : Direction8.RIGHT;
                }
                else {
                    if (startX > 0) {
                        return startY > 0 ? Direction8.LEFT_UP : Direction8.LEFT_DOWN;
                    }
                    else {
                        return startY > 0 ? Direction8.RIGHT_UP : Direction8.RIGHT_DOWN;
                    }
                }
            };
            /** 计算两点的方向*/
            Direction8.prototype.calcPoint = function (startPos, endPos) {
                return this.calcXY(startPos.x, startPos.y, endPos.x, endPos.y);
            };
            Object.defineProperty(Direction8.prototype, "value", {
                /** 方向值*/
                get: function () {
                    return this._value;
                },
                set: function (value) {
                    this._value = (value | 0) % Direction8.MAXNUM;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Direction8.prototype, "random", {
                /** 随机方向*/
                get: function () {
                    return Math.random() * Direction8.MAXNUM;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Direction8.prototype, "opposite", {
                /** 相反方向*/
                get: function () {
                    return (this.value + 4) % Direction8.MAXNUM;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Direction8.prototype, "angle", {
                /** 方向正向角度*/
                get: function () {
                    switch (this.value) {
                        case Direction8.UP: return 0;
                        case Direction8.RIGHT_UP: return 45;
                        case Direction8.RIGHT: return 90;
                        case Direction8.RIGHT_DOWN: return 135;
                        case Direction8.DOWN: return 180;
                        case Direction8.LEFT_DOWN: return 225;
                        case Direction8.LEFT: return 270;
                        case Direction8.LEFT_UP: return 315;
                        default: return 0;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Direction8.prototype, "normal", {
                /** 方向的单位向量*/
                get: function () {
                    switch (this.value) {
                        case Direction8.UP: return new maths.Point(0, 1);
                        case Direction8.RIGHT_UP: return new maths.Point(1, 1);
                        case Direction8.RIGHT: return new maths.Point(1, 0);
                        case Direction8.RIGHT_DOWN: return new maths.Point(1, -1);
                        case Direction8.DOWN: return new maths.Point(0, -1);
                        case Direction8.LEFT_DOWN: return new maths.Point(-1, -1);
                        case Direction8.LEFT: return new maths.Point(-1, 0);
                        case Direction8.LEFT_UP: return new maths.Point(-1, 1);
                        default: return new maths.Point(0, 0);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Direction8.NONE = -1;
            Direction8.UP = 0;
            Direction8.RIGHT_UP = 1;
            Direction8.RIGHT = 2;
            Direction8.RIGHT_DOWN = 3;
            Direction8.DOWN = 4;
            Direction8.LEFT_DOWN = 5;
            Direction8.LEFT = 6;
            Direction8.LEFT_UP = 7;
            Direction8.MAXNUM = 8;
            return Direction8;
        }());
        maths.Direction8 = Direction8;
    })(maths = sear.maths || (sear.maths = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Direction8.js.map