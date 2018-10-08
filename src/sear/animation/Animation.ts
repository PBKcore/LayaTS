module sear.animation {
    import Timer = sear.frame.Timer;

    /**
     * 2D动画对象
     * 
     * @author pbk
     */
    export class Animation extends Sprite {

        /** 是否循环播放*/
        private _loop: boolean = false;
        /** 播放间隔（毫秒）*/
        private _interval: number = 50;
        /** 帧列表*/
        private _frames: TextureFrame[] = null;
        /** 帧数*/
        private _frameLen: number = 0;
        /** 当前帧下标*/
        private _index: number = 0;
        /** 是否播放中*/
        private _isPlaying: boolean = false;
        /** 是否逆序播放*/
        private _isReverse: boolean = false;

        private _timer: Timer = null;

        constructor() {
            super();
        }

        destroy(destroyChild: boolean = false): void {
            this.stop();

            super.destroy(destroyChild);
        }

        play(start: number = 0, loop: boolean = true): void {
            this._isPlaying = true;
            this.loop = loop;
            this.index = start;

            if (!this._timer) {
                this._timer = setDelayLoop(this.interval, this, this.frameLoop);
            } else {
                this._timer.delay = this.interval;
            }
        }

        stop(): void {
            this._isPlaying = false;

            if (this._timer) {
                this._timer.stop();
                this._timer = null;
            }
        }

        frameLoop(): void {
            if (this.isReverse) {
                this.index -= 1;
                if (!this.loop && this.index <= 0) {
                    this.stop();
                }
            } else {
                this.index += 1;
                if (!this.loop && this.index >= this.frameLen - 1) {
                    this.stop();
                }
            }
        }

        /**
         * 绘制帧纹理
         * @param texture 帧纹理
         * @param width 平铺绘制宽度
         * @param height 平铺绘制高度
         */
        drawTextureFrame(texture: TextureFrame): void {
            this.graphics.clear();

            if (!texture || texture.destroyed) {
                return;
            }
            let len: number = texture.length;
            if (len <= 0) {
                return;
            }

            if (len == 1) {
                if (texture.isFixSize) {
                    this.graphics.fillTexture(texture.textures[0], texture.offxs[0], texture.offys[0], texture.width, texture.height);
                } else {
                    this.graphics.drawTexture(texture.textures[0], texture.offxs[0], texture.offys[0]);
                }
            } else {
                for (let i: number = 0; i < len; ++i) {
                    this.graphics.drawTexture(texture.textures[i], texture.offxs[i], texture.offys[i]);
                }
            }
        }

        get loop(): boolean {
            return this._loop;
        }
        set loop(value: boolean) {
            this._loop = value;
        }
        get interval(): number {
            return this._interval;
        }
        set interval(value: number) {
            if (value == this._interval) {
                return;
            }
            this._interval = value;

            if (this._timer) {
                this._timer.delay = value;
            }
        }
        get frames(): TextureFrame[] {
            return this._frames;
        }
        set frames(value: TextureFrame[]) {
            this._frames = value;
            this._frameLen = value ? value.length : 0;
        }
        get frameLen(): number {
            return this._frameLen;
        }
        get index(): number {
            return this._index;
        }
        set index(value: number) {
            if (this.frameLen <= 0) {
                this._index = 0;
                return;
            }

            if (value < 0) {
                value = this.frameLen - 1;
            } else if (value >= this.frameLen) {
                value = 0;
            }
            this._index = value;
            this.drawTextureFrame(this.frames[this.index]);
        }
        get isPlaying(): boolean {
            return this._isPlaying;
        }
        /** 是否逆序播放*/
        get isReverse(): boolean {
            return this._isReverse;
        }
        set isReverse(value: boolean) {
            this._isReverse = value;
        }
    }
}