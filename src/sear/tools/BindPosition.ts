module sear.tools {
    import Sprite = sear.Sprite;
    import Timer = sear.frame.Timer;
    import Point = sear.maths.Point;
    import DisplayUtil = sear.utils.ShowUtil;

    /**
     * 绑定对象的相对位置
     * 
     * @author pbk
     */
    export class BindPosition {
        private _target: Sprite;
        private _offx: number = 0;
        private _offy: number = 0;

        private _binds: Sprite[] = [];
        private _timer: Timer;

        /**
         * 
         * @param target 默认绑定鼠标
         * @param offx 相对于target偏移X坐标
         * @param offy 相对于target偏移Y坐标
         */
        constructor(target: Sprite = null, offx: number = 0, offy: number = 0) {
            this._target = target;
            this._offx = offx;
            this._offy = offy;
        }

        destory(): void {
            this.stopTimer();
            this._target = null;
            this._binds.length = 0;
            this._binds = null;
        }

        bind(obj: Sprite | Sprite[]): void {
            if (!obj) {
                return;
            }

            if (obj instanceof Sprite) {
                this._binds.push(obj);
            } else {
                this._binds.concat(obj);
            }

            if (!this._timer) {
                this._timer = setFrameLoop(this, this.syncPos);
            }
        }

        unload(obj: Sprite | Sprite[]): void {
            if (!obj) {
                return;
            }

            if (obj instanceof Sprite) {
                arrayDelete(this._binds, obj);
            } else {
                arrayDeletes(this._binds, obj);
            }

            if (this._binds.length == 0) {
                this.stopTimer();
            }
        }

        unloadAll(): void {
            this._binds.length = 0;
            this.stopTimer();
        }

        private _tarX: number;
        private _tarY: number;
        private _relY: number;
        private syncPos(): void {
            let pos: Point;
            if (this._target) {
                pos = DisplayUtil.relativePos(this._target);
                this._tarX = pos.x;
                this._tarY = pos.y;
            } else {
                this._tarX = sear.stage.mouseX;
                this._tarY = sear.stage.mouseY;
            }

            for (let cell of this._binds) {
                pos = DisplayUtil.relativePos(cell);
                this._relY = pos.y;// 避免x设置时使用临时Point出错
                cell.x += (this._tarX + this._offx - pos.x);
                cell.y += (this._tarY + this._offy - this._relY);
            }
        }

        private stopTimer(): void {
            if (this._timer) {
                this._timer.stop();
                this._timer = null;
            }
        }
    }
}