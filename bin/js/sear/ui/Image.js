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
         * 图片
         * skin sizeGrid
         *
         * @author pbk
         */
        var Image = /** @class */ (function (_super) {
            __extends(Image, _super);
            function Image() {
                return _super.call(this) || this;
            }
            Image.prototype.clone = function (ret) {
                if (ret === void 0) { ret = null; }
                ret || (ret = new Image());
                ShowUtil.cloneComponent(this, ret);
                ret.skin = this.skin;
                ret.sizeGrid = this.sizeGrid;
                return ret;
            };
            Image.prototype.createChildren = function () {
                this.graphics = this._bitmap = new ui.AutoBitmap();
                this._bitmap.autoCacheCmd = false;
            };
            Object.defineProperty(Image.prototype, "rectangle", {
                get: function () {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Image.prototype, "toolTip", {
                set: function (value) {
                    this._toolTip = value;
                },
                enumerable: true,
                configurable: true
            });
            return Image;
        }(laya.ui.Image));
        ui.Image = Image;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Image.js.map