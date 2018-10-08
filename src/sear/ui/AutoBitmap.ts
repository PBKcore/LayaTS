module sear.ui {
    import layaAutoBitmap = laya.ui.AutoBitmap;
    import Point = sear.maths.Point;

    /**
     * [组件]
     * 
     * @author pbk
     */
    export class AutoBitmap extends layaAutoBitmap {
        private _offx: number = 0;
        private _offy: number = 0;
        private _scaleX: number = 1;
        private _scaleY: number = 1;

        constructor() {
            super();
        }

        drawTexture(tex: Texture, x: number = 0, y: number = 0, width: number = 0, height: number = 0, m: Matrix = null, alpha: number = 1): any {
            return super.drawTexture(tex, x + this.offx, y + this.offy, width, height, m, alpha);
        }

        cleanByTexture(tex: Texture, x: number, y: number, width: number = 0, height: number = 0): void {
            return super.cleanByTexture(tex, x + this.offx, y + this.offy, width, height);
        }

        fillTexture(tex: Texture, x: number, y: number, width: number = 0, height: number = 0, type: string = "repeat", offset: Point = null): void {
            return super.fillTexture(tex, x + this.offx, y + this.offy, width, height, type, offset);
        }
        get width(): number {
            return superGet(layaAutoBitmap, this, "width") * this._scaleX;
        }
        set width(value: number) {
            superSet(layaAutoBitmap, this, "width", value);
        }
        get height(): number {
            return superGet(layaAutoBitmap, this, "height") * this._scaleY;
        }
        set height(value: number) {
            superSet(layaAutoBitmap, this, "height", value);
        }
        get scaleX(): number {
            return this._scaleX;
        }
        set scaleX(value: number) {
            if (this._scaleX != value) {
                this._scaleX = value;
                this._setChanged();
            }
        }
        get scaleY(): number {
            return this._scaleY;
        }
        set scaleY(value: number) {
            if (this._scaleY != value) {
                this._scaleY = value;
                this._setChanged();
            }
        }
        get offx(): number {
            return this._offx + (this._scaleX == 1 ? 0 : superGet(layaAutoBitmap, this, "width") * (1 - this._scaleX) * 0.5);
        }
        set offx(value: number) {
            if (this._offx != value) {
                this._offx = value;
                this._setChanged();
            }
        }
        get offy(): number {
            return this._offy + (this._scaleY == 1 ? 0 : superGet(layaAutoBitmap, this, "height") * (1 - this._scaleY) * 0.5);
        }
        set offy(value: number) {
            if (this._offy != value) {
                this._offy = value;
                this._setChanged();
            }
        }
    }
}