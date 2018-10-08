var sear;
(function (sear) {
    var sound;
    (function (sound) {
        /**
         *
         *
         * @author pbk
         */
        var SoundManager = /** @class */ (function () {
            function SoundManager() {
                // ===============================================================================
                this._muted = false;
                this._mutedMusic = false;
                this._mutedSound = false;
                this._volume = 1;
                this._volumeMusic = 1;
                this._volumeSound = 1;
            }
            SoundManager.prototype.Startup = function () {
                Laya.stage.on(Laya.Event.BLUR, this, this.StageOnBlurHandler);
                Laya.stage.on(Laya.Event.FOCUS, this, this.StageOnFocusHandler);
                Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, this.VisibilityChangeHandler);
                Laya.SoundManager.autoStopMusic = false;
            };
            SoundManager.prototype.VisibilityChangeHandler = function () {
                if (Laya.stage.isVisibility) {
                    this.StageOnFocusHandler();
                }
                else {
                    this.StageOnBlurHandler();
                }
            };
            SoundManager.prototype.StageOnBlurHandler = function () {
                this.muted = true;
            };
            SoundManager.prototype.StageOnFocusHandler = function () {
                this.muted = false;
            };
            Object.defineProperty(SoundManager.prototype, "muted", {
                /** 静音所有声音*/
                get: function () {
                    return this._muted;
                },
                set: function (value) {
                    (this._muted == value) || (this._muted = value);
                    this.UpdateVolume(true);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundManager.prototype, "mutedMusic", {
                /** 静音音乐*/
                get: function () {
                    return this._mutedMusic;
                },
                set: function (value) {
                    (this._mutedMusic == value) || (this._mutedMusic = value);
                    this.UpdateVolume(false);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundManager.prototype, "mutedSound", {
                /** 静音音效*/
                get: function () {
                    return this._mutedSound;
                },
                set: function (value) {
                    (this._mutedSound == value) || (this._mutedSound = value);
                    this.UpdateVolume(false);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundManager.prototype, "volume", {
                /** 所有音量*/
                get: function () {
                    return this._volume;
                },
                set: function (value) {
                    this._volume = FormatVolume(value);
                    this.UpdateVolume(false);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundManager.prototype, "volumeMusic", {
                /** 音乐音量*/
                get: function () {
                    return this._volumeMusic;
                },
                set: function (value) {
                    this._volumeMusic = FormatVolume(value);
                    this.UpdateVolume(false);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundManager.prototype, "volumeSound", {
                /** 音效音量*/
                get: function () {
                    return this._volumeSound;
                },
                set: function (value) {
                    this._volumeSound = FormatVolume(value);
                    this.UpdateVolume(false);
                },
                enumerable: true,
                configurable: true
            });
            SoundManager.prototype.UpdateVolume = function (force) {
                if (this.muted && !force) {
                    return;
                }
            };
            return SoundManager;
        }());
        sound.SoundManager = SoundManager;
        /** 格式化声音数值*/
        function FormatVolume(value) {
            if (value > 1) {
                return 1;
            }
            else if (value < 0) {
                return 0;
            }
            else if (isNaN(value)) {
                return 1;
            }
            else {
                return value;
            }
        }
        sound.FormatVolume = FormatVolume;
        sound.SoundMgr = new SoundManager();
    })(sound = sear.sound || (sear.sound = {}));
})(sear || (sear = {}));
//# sourceMappingURL=SoundManager.js.map