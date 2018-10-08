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
        var layaButton = laya.ui.Button;
        var Rectangle = sear.maths.Rectangle;
        var FilterUtil = sear.utils.FilterUtil;
        var ShowUtil = sear.utils.ShowUtil;
        /**
         * 按钮
         * skin stateNum sizeGrid
         *
         * @author pbk
         */
        var Button = /** @class */ (function (_super) {
            __extends(Button, _super);
            function Button() {
                var _this = _super.call(this, null, "") || this;
                _this._clickFeedback = 0;
                _this._isFeedback = false;
                return _this;
            }
            Button.prototype.clone = function (ret) {
                if (ret === void 0) { ret = null; }
                ret || (ret = new Button());
                ShowUtil.cloneComponent(this, ret);
                ret.skin = this.skin;
                ret.stateNum = this.stateNum;
                ret.sizeGrid = this.sizeGrid;
                ret.labelFont = this.labelFont;
                ret.labelSize = this.labelSize;
                ret.labelColors = this.labelColors;
                ret.labelBold = this.labelBold;
                ret.labelPadding = this.labelPadding;
                ret.labelAlign = this.labelAlign;
                ret.labelValign = this.labelValign;
                ret.strokeColors = this.strokeColors;
                ret.labelStroke = this.labelStroke;
                ret.labelStrokeColor = this.labelStrokeColor;
                ret.clickFeedback = this.clickFeedback;
                return ret;
            };
            Button.prototype.createChildren = function () {
                this.graphics = this._bitmap = new ui.AutoBitmap();
            };
            Button.prototype.createText = function () {
                if (!this._text) {
                    this._text = new ui.Text();
                    this._text.overflow = ui.Text.HIDDEN;
                    this._text.align = ui.Layout.ALIGN_CENTER;
                    this._text.valign = ui.Layout.VALIGN_MIDDLE;
                    this._text.width = this._width;
                    this._text.height = this._height;
                }
            };
            Button.prototype.onMouse = function (e) {
                if (this.toggle === false && this._selected) {
                    return;
                }
                if (e.type == sear.Event.CLICK) {
                    if (this.toggle) {
                        this.selected = !this._selected;
                    }
                    if (this._clickHandler) {
                        this._clickHandler.run();
                    }
                    return;
                }
                else if (e.type == sear.Event.MOUSE_DOWN) {
                    this.feedback(true);
                }
                else if (e.type == sear.Event.MOUSE_UP) {
                    this.feedback(false);
                }
                else if (e.type == sear.Event.MOUSE_OUT) {
                    this.feedback(false);
                }
                if (!this._selected) {
                    this.state = layaButton.stateMap[e.type];
                }
            };
            /** 注册点击回调*/
            Button.prototype.onClick = function (caller, method, args) {
                if (args === void 0) { args = null; }
                this.clickHandler = Laya.Handler.create(caller, method, args, false);
            };
            Button.prototype.feedback = function (show) {
                if (this._clickFeedback == 0 || this._isFeedback == show) {
                    return;
                }
                if (this._clickFeedback == 1) {
                    if (show) {
                        this._bitmap.scaleX = 0.9;
                        this._bitmap.scaleY = 0.9;
                    }
                    else {
                        this._bitmap.scaleX = 1;
                        this._bitmap.scaleY = 1;
                    }
                }
                else if (this._clickFeedback == 2) {
                    if (show) {
                        FilterUtil.addFilter(this, FilterUtil.getHightLight());
                    }
                    else {
                        FilterUtil.delFilter(this, FilterUtil.getHightLight());
                    }
                }
                this._isFeedback = show;
            };
            Object.defineProperty(Button.prototype, "rectangle", {
                get: function () {
                    return new Rectangle(this.x, this.y, this.width, this.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Button.prototype, "toolTip", {
                set: function (value) {
                    this._toolTip = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Button.prototype, "clickFeedback", {
                /** 鼠标点击反馈效果（0无反馈；1缩放；2高亮）*/
                get: function () {
                    return this._clickFeedback;
                },
                set: function (value) {
                    if (this._clickFeedback != value) {
                        if (value > 0 && this.stateNum != 1) { // 先限制单态按钮才有效果
                            return;
                        }
                        this.feedback(false);
                        this._clickFeedback = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Button.prototype, "skin", {
                get: function () {
                    return this._skin;
                },
                set: function (value) {
                    if (this._skin != value) {
                        this._skin = value;
                        if (value) {
                            if (sear.loadex.hasRes(value)) {
                                this.setSource(value);
                            }
                            else {
                                sear.loadex.loadImage(value, this, this.setSource, [value]);
                            }
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Button.prototype, "labelValign", {
                get: function () {
                    this.createText();
                    return this._text.valign;
                },
                set: function (value) {
                    this.createText();
                    this._text.valign = value;
                },
                enumerable: true,
                configurable: true
            });
            Button.prototype.setSource = function (url) {
                if (this.destroyed) {
                    return;
                }
                if (this._skin === url) {
                    this.callLater(this.changeClips);
                    this._setStateChanged();
                }
            };
            return Button;
        }(layaButton));
        ui.Button = Button;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Button.js.map