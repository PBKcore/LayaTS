var sear;
(function (sear) {
    var sound;
    (function (sound_1) {
        /**
         * 音效格式在加速器里只支持wav，同时最多支持10个
         *
         * @author pbk
         */
        var SoundManager = /** @class */ (function () {
            function SoundManager() {
                this._dynaCtrl = new sound_1.SoundDynaCtrl();
                // ===============================================================================
                this._muted = false;
                this._mutedMusic = false;
                this._mutedSound = false;
                this._volume = 1;
                this._volumeMusic = 1;
                this._volumeSound = 1;
                // ===============================================================================
                this._sounds = [];
                // ===============================================================================
                // 同种声音的播放限制
                this._sameLimit = {};
                // 互斥音频的播放限制
                this._mutexLimit = {};
            }
            // ===============================================================================
            SoundManager.prototype.startup = function () {
                sear.stage.on(sear.Event.BLUR, this, this.stageOnBlurHandler);
                sear.stage.on(sear.Event.FOCUS, this, this.stageOnFocusHandler);
                sear.stage.on(sear.Event.VISIBILITY_CHANGE, this, this.visibilityChangeHandler);
                Laya.SoundManager.autoStopMusic = false;
                this.startCheckDetached();
            };
            SoundManager.prototype.visibilityChangeHandler = function () {
                if (sear.stage.isVisibility) {
                    this.stageOnFocusHandler();
                }
                else {
                    this.stageOnBlurHandler();
                }
            };
            SoundManager.prototype.stageOnBlurHandler = function () {
                this.muted = true;
            };
            SoundManager.prototype.stageOnFocusHandler = function () {
                this.muted = false;
            };
            // ===============================================================================
            /**
             * 播放音频
             * @param url 资源路径
             * @param loop 是否循环
             * @param data 扩展参数
             * @param isGetSound 是否获得Sound对象自行处理（不自动回收对象池）
             */
            SoundManager.prototype.playSound = function (url, loop, data, isGetSound) {
                if (loop === void 0) { loop = 1; }
                if (data === void 0) { data = null; }
                if (isGetSound === void 0) { isGetSound = false; }
                data || (data = sear.pool.getSoundData());
                data.url = url;
                data.loop = loop;
                if (!this.enablePlay(data)) {
                    return null;
                }
                var sound = sear.pool.getSound();
                sound.setData(data);
                if (sound.play()) {
                    sound.isDetached = isGetSound;
                    this.checkMutex(sound);
                    return isGetSound ? sound : null;
                }
                else {
                    sound.recover();
                    return null;
                }
            };
            Object.defineProperty(SoundManager.prototype, "muted", {
                /** 静音所有声音*/
                get: function () {
                    return this._muted;
                },
                set: function (value) {
                    (this._muted == value) || (this._muted = value);
                    this.updateVolume(true);
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
                    this.updateVolume(false);
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
                    this.updateVolume(false);
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
                    this._volume = formatVolume(value);
                    this.updateVolume(false);
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
                    this._volumeMusic = formatVolume(value);
                    this.updateVolume(false);
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
                    this._volumeSound = formatVolume(value);
                    this.updateVolume(false);
                },
                enumerable: true,
                configurable: true
            });
            SoundManager.prototype.updateVolume = function (force) {
                if (this.muted && !force) {
                    return;
                }
                for (var _i = 0, _a = this._sounds; _i < _a.length; _i++) {
                    var sound_2 = _a[_i];
                    sound_2.updateVolume();
                }
            };
            /**
             * @private
             * @param sound
             */
            SoundManager.prototype.addSound = function (sound) {
                if (!sound || !sound.hasData) {
                    return;
                }
                this._dynaCtrl.addSound(sound);
                var idx = this._sounds.indexOf(sound);
                if (idx == -1) {
                    this._sounds.push(sound);
                    this.recordAdd(sound);
                }
            };
            /**
             * @private
             * @param sound
             */
            SoundManager.prototype.delSound = function (sound) {
                if (!sound || !sound.hasData) {
                    return;
                }
                this._dynaCtrl.delSound(sound);
                var idx = this._sounds.indexOf(sound);
                if (idx != -1) {
                    this._sounds.splice(idx, 1);
                    this.recordDel(sound);
                }
            };
            // 检测各种播放限制
            SoundManager.prototype.enablePlay = function (data) {
                if (!data) {
                    return false;
                }
                // 检测同种音频播放限制
                if (this._sameLimit[data.url] && this._sameLimit[data.url] >= data.sameMax) {
                    return false;
                }
                return true;
            };
            SoundManager.prototype.recordAdd = function (sound) {
                var url = sound.data.url;
                if (this._sameLimit[url]) {
                    this._sameLimit[url] = 1;
                }
                else {
                    this._sameLimit[url] += 1;
                }
                sound.addTime = sear.frame.runTime;
            };
            SoundManager.prototype.recordDel = function (sound) {
                var url = sound.data.url;
                if (this._sameLimit[url] == 1) {
                    delete this._sameLimit[url];
                }
                else {
                    this._sameLimit[url] -= 1;
                }
                if (sound.data.mutexId != 0) {
                    if (this._mutexLimit[sound.data.mutexId] = sound) {
                        delete this._mutexLimit[sound.data.mutexId];
                    }
                }
            };
            SoundManager.prototype.checkMutex = function (sound) {
                if (sound.data.mutexId == 0) {
                    return;
                }
                var lastSound = this._mutexLimit[sound.data.mutexId];
                if (lastSound && !lastSound.isStoped) {
                    lastSound.stop();
                }
                this._mutexLimit[sound.data.mutexId] = sound;
            };
            // ===============================================================================
            // 检测脱管
            SoundManager.prototype.startCheckDetached = function () {
                sear.setDelayLoop(60000, this, this.checkDetached);
            };
            SoundManager.prototype.checkDetached = function () {
                var dels = null;
                for (var _i = 0, _a = this._sounds; _i < _a.length; _i++) {
                    var sound_3 = _a[_i];
                    if (sound_3.checkDetached()) {
                        if (dels == null) {
                            dels = [sound_3];
                        }
                        else {
                            dels.push(sound_3);
                        }
                    }
                }
                if (dels != null) {
                    for (var _b = 0, dels_1 = dels; _b < dels_1.length; _b++) {
                        var sound_4 = dels_1[_b];
                        sound_4.stop();
                    }
                }
            };
            return SoundManager;
        }());
        sound_1.SoundManager = SoundManager;
        /** 格式化声音数值*/
        function formatVolume(value) {
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
        sound_1.formatVolume = formatVolume;
    })(sound = sear.sound || (sear.sound = {}));
})(sear || (sear = {}));
(function (sear) {
    sear.soundex = new sear.sound.SoundManager();
})(sear || (sear = {}));
//# sourceMappingURL=SoundManager.js.map