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
        var Handler = sear.struct.Handler;
        var ShowUtil = sear.utils.ShowUtil;
        /**
         * skin
         *
         * @author pbk
         */
        var ImageLabel = /** @class */ (function (_super) {
            __extends(ImageLabel, _super);
            function ImageLabel() {
                var _this = _super.call(this) || this;
                _this._align = ui.Layout.ALIGN_LEFT;
                _this._valign = ui.Layout.VALIGN_BOTTOM;
                _this._texs = [];
                return _this;
            }
            ImageLabel.prototype.clone = function (ret) {
                if (ret === void 0) { ret = null; }
                ret || (ret = new ImageLabel());
                ShowUtil.cloneComponent(this, ret);
                ret.align = this.align;
                ret.valign = this.valign;
                ret.skin = this.skin;
                return ret;
            };
            ImageLabel.prototype.destroy = function (destroyChild) {
                if (destroyChild === void 0) { destroyChild = true; }
                this.clear();
                this._texs = null;
                _super.prototype.destroy.call(this, destroyChild);
            };
            ImageLabel.prototype.clear = function () {
                this.graphics.clear();
                this._texs.length = 0;
            };
            ImageLabel.prototype.update = function () {
                this.clear();
                if (!this._text || !this._urlRoot) {
                    return;
                }
                var len = this._text.length;
                if (len <= 0) {
                    return;
                }
                var urls = [];
                for (var i = 0; i < len; ++i) {
                    urls.push(this._urlRoot + this._text.charAt(i) + this._urlExt);
                }
                sear.loadex.loadImages(urls, Handler.create(this, this.loadComplete, null, true));
            };
            ImageLabel.prototype.loadComplete = function (tex) {
                if (!tex) {
                    return;
                }
                this._texs = tex;
                this.updateLayout();
            };
            ImageLabel.prototype.updateLayout = function () {
                if (this._texs.length <= 0) {
                    return;
                }
                var toX = 0;
                if (this.align != ui.Layout.ALIGN_LEFT) {
                    var maxW = 0;
                    for (var _i = 0, _a = this._texs; _i < _a.length; _i++) {
                        var tex = _a[_i];
                        maxW += tex.width;
                    }
                    if (this.align == ui.Layout.ALIGN_RIGHT) {
                        toX = this.width - maxW;
                    }
                    else {
                        toX = (this.width - maxW) * 0.5;
                    }
                }
                var offY = 0;
                var maxH = 0;
                var isCenter = false;
                if (this.valign != ui.Layout.VALIGN_TOP) {
                    for (var _b = 0, _c = this._texs; _b < _c.length; _b++) {
                        var tex = _c[_b];
                        if (tex.height > maxH) {
                            maxH = tex.height;
                        }
                    }
                    offY = this.height - maxH;
                    if (this.valign == ui.Layout.VALIGN_MIDDLE) {
                        offY *= 0.5;
                        isCenter = true;
                    }
                }
                var toY;
                this.graphics.clear();
                for (var _d = 0, _e = this._texs; _d < _e.length; _d++) {
                    var tex = _e[_d];
                    if (maxH == 0) {
                        toY = offY;
                    }
                    else {
                        toY = maxH - tex.height;
                        isCenter && (toY *= 0.5);
                        toY += offY;
                    }
                    this.graphics.drawTexture(tex, toX, toY);
                    toX += tex.width;
                }
            };
            Object.defineProperty(ImageLabel.prototype, "rectangle", {
                get: function () {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ImageLabel.prototype, "toolTip", {
                set: function (value) {
                    this._toolTip = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ImageLabel.prototype, "text", {
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    if (this._text == value) {
                        return;
                    }
                    this._text = value;
                    this.callLater(this.update);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ImageLabel.prototype, "skin", {
                set: function (value) {
                    this._urlRoot = null;
                    this._urlExt = null;
                    if (value != null) {
                        var idxExt = value.lastIndexOf(".");
                        var idxBoot = value.lastIndexOf("/");
                        if (idxExt != -1 && idxBoot != -1 && idxExt > idxBoot) {
                            this._urlRoot = value.substring(0, idxBoot + 1);
                            this._urlExt = value.substring(idxExt);
                        }
                    }
                    this.callLater(this.update);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ImageLabel.prototype, "align", {
                get: function () {
                    return this._align;
                },
                set: function (value) {
                    if (this._align == value) {
                        return;
                    }
                    this._align = value;
                    this.callLater(this.updateLayout);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ImageLabel.prototype, "valign", {
                get: function () {
                    return this._valign;
                },
                set: function (value) {
                    if (this._valign == value) {
                        return;
                    }
                    this._valign = value;
                    this.callLater(this.updateLayout);
                },
                enumerable: true,
                configurable: true
            });
            return ImageLabel;
        }(laya.ui.Component));
        ui.ImageLabel = ImageLabel;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=ImageLabel.js.map