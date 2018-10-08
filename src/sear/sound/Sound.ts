module sear.sound {
    import IPool = sear.pool.IPool;
    import IPosition = sear.maths.IPosition;

    let TO_ID: number = 1;

    /**
     * 音频控制
     * 对象池管理
     * 
     * @author pbk
     */
    export class Sound implements IPool {
        private _id: number;

        constructor() {
            this._id = TO_ID++;
            this.clear();
        }

        get id(): number {
            return this._id;
        }

        // ===============================================================================
        destroy(): void {
            this.clear();
            this._destroyed = true;
        }

        recover(): void {
            pool.recSound(this);
        }

        private _destroyed: boolean = false;
        get destroyed(): boolean {
            return this._destroyed;
        }

        clear(): void {
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
        }

        // ===============================================================================
        private _data: SoundData = null;

        /**
         * 设置音频数据
         * @param data 
         */
        setData(data: SoundData): void {
            this._data = data;
        }

        get data(): SoundData {
            return this._data;
        }
        get hasData(): boolean {
            return this._data != null;
        }
        get isDynamic(): boolean {
            return this.data.isDynamic;
        }

        // ===============================================================================
        private _channel: Laya.SoundChannel;

        /**
         * 播放音频
         */
        play(): boolean {
            if (!this.hasData) {
                return false;
            }
            if (this.hasChannel) {
                return true;
            }

            if (this.data.isMP3) {
                this._channel = Laya.SoundManager.playMusic(
                    this.data.url, this.data.loop, Laya.Handler.create(this, this.playComplete), this.data.startTime);
            } else {
                this._channel = Laya.SoundManager.playSound(
                    this.data.url, this.data.loop, Laya.Handler.create(this, this.playComplete), null, this.data.startTime);
            }

            if (!this.hasChannel) {
                return false;
            }

            this.updateVolume();
            soundex.addSound(this);
            return true;
        }

        // 播放完成
        private playComplete(): void {
            soundex.delSound(this);

            if (!this._isDetached) {
                this.recover();
            }
        }

        /** 停止播放声音*/
        stop(): void {
            if (!this.hasChannel) {
                return;
            }

            this._channel.stop();
            this.playComplete();
        }

        private _isPause: boolean = false;
        /** 暂停播放*/
        pause(): void {
            if (this._isPause) {
                return;
            }
            this._isPause = true;

            if (this.isStoped) {
                return;
            }

            // 检测是否加载完成开始播放。如果没加载完成就暂停，会导致不再加载而无法播放
            if (this._channel.position <= 0) {
                this.volume = 0;// 在未加载完成时，设置音量为0，防止加载成功直接播放出来
            } else {
                this._channel.pause();
            }
        }

        /** 继续播放*/
        resume(): void {
            if (!this._isPause) {
                return;
            }
            this._isPause = false;

            if (!this.hasChannel) {
                return;
            }

            this._channel.resume();
        }

        // 是否有音频
        get hasChannel(): boolean {
            return this._channel != null;
        }
        /** 音频是否已暂停*/
        get isStoped(): boolean {
            return !this.hasChannel || this._channel.isStopped;
        }

        // ===============================================================================
        private _volume: number = 1;

        /** 音量（真实）*/
        get volume(): number {
            return this._volume;
        }

        set volume(value: number) {
            if (isNaN(value) || value == this._volume) {
                return;
            }

            this._volume = formatVolume(value);
            this._channel.volume = this._volume;
        }

        /** 更新音量*/
        updateVolume(): void {
            if (!this.hasData || this.isStoped || this._isPause) {
                return;
            }

            if (soundex.muted) {
                this.volume = 0;
                return;
            } else {
                if (this.data.isMP3) {
                    if (soundex.mutedMusic) {
                        this.volume = 0;
                        return;
                    }
                } else {
                    if (soundex.mutedSound) {
                        this.volume = 0;
                        return;
                    }
                }
            }

            let tVol: number = this.data.volume;

            // 动态音频控制
            tVol *= this._volumeDyna;

            // 最大最小音量控制
            if (tVol < this.data.volumeMin) {
                tVol = this.data.volumeMin;
            } else if (tVol > this.data.volumeMax) {
                tVol = this.data.volumeMax;
            }

            // 全局音量控制
            if (this.data.isMP3) {
                tVol *= soundex.volumeMusic;
            } else {
                tVol *= soundex.volumeSound;
            }

            // 实际音量
            this.volume = tVol;
        }

        // ===============================================================================
        // 动态音量
        private _volumeDyna: number = 1;

        private _dx: number = Number.MAX_VALUE;
        private _dy: number = Number.MAX_VALUE;

        /**
         * 更新动态音量
         * 返回false 表示非循环未播音效播放终止
         * @param focus 对象的听音焦点（判空统一在外部检测）
         */
        updateVolumeDynamic(focus: IPosition): boolean {
            if (!this.hasChannel) {
                return false;
            }

            if (!this.data.isDynamic) {
                return false;
            }

            let dx: number = this.data.bindPos.x - focus.x;
            let dy: number = this.data.bindPos.y - focus.y;

            if (dx != this._dx || dy != this._dy) {
                this._dx = dx;
                this._dy = dy;
            } else {
                return true;// 相同位置
            }

            let dis: number = Math.sqrt(dx * dx + dy * dy);
            if (dis > this.data.radius) {
                this.pause();
            } else {
                this._volumeDyna = (this.data.radius - dis) / (this.data.radius > this.data.changeVolRadius ? this.data.changeVolRadius : this.data.radius);
                this._volumeDyna = formatVolume(this._volumeDyna);

                if (this.isStoped) {
                    this.resume();
                }

                this.updateVolume();
            }

            return true;
        }

        // =============================================================================== 
        private _isDetached: boolean = false;
        private _addTime: number = 0;

        /**
         * 是否脱管（相对Layabox的漏洞做的补漏处理）
         * 非循环音频，播放时间超过1分钟，则判定脱管
         */
        checkDetached(): boolean {
            if (this._isDetached) {
                return false;
            }

            if (!this.hasData) {
                return true;
            }

            if (this.data.loop != 1) {
                return false;
            }

            return frame.runTime - this._addTime > 60000;
        }

        /** 是否不检测脱管时间*/
        set isDetached(value: boolean) { this._isDetached = value; }
        set addTime(value: number) { this._addTime = value; }

        // =============================================================================== 
        /** 释放音频资源*/
        destroySound(): void {
            if (!this.hasData) {
                return;
            }
            Laya.SoundManager.destroySound(this.data.url);
        }
    }
}