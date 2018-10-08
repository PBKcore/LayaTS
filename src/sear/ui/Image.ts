module sear.ui {
    import Rectangle = sear.maths.Rectangle;
    import ShowUtil = sear.utils.ShowUtil;

    /**
     * 图片
     * skin sizeGrid
     * 
     * @author pbk
     */
    export class Image extends laya.ui.Image {
        constructor() {
            super();
        }

        clone(ret: Image = null): Image {
            ret || (ret = new Image());
            ShowUtil.cloneComponent(this, ret);

            ret.skin = this.skin;
            ret.sizeGrid = this.sizeGrid;

            return ret;
        }

        protected createChildren(): void {
            this.graphics = this._bitmap = new AutoBitmap();
            this._bitmap.autoCacheCmd = false;
        }

        get rectangle(): Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }
        set toolTip(value: any) {
            this._toolTip = value;
        }
    }
}