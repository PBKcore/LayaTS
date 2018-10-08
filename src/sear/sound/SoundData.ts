module sear.sound {
    import IPool = sear.pool.IPool;
    import IPosition = sear.maths.IPosition;

    /**
     * 音频播放数据
     * 对象池管理
     * 
     * @author pbk
     */
    export class SoundData implements IPool {
        constructor() {
            this.clear();
        }

        destroy(): void {
            this.clear();
            this._destroyed = true;
        }

        private _destroyed: boolean = false;
        get destroyed(): boolean {
            return this._destroyed;
        }

        recover(): void {
            pool.recSoundData(this);
        }

        clear(): void {
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
        }

        private _url: string;
        /** 音频资源路径*/
        get url(): string { return this._url; }
        set url(value: string) {
            this._url = value;

            if (value != null) {
                let len: number = value.length;
                if (len > 4) {
                    this._isMP3 = (value.slice(len - 4) == ".mp3");
                }
            }
        }
        private _isMP3: boolean;
        /** 是否MP3资源*/
        get isMP3(): boolean {
            return this._isMP3;
        }

        private _loop: number;
        /** 循环次数（0表示无限循环）*/
        get loop(): number { return this._loop; }
        set loop(value: number) { this._loop = value; }

        private _volume: number;
        /** 默认音量（0-1）*/
        get volume(): number { return this._volume; }
        set volume(value: number) { this._volume = formatVolume(value); }
        private _volumeMax: number;
        /** 最大音量（0-1）*/
        get volumeMax(): number { return this._volumeMax; }
        set volumeMax(value: number) { this._volumeMax = formatVolume(value); }
        private _volumeMin: number;
        /** 最小音量（0-1）*/
        get volumeMin(): number { return this._volumeMin; }
        set volumeMin(value: number) { this._volumeMin = formatVolume(value); }

        private _startTime: number;
        /** 开始播放时间（秒）*/
        get startTime(): number { return this._startTime; }
        set startTime(value: number) { this._startTime = value; }

        private _sameMax: number;
        /** 同种音频同时播放音频数量*/
        get sameMax(): number { return this._sameMax; }
        set sameMax(value: number) { this._sameMax = Math.max(value, 1); }

        private _mutexId: number;
        /** 音频互斥ID*/
        get mutexId(): number { return this._mutexId; }
        set mutexId(value: number) { this._mutexId = value; }

        // ==================================================================
        /** 是否是动态音频*/
        get isDynamic(): boolean {
            return this._bindPos && (this.isChangeVol || this.isChangePan);
        }

        private _bindPos: IPosition;
        /** 绑定音源位置*/
        get bindPos(): IPosition { return this._bindPos; }
        set bindPos(value: IPosition) { this._bindPos = value; }

        private _radius: number;
        /** 声音有效半径*/
        get radius(): number { return this._radius; }
        set radius(value: number) { this._radius = value; }

        private _isChangeVol: boolean;
        /** 是否音量变化*/
        get isChangeVol(): boolean { return this._isChangeVol && this._changeVolRadius > 0; }
        set isChangeVol(value: boolean) { this._isChangeVol = value; }
        private _changeVolRadius: number;
        /** 音量变化半径*/
        get changeVolRadius(): number { return this._changeVolRadius; }
        set changeVolRadius(value: number) { this._changeVolRadius = value; }

        private _isChangePan: boolean;
        /** 是否声向变化（暂未实现）*/
        get isChangePan(): boolean { return this._isChangePan && this._changePanRadius > 0; }
        set isChangePan(value: boolean) { this._isChangePan = value; }
        private _changePanRadius: number;
        /** 声向变化半径（暂未实现）*/
        get changePanRadius(): number { return this._changePanRadius; }
        set changePanRadius(value: number) { this._changePanRadius = value; }
    }
}