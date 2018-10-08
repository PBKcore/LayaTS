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
        var layaPanel = laya.ui.Panel;
        var Rectangle = sear.maths.Rectangle;
        var ShowUtil = sear.utils.ShowUtil;
        /**
         * 滚动面板
         *
         * @author pbk
         */
        var ScrollPanel = /** @class */ (function (_super) {
            __extends(ScrollPanel, _super);
            function ScrollPanel() {
                var _this = _super.call(this) || this;
                _this._fixContentWidth = 0;
                _this._fixContentHeight = 0;
                return _this;
            }
            ScrollPanel.prototype.clone = function (ret) {
                if (ret === void 0) { ret = null; }
                ret || (ret = new ScrollPanel());
                ShowUtil.cloneComponent(this, ret);
                if (this.vScrollBar) {
                    ret.vScrollBarSkin = this.vScrollBarSkin;
                    this.vScrollBar.clone(ret.vScrollBar);
                }
                if (this.hScrollBar) {
                    ret.hScrollBarSkin = this.hScrollBarSkin;
                    this.hScrollBar.clone(ret.hScrollBar);
                }
                return ret;
            };
            ScrollPanel.prototype.rawAddChild = function (child) {
                var fun = sear.Sprite.prototype["addChild"];
                return fun ? fun.call(this, child) : null;
            };
            /** 移除容器中所有的子对象*/
            ScrollPanel.prototype.removeAllChilds = function (destroyChild) {
                if (destroyChild === void 0) { destroyChild = false; }
                while (this.content.numChildren > 0) {
                    var node = this.content.removeChildAt(0);
                    if (destroyChild) {
                        node.destroy();
                    }
                }
            };
            Object.defineProperty(ScrollPanel.prototype, "rectangle", {
                get: function () {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollPanel.prototype, "toolTip", {
                set: function (value) {
                    this._toolTip = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollPanel.prototype, "vScrollBarSkin", {
                /** 格式：背景图片skin;滑动按钮skin;进度图片skin(可选)|上按钮skin;下按钮skin*/
                get: function () {
                    return this._vScrollBar ? this._vScrollBar.skin : null;
                },
                set: function (value) {
                    if (!this._vScrollBar) {
                        this.rawAddChild(this._vScrollBar = new ui.VScrollBar());
                        this._vScrollBar.on(sear.Event.CHANGE, this, this.onScrollBarChange, [this._vScrollBar]);
                        this._vScrollBar.target = this._content;
                    }
                    this._vScrollBar.skin = value;
                    this.callLater(this._setScrollChanged);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollPanel.prototype, "hScrollBarSkin", {
                /** 格式：背景图片skin;滑动按钮skin;进度图片skin(可选)|左按钮skin;右按钮skin*/
                get: function () {
                    return this._hScrollBar ? this._hScrollBar.skin : null;
                },
                set: function (value) {
                    if (!this._hScrollBar) {
                        var hBar = new ui.HScrollBar();
                        this.rawAddChild(this._hScrollBar = hBar); // js无类型检查，这样强制类型转换
                        this._hScrollBar.on(sear.Event.CHANGE, this, this.onScrollBarChange, [this._hScrollBar]);
                        this._hScrollBar.target = this._content;
                    }
                    this._hScrollBar.skin = value;
                    this.callLater(this._setScrollChanged);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollPanel.prototype, "fixContentWidth", {
                /** 固定内容宽度*/
                get: function () {
                    return this._fixContentWidth;
                },
                set: function (value) {
                    if (this._fixContentWidth != value) {
                        this._fixContentWidth = value;
                        this._setScrollChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollPanel.prototype, "fixContentHeight", {
                /** 固定内容高度*/
                get: function () {
                    return this._fixContentHeight;
                },
                set: function (value) {
                    if (this._fixContentHeight != value) {
                        this._fixContentHeight = value;
                        this._setScrollChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollPanel.prototype, "contentWidth", {
                get: function () {
                    if (this._fixContentWidth > 0) {
                        return this._fixContentWidth;
                    }
                    return sear.superGet(layaPanel, this, "contentWidth");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollPanel.prototype, "contentHeight", {
                get: function () {
                    if (this._fixContentHeight > 0) {
                        return this._fixContentHeight;
                    }
                    return sear.superGet(layaPanel, this, "contentHeight");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollPanel.prototype, "scrollX", {
                /** 滚动显示区域最左端值*/
                get: function () {
                    return this._content && this._content.scrollRect ? this._content.scrollRect.x : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollPanel.prototype, "scrollY", {
                /** 滚动显示区域最顶部值*/
                get: function () {
                    return this._content && this._content.scrollRect ? this._content.scrollRect.y : 0;
                },
                enumerable: true,
                configurable: true
            });
            return ScrollPanel;
        }(layaPanel));
        ui.ScrollPanel = ScrollPanel;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=ScrollPanel.js.map