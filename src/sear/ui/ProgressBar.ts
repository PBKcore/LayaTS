module sear.ui {
    import Rectangle = sear.maths.Rectangle;
    import ShowUtil = sear.utils.ShowUtil;

    /**
     * 进度条
     * 
     * @author pbk
     */
    export class ProgressBar extends laya.ui.ProgressBar {
        private _barWidth: number = 0;
        private _barHeight: number = 0;

        constructor(skin: string = "") {
            super(skin);
        }

        clone(ret: ProgressBar = null): ProgressBar {
            ret || (ret = new ProgressBar());
            ShowUtil.cloneComponent(this, ret);

            ret.skin = this.skin;
            ret.sizeGrid = this.sizeGrid;

            ret.barWidth = this.barWidth;
            ret.barHeight = this.barHeight;
            ret.barSkin = this.barSkin;
            ret.barSizeGrid = this.barSizeGrid;

            return ret;
        }

        protected createChildren(): void {
            this.addChild(this._bg = new Image());
            this.addChild(this._bar = new Image());
            this._bar._bitmap.autoCacheCmd = false;
        }

        protected changeValue(): void {
            if (this._bar.sizeGrid) {
                let grid: string[] = this._bar.sizeGrid.split(",");
                let lr: number = Number(grid[3]) + Number(grid[1]);
                this._bar.width = lr + (this.barWidth - lr) * this._value;
                this._bar.visible = this._bar.width > lr;
            } else {
                this._bar.width = this.barWidth * this._value;
            }
        }

        get rectangle(): Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }
        set toolTip(value: any) {
            this._toolTip = value;
        }
        set skin(value: string) {
            if (this._skin != value) {
                this._skin = value;
                this._bg.skin = this._skin;
                this.callLater(this.changeValue);
            }
        }
        set sizeGrid(value: string) {
            this._bg.sizeGrid = value;
        }
        set barSkin(value: string) {
            if (this._bar.skin != value) {
                this._bar.skin = value;
                this.callLater(this.changeValue);
            }
        }
        set barSizeGrid(value: string) {
            this._bar.sizeGrid = value;
        }
        get barWidth(): number {
            return this._barWidth <= 0 ? this.width : this._barWidth;
        }
        set barWidth(value: number) {
            this._barWidth = value;
            this._bar.width = value;
            this.callLater(this.changeValue);
        }
        get barHeight(): number {
            return this._barHeight <= 0 ? this.height : this._barHeight;
        }
        set barHeight(value: number) {
            this._barHeight = value;
            this._bar.height = value;
        }
        /** 静默设置进度值，不触发事件*/
        set valueMute(value: number) {
            if (this._value != value) {
                this._value = value > 1 ? 1 : (value < 0 ? 0 : value);
                this.callLater(this.changeValue);
            }
        }
    }
}