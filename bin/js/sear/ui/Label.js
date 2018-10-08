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
        var Rectangle = sear.maths.Rectangle;
        var ShowUtil = sear.utils.ShowUtil;
        /**
         *
         *
         * @author pbk
         */
        var Label = /** @class */ (function (_super) {
            __extends(Label, _super);
            function Label() {
                return _super.call(this) || this;
            }
            Label.cloneLaya = function (og, ret) {
                ret || (ret = new layaLabel());
                ShowUtil.cloneComponent(og, ret);
                ret.font = og.font;
                ret.fontSize = og.fontSize;
                ret.color = og.color;
                ret.align = og.align;
                ret.valign = og.valign;
                ret.bold = og.bold;
                ret.italic = og.italic;
                ret.padding = og.padding;
                ret.leading = og.leading;
                ret.wordWrap = og.wordWrap;
                ret.overflow = og.overflow;
                ret.underline = og.underline;
                ret.underlineColor = og.underlineColor;
                ret.stroke = og.stroke;
                ret.strokeColor = og.strokeColor;
                ret.bgColor = og.bgColor;
                ret.borderColor = og.borderColor;
                ret.text = og.text;
                return ret;
            };
            Label.prototype.clone = function (ret) {
                if (ret === void 0) { ret = null; }
                ret || (ret = new Label());
                return Label.cloneLaya(this, ret);
            };
            Label.prototype.createChildren = function () {
                this.addChild(this._tf = new ui.Text());
            };
            Object.defineProperty(Label.prototype, "rectangle", {
                get: function () {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Label.prototype, "textHeight", {
                get: function () {
                    return this._tf.textHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Label.prototype, "textWidth", {
                get: function () {
                    return this._tf.textWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Label.prototype, "toolTip", {
                set: function (value) {
                    this._toolTip = value;
                },
                enumerable: true,
                configurable: true
            });
            return Label;
        }(layaLabel));
        ui.Label = Label;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Label.js.map