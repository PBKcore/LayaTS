var sear;
(function (sear) {
    var animation;
    (function (animation) {
        /**
         * 帧纹理信息
         * 对象池管理
         *
         * 需修改，Texture自带偏移。等做动画编辑器时完善
         *
         * @author pbk
         */
        var TextureFrame = /** @class */ (function () {
            function TextureFrame() {
                this._textures = [];
                this._offxs = [];
                this._offys = [];
                this.width = 0;
                this.height = 0;
                this._destroyed = false;
            }
            TextureFrame.prototype.addTexture = function (texture, offx, offy) {
                this._textures.push(texture);
                this._offxs.push(offx);
                this._offys.push(offy);
            };
            TextureFrame.prototype.clear = function () {
                this._textures = [];
                this._offxs = [];
                this._offys = [];
                this.width = 0;
                this.height = 0;
            };
            TextureFrame.prototype.destroy = function () {
                this._textures = null;
                this._offxs = null;
                this._offys = null;
                this._destroyed = true;
            };
            Object.defineProperty(TextureFrame.prototype, "destroyed", {
                get: function () {
                    return this._destroyed;
                },
                enumerable: true,
                configurable: true
            });
            /** 回收进对象池*/
            TextureFrame.prototype.recover = function () {
                sear.pool.recTextureFrame(this);
            };
            Object.defineProperty(TextureFrame.prototype, "textures", {
                get: function () {
                    return this._textures;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureFrame.prototype, "offxs", {
                get: function () {
                    return this._offxs;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureFrame.prototype, "offys", {
                get: function () {
                    return this._offys;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureFrame.prototype, "length", {
                get: function () {
                    return this._textures != null ? this._textures.length : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureFrame.prototype, "isFixSize", {
                get: function () {
                    return this.width > 0 && this.height > 0;
                },
                enumerable: true,
                configurable: true
            });
            return TextureFrame;
        }());
        animation.TextureFrame = TextureFrame;
    })(animation = sear.animation || (sear.animation = {}));
})(sear || (sear = {}));
//# sourceMappingURL=TextureFrame.js.map