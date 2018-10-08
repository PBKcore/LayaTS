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
         * 下拉框
         * skin stateNum sizeGrid
         * scrollBarSkin
         *
         * @author pbk
         */
        var ComboBox = /** @class */ (function (_super) {
            __extends(ComboBox, _super);
            function ComboBox(skin, labels) {
                if (skin === void 0) { skin = null; }
                if (labels === void 0) { labels = null; }
                return _super.call(this, skin, labels) || this;
            }
            ComboBox.prototype.clone = function (ret) {
                if (ret === void 0) { ret = null; }
                ret || (ret = new ComboBox());
                ShowUtil.cloneComponent(this, ret);
                this.button.clone(ret.button);
                ret.scrollBarSkin = this.scrollBarSkin;
                ret.itemSize = this.itemSize;
                ret.visibleNum = this.visibleNum;
                ret.itemColors = this.itemColors;
                ret.items = this.items;
                return ret;
            };
            ComboBox.prototype.createChildren = function () {
                this.addChild(this._button = new ui.Button());
                this._button.text.align = ui.Layout.ALIGN_LEFT;
                this._button.labelPadding = "0,0,0,5";
                this._button.on(sear.Event.MOUSE_DOWN, this, this["onButtonMouseDown"]);
            };
            ComboBox.prototype.addItem = function (item) {
                this._labels.push(item);
            };
            Object.defineProperty(ComboBox.prototype, "items", {
                get: function () {
                    return this._labels;
                },
                set: function (value) {
                    if (!value) {
                        this._labels.length = 0;
                    }
                    this._labels = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComboBox.prototype, "rectangle", {
                get: function () {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComboBox.prototype, "toolTip", {
                set: function (value) {
                    this._toolTip = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComboBox.prototype, "button", {
                get: function () {
                    return this._button;
                },
                enumerable: true,
                configurable: true
            });
            return ComboBox;
        }(laya.ui.ComboBox));
        ui.ComboBox = ComboBox;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=ComboBox.js.map