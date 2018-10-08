var sear;
(function (sear) {
    var sound;
    (function (sound) {
        var TO_ID = 1;
        /**
         * 音频控制
         * 对象池管理
         *
         * @author pbk
         */
        var Sound = /** @class */ (function () {
            function Sound() {
                this._destroyed = false;
                // ===============================================================================
                this._data = null;
                this._isPause = false;
                // ===============================================================================
                this._volume = 1;
                // ===============================================================================
                // 动态音量
                this._volumeDyna = 1;
                this._dx = Number.MAX_VALUE;
                this._dy = Number.MAX_VALUE;
                // =============================================================================== 
                this._isDetached = false;
                this._addTime = 0;
                this._id = TO_ID++;
                this.clear();
            }
            Object.defineProperty(Sound.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            // ===============================================================================
            Sound.prototype.destroy = function () {
                this.clear();
                this._destroyed = true;
            };
            Sound.prototype.recover = function () {
                sear.pool.recSound(this);
            };
            Object.defineProperty(Sound.prototype, "destroyed", {
                get: function () {
                    return this._destroyed;
                },
                enumerable: true,
                configurable: true
            });
            Sound.prototype.clear = function () {
                if (this._data != null) {
                    this._data.recover();
                    this._data = null;
                }
                this._channel = null;
                this._isPause = false;
                this._volume = 1;
                this._volumeDyna = 1;
                this._dx = Number.MAX_VALUE;
                this._dy = Number.MAX_VALUE;
                this._isDetached = false;
                this._addTime = 0;
            };
            /**
             * 设置音频数据
             * @param data
             */
            Sound.prototype.setData = function (data) {
                this._data = data;
            };
            Object.defineProperty(Sound.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sound.prototype, "hasData", {
                get: function () {
                    return this._data != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sound.prototype, "isDynamic", {
                get: function () {
                    return this.data.isDynamic;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 播放音频
             */
            Sound.prototype.play = function () {
                if (!this.hasData) {
                    return false;
                }
                if (this.hasChannel) {
                    return true;
                }
                if (this.data.isMP3) {
                    this._channel = Laya.SoundManager.playMusic(this.data.url, this.data.loop, Laya.Handler.create(this, this.playComplete), this.data.startTime);
                }
                else {
                    this._channel = Laya.SoundManager.playSound(this.data.url, this.data.loop, Laya.Handler.create(this, this.playComplete), null, this.data.startTime);
                }
                if (!this.hasChannel) {
                    return false;
                }
                this.updateVolume();
                sear.soundex.addSound(this);
                return true;
            };
            // 播放完成
            Sound.prototype.playComplete = function () {
                sear.soundex.delSound(this);
                if (!this._isDetached) {
                    this.recover();
                }
            };
            /** 停止播放声音*/
            Sound.prototype.stop = function () {
                if (!this.hasChannel) {
                    return;
                }
                this._channel.stop();
                this.playComplete();
            };
            /** 暂停播放*/
            Sound.prototype.pause = function () {
                if (this._isPause) {
                    return;
                }
                this._isPause = true;
                if (this.isStoped) {
                    return;
                }
                // 检测是否加载完成开始播放。如果没加载完成就暂停，会导致不再加载而无法播放
                if (this._channel.position <= 0) {
                    this.volume = 0; // 在未加载完成时，设置音量为0，防止加载成功直接播放出来
                }
                else {
                    this._channel.pause();
                }
            };
            /** 继续播放*/
            Sound.prototype.resume = function () {
                if (!this._isPause) {
                    return;
                }
                this._isPause = false;
                if (!this.hasChannel) {
                    return;
                }
                this._channel.resume();
            };
            Object.defineProperty(Sound.prototype, "hasChannel", {
                // 是否有音频
                get: function () {
                    return this._channel != null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sound.prototype, "isStoped", {
                /** 音频是否已暂停*/
                get: function () {
                    return !this.hasChannel || this._channel.isStopped;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sound.prototype, "volume", {
                /** 音量（真实）*/
                get: function () {
                    return this._volume;
                },
                set: function (value) {
                    if (isNaN(value) || value == this._volume) {
                        return;
                    }
                    this._volume = sound.formatVolume(value);
                    this._channel.volume = this._volume;
                },
                enumerable: true,
                configurable: true
            });
            /** 更新音量*/
            Sound.prototype.updateVolume = function () {
                if (!this.hasData || this.isStoped || this._isPause) {
                    return;
                }
                if (sear.soundex.muted) {
                    this.volume = 0;
                    return;
                }
                else {
                    if (this.data.isMP3) {
                        if (sear.soundex.mutedMusic) {
                            this.volume = 0;
                            return;
                        }
                    }
                    else {
                        if (sear.soundex.mutedSound) {
                            this.volume = 0;
                            return;
                        }
                    }
                }
                var tVol = this.data.volume;
                // 动态音频控制
                tVol *= this._volumeDyna;
                // 最大最小音量控制
                if (tVol < this.data.volumeMin) {
                    tVol = this.data.volumeMin;
                }
                else if (tVol > this.data.volumeMax) {
                    tVol = this.data.volumeMax;
                }
                // 全局音量控制
                if (this.data.isMP3) {
                    tVol *= sear.soundex.volumeMusic;
                }
                else {
                    tVol *= sear.soundex.volumeSound;
                }
                // 实际音量
                this.volume = tVol;
            };
            /**
             * 更新动态音量
             * 返回false 表示非循环未播音效播放终止
             * @param focus 对象的听音焦点（判空统一在外部检测）
             */
            Sound.prototype.updateVolumeDynamic = function (focus) {
                if (!this.hasChannel) {
                    return false;
                }
                if (!this.data.isDynamic) {
                    return false;
                }
                var dx = this.data.bindPos.x - focus.x;
                var dy = this.data.bindPos.y - focus.y;
                if (dx != this._dx || dy != this._dy) {
                    this._dx = dx;
                    this._dy = dy;
                }
                else {
                    return true; // 相同位置
                }
                var dis = Math.sqrt(dx * dx + dy * dy);
                if (dis > this.data.radius) {
                    this.pause();
                }
                else {
                    this._volumeDyna = (this.data.radius - dis) / (this.data.radius > this.data.changeVolRadius ? this.data.changeVolRadius : this.data.radius);
                    this._volumeDyna = sound.formatVolume(this._volumeDyna);
                    if (this.isStoped) {
                        this.resume();
                    }
                    this.updateVolume();
                }
                return true;
            };
            /**
             * 是否脱管（相对Layabox的漏洞做的补漏处理）
             * 非循环音频，播放时间超过1分钟，则判定脱管
             */
            Sound.prototype.checkDetached = function () {
                if (this._isDetached) {
                    return false;
                }
                if (!this.hasData) {
                    return true;
                }
                if (this.data.loop != 1) {
                    return false;
                }
                return sear.frame.runTime - this._addTime > 60000;
            };
            Object.defineProperty(Sound.prototype, "isDetached", {
                /** 是否不检测脱管时间*/
                set: function (value) { this._isDetached = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sound.prototype, "addTime", {
                set: function (value) { this._addTime = value; },
                enumerable: true,
                configurable: true
            });
            // =============================================================================== 
            /** 释放音频资源*/
            Sound.prototype.destroySound = function () {
                if (!this.hasData) {
                    return;
                }
                Laya.SoundManager.destroySound(this.data.url);
            };
            return Sound;
        }());
        sound.Sound = Sound;
    })(sound = sear.sound || (sear.sound = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Sound.js.map