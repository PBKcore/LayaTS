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
        var HTMLDivElement = laya.html.dom.HTMLDivElement;
        var Rectangle = sear.maths.Rectangle;
        var ShowUtil = sear.utils.ShowUtil;
        /**
         *
         *
         * @author pbk
         */
        var HtmlLabel = /** @class */ (function (_super) {
            __extends(HtmlLabel, _super);
            function HtmlLabel() {
                var _this = _super.call(this) || this;
                _this._text = "";
                return _this;
            }
            HtmlLabel.prototype.clone = function (ret) {
                if (ret === void 0) { ret = null; }
                ret || (ret = new HtmlLabel());
                ShowUtil.cloneComponent(this, ret);
                ret.align = this.align;
                ret.valign = this.valign;
                ret.padding = this.padding;
                ret.leading = this.leading;
                ret.password = this.password;
                ret.stroke = this.stroke;
                ret.strokeColor = this.strokeColor;
                ret.bgColor = this.bgColor;
                ret.borderColor = this.borderColor;
                ret.text = this.text;
                return ret;
            };
            HtmlLabel.prototype.destroy = function (destroyChild) {
                if (destroyChild === void 0) { destroyChild = true; }
                this._htmlDiv = null;
                _super.prototype.destroy.call(this, destroyChild);
            };
            HtmlLabel.prototype.createChildren = function () {
                this.addChild(this._htmlDiv = new HTMLDivElement());
            };
            Object.defineProperty(HtmlLabel.prototype, "rectangle", {
                get: function () {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "toolTip", {
                set: function (value) {
                    this._toolTip = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "text", {
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    this._text = value;
                    this._htmlDiv.innerHTML = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "textWord", {
                /** html纯文字*/
                get: function () {
                    var word = "";
                    var chars = this._getWords();
                    for (var _i = 0, chars_1 = chars; _i < chars_1.length; _i++) {
                        var char = chars_1[_i];
                        word += char.char;
                    }
                    return word;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "textHeight", {
                get: function () {
                    return this._htmlDiv.contextHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "textWidth", {
                get: function () {
                    return this._htmlDiv.contextWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "leading", {
                get: function () {
                    return this._htmlDiv.style.leading;
                },
                set: function (value) {
                    this._htmlDiv.style.leading = value;
                    this._htmlDiv.innerHTML = this._text;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "align", {
                get: function () {
                    return this._htmlDiv.style.align;
                },
                set: function (value) {
                    this._htmlDiv.style.align = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "valign", {
                get: function () {
                    return this._htmlDiv.style.valign;
                },
                set: function (value) {
                    this._htmlDiv.style.valign = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "padding", {
                get: function () {
                    return this._htmlDiv.style.padding;
                },
                set: function (value) {
                    this._htmlDiv.style.padding = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "password", {
                get: function () {
                    return this._htmlDiv.style.password;
                },
                set: function (value) {
                    this._htmlDiv.style.password = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "stroke", {
                get: function () {
                    return this._htmlDiv.style.stroke;
                },
                set: function (value) {
                    this._htmlDiv.style.stroke = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "strokeColor", {
                get: function () {
                    return this._htmlDiv.style.strokeColor;
                },
                set: function (value) {
                    this._htmlDiv.style.strokeColor = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "bgColor", {
                get: function () {
                    return this._htmlDiv.style.backgroundColor;
                },
                set: function (value) {
                    this._htmlDiv.style.backgroundColor = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlLabel.prototype, "borderColor", {
                get: function () {
                    return this._htmlDiv.style.borderColor;
                },
                set: function (value) {
                    this._htmlDiv.style.borderColor = value;
                },
                enumerable: true,
                configurable: true
            });
            return HtmlLabel;
        }(laya.ui.Component));
        ui.HtmlLabel = HtmlLabel;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=HtmlLabel.js.map