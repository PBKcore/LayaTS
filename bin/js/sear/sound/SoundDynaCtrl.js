var sear;
(function (sear) {
    var sound;
    (function (sound_1) {
        /**
         * 动态音频控制器
         *
         * @author pbk
         */
        var SoundDynaCtrl = /** @class */ (function () {
            function SoundDynaCtrl() {
                // ===============================================================================
                this._bindFocus = null;
                // ===============================================================================
                this._sounds = [];
                // ===============================================================================
                this._timer = null;
            }
            /**
             * 绑定声音焦点，根据位置调节音量大小
             * @param focus
             */
            SoundDynaCtrl.prototype.setBindFocus = function (focus) {
                this._bindFocus = focus;
            };
            Object.defineProperty(SoundDynaCtrl.prototype, "bindFocus", {
                get: function () {
                    return this._bindFocus;
                },
                enumerable: true,
                configurable: true
            });
            SoundDynaCtrl.prototype.addSound = function (sound) {
                if (!sound || !sound.isDynamic) {
                    return;
                }
                var idx = this._sounds.indexOf(sound);
                if (idx == -1) {
                    this._sounds.push(sound);
                    this.autoCheckSwitch();
                }
            };
            SoundDynaCtrl.prototype.delSound = function (sound) {
                if (!sound) {
                    return;
                }
                var idx = this._sounds.indexOf(sound);
                if (idx != -1) {
                    this._sounds.splice(idx, 1);
                    this.autoCheckSwitch();
                }
            };
            Object.defineProperty(SoundDynaCtrl.prototype, "sounds", {
                get: function () {
                    return this._sounds;
                },
                enumerable: true,
                configurable: true
            });
            SoundDynaCtrl.prototype.autoCheckSwitch = function () {
                if (this._sounds.length > 0) {
                    if (this._timer != null) {
                        return;
                    }
                    this._timer = sear.setFrameLoop(this, this.autoAdjust);
                }
                else {
                    if (this._timer == null) {
                        return;
                    }
                    this._timer.stop();
                    this._timer = null;
                }
            };
            SoundDynaCtrl.prototype.autoAdjust = function () {
                if (!this._bindFocus) {
                    return;
                }
                var dels;
                for (var _i = 0, _a = this._sounds; _i < _a.length; _i++) {
                    var sound_2 = _a[_i];
                    if (!sound_2.isDynamic) {
                        dels || (dels = []);
                        dels.push(sound_2);
                        return;
                    }
                    if (!sound_2.updateVolumeDynamic(this._bindFocus)) {
                        dels || (dels = []);
                        dels.push(sound_2);
                    }
                }
                if (dels) {
                    for (var _b = 0, dels_1 = dels; _b < dels_1.length; _b++) {
                        var sound_3 = dels_1[_b];
                        this.delSound(sound_3);
                    }
                }
            };
            return SoundDynaCtrl;
        }());
        sound_1.SoundDynaCtrl = SoundDynaCtrl;
    })(sound = sear.sound || (sear.sound = {}));
})(sear || (sear = {}));
//# sourceMappingURL=SoundDynaCtrl.js.map