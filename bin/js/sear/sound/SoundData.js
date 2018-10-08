var sear;
(function (sear) {
    var sound;
    (function (sound) {
        /**
         * 音频播放数据
         * 对象池管理
         *
         * @author pbk
         */
        var SoundData = /** @class */ (function () {
            function SoundData() {
                this._destroyed = false;
                this.clear();
            }
            SoundData.prototype.destroy = function () {
                this.clear();
                this._destroyed = true;
            };
            Object.defineProperty(SoundData.prototype, "destroyed", {
                get: function () {
                    return this._destroyed;
                },
                enumerable: true,
                configurable: true
            });
            SoundData.prototype.recover = function () {
                sear.pool.recSoundData(this);
            };
            SoundData.prototype.clear = function () {
                this._url = null;
                this._isMP3 = false;
                this._loop = 1;
                this._volume = 1;
                this._volumeMax = 1;
                this._volumeMin = 0;
                this._startTime = 0;
                this._sameMax = 10;
                this._mutexId = 0;
                this._bindPos = null;
                this._radius = 0;
                this._isChangeVol = false;
                this._changeVolRadius = 0;
                this._isChangePan = false;
                this._changePanRadius = 0;
            };
            Object.defineProperty(SoundData.prototype, "url", {
                /** 音频资源路径*/
                get: function () { return this._url; },
                set: function (value) {
                    this._url = value;
                    if (value != null) {
                        var len = value.length;
                        if (len > 4) {
                            this._isMP3 = (value.slice(len - 4) == ".mp3");
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "isMP3", {
                /** 是否MP3资源*/
                get: function () {
                    return this._isMP3;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "loop", {
                /** 循环次数（0表示无限循环）*/
                get: function () { return this._loop; },
                set: function (value) { this._loop = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "volume", {
                /** 默认音量（0-1）*/
                get: function () { return this._volume; },
                set: function (value) { this._volume = sound.formatVolume(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "volumeMax", {
                /** 最大音量（0-1）*/
                get: function () { return this._volumeMax; },
                set: function (value) { this._volumeMax = sound.formatVolume(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "volumeMin", {
                /** 最小音量（0-1）*/
                get: function () { return this._volumeMin; },
                set: function (value) { this._volumeMin = sound.formatVolume(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "startTime", {
                /** 开始播放时间（秒）*/
                get: function () { return this._startTime; },
                set: function (value) { this._startTime = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "sameMax", {
                /** 同种音频同时播放音频数量*/
                get: function () { return this._sameMax; },
                set: function (value) { this._sameMax = Math.max(value, 1); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "mutexId", {
                /** 音频互斥ID*/
                get: function () { return this._mutexId; },
                set: function (value) { this._mutexId = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "isDynamic", {
                // ==================================================================
                /** 是否是动态音频*/
                get: function () {
                    return this._bindPos && (this.isChangeVol || this.isChangePan);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "bindPos", {
                /** 绑定音源位置*/
                get: function () { return this._bindPos; },
                set: function (value) { this._bindPos = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "radius", {
                /** 声音有效半径*/
                get: function () { return this._radius; },
                set: function (value) { this._radius = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "isChangeVol", {
                /** 是否音量变化*/
                get: function () { return this._isChangeVol && this._changeVolRadius > 0; },
                set: function (value) { this._isChangeVol = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "changeVolRadius", {
                /** 音量变化半径*/
                get: function () { return this._changeVolRadius; },
                set: function (value) { this._changeVolRadius = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "isChangePan", {
                /** 是否声向变化（暂未实现）*/
                get: function () { return this._isChangePan && this._changePanRadius > 0; },
                set: function (value) { this._isChangePan = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SoundData.prototype, "changePanRadius", {
                /** 声向变化半径（暂未实现）*/
                get: function () { return this._changePanRadius; },
                set: function (value) { this._changePanRadius = value; },
                enumerable: true,
                configurable: true
            });
            return SoundData;
        }());
        sound.SoundData = SoundData;
    })(sound = sear.sound || (sear.sound = {}));
})(sear || (sear = {}));
//# sourceMappingURL=SoundData.js.map