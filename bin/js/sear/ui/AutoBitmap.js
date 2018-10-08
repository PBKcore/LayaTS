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
        var layaAutoBitmap = laya.ui.AutoBitmap;
        /**
         * [组件]
         *
         * @author pbk
         */
        var AutoBitmap = /** @class */ (function (_super) {
            __extends(AutoBitmap, _super);
            function AutoBitmap() {
                var _this = _super.call(this) || this;
                _this._offx = 0;
                _this._offy = 0;
                _this._scaleX = 1;
                _this._scaleY = 1;
                return _this;
            }
            AutoBitmap.prototype.drawTexture = function (tex, x, y, width, height, m, alpha) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                if (m === void 0) { m = null; }
                if (alpha === void 0) { alpha = 1; }
                return _super.prototype.drawTexture.call(this, tex, x + this.offx, y + this.offy, width, height, m, alpha);
            };
            AutoBitmap.prototype.cleanByTexture = function (tex, x, y, width, height) {
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                return _super.prototype.cleanByTexture.call(this, tex, x + this.offx, y + this.offy, width, height);
            };
            AutoBitmap.prototype.fillTexture = function (tex, x, y, width, height, type, offset) {
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                if (type === void 0) { type = "repeat"; }
                if (offset === void 0) { offset = null; }
                return _super.prototype.fillTexture.call(this, tex, x + this.offx, y + this.offy, width, height, type, offset);
            };
            Object.defineProperty(AutoBitmap.prototype, "width", {
                get: function () {
                    return sear.superGet(layaAutoBitmap, this, "width") * this._scaleX;
                },
                set: function (value) {
                    sear.superSet(layaAutoBitmap, this, "width", value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AutoBitmap.prototype, "height", {
                get: function () {
                    return sear.superGet(layaAutoBitmap, this, "height") * this._scaleY;
                },
                set: function (value) {
                    sear.superSet(layaAutoBitmap, this, "height", value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AutoBitmap.prototype, "scaleX", {
                get: function () {
                    return this._scaleX;
                },
                set: function (value) {
                    if (this._scaleX != value) {
                        this._scaleX = value;
                        this._setChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AutoBitmap.prototype, "scaleY", {
                get: function () {
                    return this._scaleY;
                },
                set: function (value) {
                    if (this._scaleY != value) {
                        this._scaleY = value;
                        this._setChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AutoBitmap.prototype, "offx", {
                get: function () {
                    return this._offx + (this._scaleX == 1 ? 0 : sear.superGet(layaAutoBitmap, this, "width") * (1 - this._scaleX) * 0.5);
                },
                set: function (value) {
                    if (this._offx != value) {
                        this._offx = value;
                        this._setChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AutoBitmap.prototype, "offy", {
                get: function () {
                    return this._offy + (this._scaleY == 1 ? 0 : sear.superGet(layaAutoBitmap, this, "height") * (1 - this._scaleY) * 0.5);
                },
                set: function (value) {
                    if (this._offy != value) {
                        this._offy = value;
                        this._setChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            return AutoBitmap;
        }(layaAutoBitmap));
        ui.AutoBitmap = AutoBitmap;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=AutoBitmap.js.map