module sear.sound {
    import IPosition = sear.maths.IPosition;
    import Timer = sear.frame.Timer;

    /**
     * 动态音频控制器
     * 
     * @author pbk
     */
    export class SoundDynaCtrl {
        constructor() {
        }

        // ===============================================================================
        private _bindFocus: IPosition = null;

        /**
         * 绑定声音焦点，根据位置调节音量大小
         * @param focus 
         */
        setBindFocus(focus: IPosition): void {
            this._bindFocus = focus;
        }

        get bindFocus(): IPosition {
            return this._bindFocus;
        }

        // ===============================================================================
        private _sounds: Sound[] = [];

        addSound(sound: Sound): void {
            if (!sound || !sound.isDynamic) {
                return;
            }

            let idx: number = this._sounds.indexOf(sound);
            if (idx == -1) {
                this._sounds.push(sound);
                this.autoCheckSwitch();
            }
        }

        delSound(sound: Sound): void {
            if (!sound) {
                return;
            }

            let idx: number = this._sounds.indexOf(sound);
            if (idx != -1) {
                this._sounds.splice(idx, 1);
                this.autoCheckSwitch();
            }
        }

        get sounds(): Sound[] {
            return this._sounds;
        }

        // ===============================================================================
        private _timer: Timer = null;
        private autoCheckSwitch(): void {
            if (this._sounds.length > 0) {
                if (this._timer != null) {
                    return;
                }

                this._timer = setFrameLoop(this, this.autoAdjust);
            } else {
                if (this._timer == null) {
                    return;
                }

                this._timer.stop();
                this._timer = null;
            }
        }

        private autoAdjust(): void {
            if (!this._bindFocus) {
                return;
            }

            let dels: Sound[];

            for (let sound of this._sounds) {
                if (!sound.isDynamic) {
                    dels || (dels = []);
                    dels.push(sound);
                    return;
                }

                if (!sound.updateVolumeDynamic(this._bindFocus)) {
                    dels || (dels = []);
                    dels.push(sound);
                }
            }

            if (dels) {
                for (let sound of dels) {
                    this.delSound(sound);
                }
            }
        }
    }
}