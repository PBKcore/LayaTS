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
        var layaLabel = laya.ui.Label;
        var TextInput = laya.ui.TextInput;
        var Rectangle = sear.maths.Rectangle;
        /**
         * 输入文本
         * skin sizeGrid
         *
         * @author pbk
         */
        var InputLabel = /** @class */ (function (_super) {
            __extends(InputLabel, _super);
            function InputLabel() {
                var _this = _super.call(this) || this;
                _this._bgx = 0;
                _this._bgy = 0;
                return _this;
            }
            InputLabel.prototype.clone = function (ret) {
                if (ret === void 0) { ret = null; }
                ret || (ret = new InputLabel());
                ui.Label.cloneLaya(this, ret);
                ret.bgx = this.bgx;
                ret.bgy = this.bgy;
                ret.skin = this.skin;
                ret.sizeGrid = this.sizeGrid;
                ret.type = this.type;
                ret.multiline = this.multiline;
                ret.editable = this.editable;
                ret.restrict = this.restrict;
                ret.maxChars = this.maxChars;
                ret.asPassword = this.asPassword;
                ret.prompt = this.prompt;
                ret.promptColor = this.promptColor;
                ret.text = this.text;
                return ret;
            };
            Object.defineProperty(InputLabel.prototype, "rectangle", {
                get: function () {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputLabel.prototype, "toolTip", {
                set: function (value) {
                    this._toolTip = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputLabel.prototype, "skin", {
                get: function () {
                    return this._skin;
                },
                set: function (value) {
                    if (this._skin != value) {
                        this._skin = value;
                        if (sear.loadex.hasRes(value)) {
                            this.setSkin(value);
                        }
                        else {
                            sear.loadex.loadImage(value, this, this.setSkin, [value]);
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            InputLabel.prototype.setSkin = function (url) {
                if (this.destroyed) {
                    return;
                }
                if (this._skin == url) {
                    this._bg || (this.graphics = this._bg = new ui.AutoBitmap());
                    this._bg.offx = this.bgx;
                    this._bg.offy = this.bgy;
                    this._bg.source = sear.loadex.getRes(url);
                    this._width && (this._bg.width = this._width - this.bgx * 2);
                    this._height && (this._bg.height = this._height - this.bgy * 2);
                }
            };
            Object.defineProperty(InputLabel.prototype, "sizeGrid", {
                get: function () {
                    return sear.superGet(layaLabel, this, "sizeGrid");
                },
                set: function (value) {
                    this._bg || (this.graphics = this._bg = new ui.AutoBitmap());
                    this._bg.sizeGrid = laya.ui.UIUtils.fillArray(laya.ui.Styles.defaultSizeGrid, value, Number);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputLabel.prototype, "width", {
                get: function () {
                    return sear.superGet(layaLabel, this, "width");
                },
                set: function (value) {
                    sear.superSet(layaLabel, this, "width", value);
                    this._bg && (this._bg.width = value - this.bgx * 2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputLabel.prototype, "height", {
                get: function () {
                    return sear.superGet(layaLabel, this, "height");
                },
                set: function (value) {
                    sear.superSet(layaLabel, this, "height", value);
                    this._bg && (this._bg.height = value - this.bgy * 2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputLabel.prototype, "bgx", {
                /** 背景图偏移x坐标*/
                get: function () {
                    return this._bgx;
                },
                set: function (value) {
                    if (this._bgx != value) {
                        this._bgx = value;
                        this._bg && this._width && (this._bg.width = this._width - this.bgx * 2);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InputLabel.prototype, "bgy", {
                /** 背景图偏移y坐标*/
                get: function () {
                    return this._bgy;
                },
                set: function (value) {
                    if (this._bgy != value) {
                        this._bgy = value;
                        this._bg && this._height && (this._bg.height = this._height - this.bgy * 2);
                    }
                },
                enumerable: true,
                configurable: true
            });
            return InputLabel;
        }(TextInput));
        ui.InputLabel = InputLabel;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=InputLabel.js.map