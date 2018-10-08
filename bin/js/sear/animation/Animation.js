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
    var animation;
    (function (animation) {
        /**
         * 2D动画对象
         *
         * @author pbk
         */
        var Animation = /** @class */ (function (_super) {
            __extends(Animation, _super);
            function Animation() {
                var _this = _super.call(this) || this;
                /** 是否循环播放*/
                _this._loop = false;
                /** 播放间隔（毫秒）*/
                _this._interval = 50;
                /** 帧列表*/
                _this._frames = null;
                /** 帧数*/
                _this._frameLen = 0;
                /** 当前帧下标*/
                _this._index = 0;
                /** 是否播放中*/
                _this._isPlaying = false;
                /** 是否逆序播放*/
                _this._isReverse = false;
                _this._timer = null;
                return _this;
            }
            Animation.prototype.destroy = function (destroyChild) {
                if (destroyChild === void 0) { destroyChild = false; }
                this.stop();
                _super.prototype.destroy.call(this, destroyChild);
            };
            Animation.prototype.play = function (start, loop) {
                if (start === void 0) { start = 0; }
                if (loop === void 0) { loop = true; }
                this._isPlaying = true;
                this.loop = loop;
                this.index = start;
                if (!this._timer) {
                    this._timer = sear.setDelayLoop(this.interval, this, this.frameLoop);
                }
                else {
                    this._timer.delay = this.interval;
                }
            };
            Animation.prototype.stop = function () {
                this._isPlaying = false;
                if (this._timer) {
                    this._timer.stop();
                    this._timer = null;
                }
            };
            Animation.prototype.frameLoop = function () {
                if (this.isReverse) {
                    this.index -= 1;
                    if (!this.loop && this.index <= 0) {
                        this.stop();
                    }
                }
                else {
                    this.index += 1;
                    if (!this.loop && this.index >= this.frameLen - 1) {
                        this.stop();
                    }
                }
            };
            /**
             * 绘制帧纹理
             * @param texture 帧纹理
             * @param width 平铺绘制宽度
             * @param height 平铺绘制高度
             */
            Animation.prototype.drawTextureFrame = function (texture) {
                this.graphics.clear();
                if (!texture || texture.destroyed) {
                    return;
                }
                var len = texture.length;
                if (len <= 0) {
                    return;
                }
                if (len == 1) {
                    if (texture.isFixSize) {
                        this.graphics.fillTexture(texture.textures[0], texture.offxs[0], texture.offys[0], texture.width, texture.height);
                    }
                    else {
                        this.graphics.drawTexture(texture.textures[0], texture.offxs[0], texture.offys[0]);
                    }
                }
                else {
                    for (var i = 0; i < len; ++i) {
                        this.graphics.drawTexture(texture.textures[i], texture.offxs[i], texture.offys[i]);
                    }
                }
            };
            Object.defineProperty(Animation.prototype, "loop", {
                get: function () {
                    return this._loop;
                },
                set: function (value) {
                    this._loop = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "interval", {
                get: function () {
                    return this._interval;
                },
                set: function (value) {
                    if (value == this._interval) {
                        return;
                    }
                    this._interval = value;
                    if (this._timer) {
                        this._timer.delay = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "frames", {
                get: function () {
                    return this._frames;
                },
                set: function (value) {
                    this._frames = value;
                    this._frameLen = value ? value.length : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "frameLen", {
                get: function () {
                    return this._frameLen;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "index", {
                get: function () {
                    return this._index;
                },
                set: function (value) {
                    if (this.frameLen <= 0) {
                        this._index = 0;
                        return;
                    }
                    if (value < 0) {
                        value = this.frameLen - 1;
                    }
                    else if (value >= this.frameLen) {
                        value = 0;
                    }
                    this._index = value;
                    this.drawTextureFrame(this.frames[this.index]);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "isPlaying", {
                get: function () {
                    return this._isPlaying;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Animation.prototype, "isReverse", {
                /** 是否逆序播放*/
                get: function () {
                    return this._isReverse;
                },
                set: function (value) {
                    this._isReverse = value;
                },
                enumerable: true,
                configurable: true
            });
            return Animation;
        }(sear.Sprite));
        animation.Animation = Animation;
    })(animation = sear.animation || (sear.animation = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Animation.js.map