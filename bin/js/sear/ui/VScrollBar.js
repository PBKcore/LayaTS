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
        var LoadType = sear.loader.LoadType;
        var Handler = sear.struct.Handler;
        var ShowUtil = sear.utils.ShowUtil;
        /**
         * [组件]
         *
         * @author pbk
         */
        var VScrollBar = /** @class */ (function (_super) {
            __extends(VScrollBar, _super);
            function VScrollBar() {
                return _super.call(this) || this;
            }
            VScrollBar.prototype.clone = function (ret) {
                if (ret === void 0) { ret = null; }
                ret || (ret = new VScrollBar());
                ShowUtil.cloneComponent(this, ret);
                ret.hide = this.hide;
                ret.skin = this.skin;
                ret.sizeGrid = this.sizeGrid;
                ret.max = this.max;
                ret.min = this.min;
                ret.tick = this.tick;
                ret.scrollSize = this.scrollSize;
                ret.thumbPercent = this.thumbPercent;
                ret.target = this.target;
                ret.touchScrollEnable = this.touchScrollEnable;
                ret.mouseWheelEnable = this.mouseWheelEnable;
                ret.showButtons = this.showButtons;
                this.upButton.clone(ret.upButton);
                this.downButton.clone(ret.downButton);
                return ret;
            };
            VScrollBar.prototype.createChildren = function () {
                this.addChild(this.slider = new ui.Slider());
                this.addChild(this.upButton = new ui.Button());
                this.addChild(this.downButton = new ui.Button());
            };
            Object.defineProperty(VScrollBar.prototype, "rectangle", {
                get: function () {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VScrollBar.prototype, "toolTip", {
                set: function (value) {
                    this._toolTip = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VScrollBar.prototype, "skin", {
                /** 格式：背景图片skin;滑动按钮skin;进度图片skin(可选)|上按钮skin;下按钮skin*/
                get: function () {
                    return this._skin;
                },
                set: function (value) {
                    if (this._skin != value) {
                        this._skin = value;
                        if (value) {
                            var skins = value.split(/;|\|/);
                            if (skins && skins.length > 0) {
                                if (sear.loadex.hasRes(skins)) {
                                    this.setSource(value);
                                }
                                else {
                                    sear.loadex.load(skins, LoadType.image, Handler.create(this, this.setSource, [value], true));
                                }
                            }
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            VScrollBar.prototype.setSource = function (url) {
                if (this.destroyed) {
                    return;
                }
                if (this._skin === url) {
                    var skins = url.split("|");
                    if (skins && skins.length > 0) {
                        this.slider.skin = skins[0];
                        if (skins.length > 1) {
                            skins = skins[1].split(";");
                            if (skins && skins.length > 2) {
                                this.upButton.skin = skins[0];
                                this.downButton.skin = skins[1];
                            }
                        }
                        this.callLater(this.changeScrollBar);
                    }
                }
            };
            VScrollBar.prototype.changeScrollBar = function () {
                this.upButton.visible = this._showButtons;
                this.downButton.visible = this._showButtons;
                if (this.slider.isVertical) {
                    this.slider.y = this._showButtons ? this.upButton.height : 0;
                }
                else {
                    this.slider.x = this._showButtons ? this.upButton.width : 0;
                }
                this["resetPositions"]();
                this.repaint();
            };
            return VScrollBar;
        }(laya.ui.ScrollBar));
        ui.VScrollBar = VScrollBar;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=VScrollBar.js.map