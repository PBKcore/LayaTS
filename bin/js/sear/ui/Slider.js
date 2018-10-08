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
        var LoadType = sear.loader.LoadType;
        var Handler = sear.struct.Handler;
        /**
         * [组件]组成：背景图片bg；滑动按钮bar；进度图片progress
         * sizeGrid各个分开赋值
         * skin统一赋值
         *
         * @author pbk
         */
        var Slider = /** @class */ (function (_super) {
            __extends(Slider, _super);
            function Slider(skin) {
                if (skin === void 0) { skin = null; }
                return _super.call(this, skin) || this;
            }
            Slider.prototype.createChiildren = function () {
                this.addChild(this._bg = new ui.Image());
                this.addChild(this._bar = new ui.Button());
            };
            Object.defineProperty(Slider.prototype, "sizeGrid", {
                /** 背景图片缩放网格数据*/
                get: function () {
                    return this._bg.sizeGrid;
                },
                set: function (value) {
                    this._bg.sizeGrid;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Slider.prototype, "skin", {
                /** 格式：背景图片skin;滑动按钮skin;进度图片skin(可选)。使用分号;分割*/
                get: function () {
                    return this._skin;
                },
                set: function (value) {
                    if (this._skin != value) {
                        this._skin = value;
                        if (value) {
                            var skins = value.split(";");
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
            Slider.prototype.setSource = function (url) {
                if (this.destroyed) {
                    return;
                }
                if (this._skin === url) {
                    var skins = url.split(";");
                    this._bg.skin = skins[0];
                    if (skins.length > 1) {
                        this._bar.skin = skins[1];
                        if (skins.length > 2) {
                            this.progress.skin = skins[2];
                        }
                    }
                    this.setBarPoint();
                    this.callLater(this.changeValue);
                }
            };
            Object.defineProperty(Slider.prototype, "progress", {
                /** 进度图片（注意：调用即会创建。不需要避免调用！）*/
                get: function () {
                    if (!this._progress) {
                        this.addChildAt(this._progress = new ui.Image(), 1);
                    }
                    return this._progress;
                },
                enumerable: true,
                configurable: true
            });
            return Slider;
        }(laya.ui.Slider));
        ui.Slider = Slider;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Slider.js.map