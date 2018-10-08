module sear.sound {

    /**
     * 音效格式在加速器里只支持wav，同时最多支持10个
     * 
     * @author pbk
     */
    export class SoundManager {
        private _dynaCtrl: SoundDynaCtrl = new SoundDynaCtrl();

        constructor() {
        }

        // ===============================================================================
        startup(): void {
            stage.on(Event.BLUR, this, this.stageOnBlurHandler);
            stage.on(Event.FOCUS, this, this.stageOnFocusHandler);
            stage.on(Event.VISIBILITY_CHANGE, this, this.visibilityChangeHandler);

            Laya.SoundManager.autoStopMusic = false;

            this.startCheckDetached();
        }

        private visibilityChangeHandler(): void {
            if (stage.isVisibility) {
                this.stageOnFocusHandler();
            } else {
                this.stageOnBlurHandler();
            }
        }

        private stageOnBlurHandler(): void {
            this.muted = true;
        }

        private stageOnFocusHandler(): void {
            this.muted = false;
        }

        // ===============================================================================
        /**
         * 播放音频
         * @param url 资源路径
         * @param loop 是否循环
         * @param data 扩展参数
         * @param isGetSound 是否获得Sound对象自行处理（不自动回收对象池）
         */
        playSound(url: string, loop: number = 1, data: SoundData = null, isGetSound: boolean = false): Sound {
            data || (data = pool.getSoundData());
            data.url = url;
            data.loop = loop;

            if (!this.enablePlay(data)) {
                return null;
            }

            let sound: Sound = pool.getSound();
            sound.setData(data);

            if (sound.play()) {
                sound.isDetached = isGetSound;
                this.checkMutex(sound);
                return isGetSound ? sound : null;
            } else {
                sound.recover();
                return null;
            }
        }

        // ===============================================================================
        private _muted: boolean = false;
        /** 静音所有声音*/
        get muted(): boolean {
            return this._muted;
        }
        set muted(value: boolean) {
            (this._muted == value) || (this._muted = value);
            this.updateVolume(true);
        }

        private _mutedMusic: boolean = false;
        /** 静音音乐*/
        get mutedMusic(): boolean {
            return this._mutedMusic;
        }
        set mutedMusic(value: boolean) {
            (this._mutedMusic == value) || (this._mutedMusic = value);
            this.updateVolume(false);
        }

        private _mutedSound: boolean = false;
        /** 静音音效*/
        get mutedSound(): boolean {
            return this._mutedSound;
        }
        set mutedSound(value: boolean) {
            (this._mutedSound == value) || (this._mutedSound = value);
            this.updateVolume(false);
        }

        private _volume: number = 1;
        /** 所有音量*/
        get volume(): number {
            return this._volume;
        }
        set volume(value: number) {
            this._volume = formatVolume(value);
            this.updateVolume(false);
        }

        private _volumeMusic: number = 1;
        /** 音乐音量*/
        get volumeMusic(): number {
            return this._volumeMusic;
        }
        set volumeMusic(value: number) {
            this._volumeMusic = formatVolume(value);
            this.updateVolume(false);
        }

        private _volumeSound: number = 1;
        /** 音效音量*/
        get volumeSound(): number {
            return this._volumeSound;
        }
        set volumeSound(value: number) {
            this._volumeSound = formatVolume(value);
            this.updateVolume(false);
        }

        private updateVolume(force: boolean): void {
            if (this.muted && !force) {
                return;
            }
            for (let sound of this._sounds) {
                sound.updateVolume();
            }
        }

        // ===============================================================================
        private _sounds: Sound[] = [];

        /**
         * @private
         * @param sound 
         */
        addSound(sound: Sound): void {
            if (!sound || !sound.hasData) {
                return;
            }

            this._dynaCtrl.addSound(sound);

            let idx: number = this._sounds.indexOf(sound);
            if (idx == -1) {
                this._sounds.push(sound);
                this.recordAdd(sound);
            }
        }

        /**
         * @private
         * @param sound 
         */
        delSound(sound: Sound): void {
            if (!sound || !sound.hasData) {
                return;
            }

            this._dynaCtrl.delSound(sound);

            let idx: number = this._sounds.indexOf(sound);
            if (idx != -1) {
                this._sounds.splice(idx, 1);
                this.recordDel(sound);
            }
        }

        // ===============================================================================
        // 同种声音的播放限制
        private _sameLimit: Object = {};
        // 互斥音频的播放限制
        private _mutexLimit: Object = {};

        // 检测各种播放限制
        private enablePlay(data: SoundData): boolean {
            if (!data) {
                return false;
            }

            // 检测同种音频播放限制
            if (this._sameLimit[data.url] && this._sameLimit[data.url] >= data.sameMax) {
                return false;
            }

            return true;
        }

        private recordAdd(sound: Sound): void {
            let url: string = sound.data.url;
            if (this._sameLimit[url]) {
                this._sameLimit[url] = 1;
            } else {
                this._sameLimit[url] += 1;
            }

            sound.addTime = frame.runTime;
        }

        private recordDel(sound: Sound): void {
            let url: string = sound.data.url;
            if (this._sameLimit[url] == 1) {
                delete this._sameLimit[url];
            } else {
                this._sameLimit[url] -= 1;
            }

            if (sound.data.mutexId != 0) {
                if (this._mutexLimit[sound.data.mutexId] = sound) {
                    delete this._mutexLimit[sound.data.mutexId];
                }
            }
        }

        private checkMutex(sound: Sound): void {
            if (sound.data.mutexId == 0) {
                return;
            }

            let lastSound: Sound = this._mutexLimit[sound.data.mutexId];
            if (lastSound && !lastSound.isStoped) {
                lastSound.stop();
            }

            this._mutexLimit[sound.data.mutexId] = sound;
        }

        // ===============================================================================
        // 检测脱管
        private startCheckDetached(): void {
            setDelayLoop(60000, this, this.checkDetached);
        }

        private checkDetached(): void {
            let dels: Sound[] = null;
            for (let sound of this._sounds) {
                if (sound.checkDetached()) {
                    if (dels == null) {
                        dels = [sound];
                    } else {
                        dels.push(sound);
                    }
                }
            }

            if (dels != null) {
                for (let sound of dels) {
                    sound.stop();
                }
            }
        }
    }

    /** 格式化声音数值*/
    export function formatVolume(value: number): number {
        if (value > 1) {
            return 1;
        } else if (value < 0) {
            return 0;
        } else if (isNaN(value)) {
            return 1;
        } else {
            return value;
        }
    }
}
module sear{
    export const soundex: sear.sound.SoundManager = new sear.sound.SoundManager();
}