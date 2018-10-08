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
        var Rectangle = sear.maths.Rectangle;
        var ShowUtil = sear.utils.ShowUtil;
        /**
         * 进度条
         *
         * @author pbk
         */
        var ProgressBar = /** @class */ (function (_super) {
            __extends(ProgressBar, _super);
            function ProgressBar(skin) {
                if (skin === void 0) { skin = ""; }
                var _this = _super.call(this, skin) || this;
                _this._barWidth = 0;
                _this._barHeight = 0;
                return _this;
            }
            ProgressBar.prototype.clone = function (ret) {
                if (ret === void 0) { ret = null; }
                ret || (ret = new ProgressBar());
                ShowUtil.cloneComponent(this, ret);
                ret.skin = this.skin;
                ret.sizeGrid = this.sizeGrid;
                ret.barWidth = this.barWidth;
                ret.barHeight = this.barHeight;
                ret.barSkin = this.barSkin;
                ret.barSizeGrid = this.barSizeGrid;
                return ret;
            };
            ProgressBar.prototype.createChildren = function () {
                this.addChild(this._bg = new ui.Image());
                this.addChild(this._bar = new ui.Image());
                this._bar._bitmap.autoCacheCmd = false;
            };
            ProgressBar.prototype.changeValue = function () {
                if (this._bar.sizeGrid) {
                    var grid = this._bar.sizeGrid.split(",");
                    var lr = Number(grid[3]) + Number(grid[1]);
                    this._bar.width = lr + (this.barWidth - lr) * this._value;
                    this._bar.visible = this._bar.width > lr;
                }
                else {
                    this._bar.width = this.barWidth * this._value;
                }
            };
            Object.defineProperty(ProgressBar.prototype, "rectangle", {
                get: function () {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressBar.prototype, "toolTip", {
                set: function (value) {
                    this._toolTip = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressBar.prototype, "skin", {
                set: function (value) {
                    if (this._skin != value) {
                        this._skin = value;
                        this._bg.skin = this._skin;
                        this.callLater(this.changeValue);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressBar.prototype, "sizeGrid", {
                set: function (value) {
                    this._bg.sizeGrid = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressBar.prototype, "barSkin", {
                set: function (value) {
                    if (this._bar.skin != value) {
                        this._bar.skin = value;
                        this.callLater(this.changeValue);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressBar.prototype, "barSizeGrid", {
                set: function (value) {
                    this._bar.sizeGrid = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressBar.prototype, "barWidth", {
                get: function () {
                    return this._barWidth <= 0 ? this.width : this._barWidth;
                },
                set: function (value) {
                    this._barWidth = value;
                    this._bar.width = value;
                    this.callLater(this.changeValue);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressBar.prototype, "barHeight", {
                get: function () {
                    return this._barHeight <= 0 ? this.height : this._barHeight;
                },
                set: function (value) {
                    this._barHeight = value;
                    this._bar.height = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressBar.prototype, "valueMute", {
                /** 静默设置进度值，不触发事件*/
                set: function (value) {
                    if (this._value != value) {
                        this._value = value > 1 ? 1 : (value < 0 ? 0 : value);
                        this.callLater(this.changeValue);
                    }
                },
                enumerable: true,
                configurable: true
            });
            return ProgressBar;
        }(laya.ui.ProgressBar));
        ui.ProgressBar = ProgressBar;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=ProgressBar.js.map