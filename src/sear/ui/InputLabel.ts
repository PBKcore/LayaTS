module sear.ui {
    import layaLabel = laya.ui.Label;
    import TextInput = laya.ui.TextInput;
    import Rectangle = sear.maths.Rectangle;

    /**
     * 输入文本
     * skin sizeGrid
     * 
     * @author pbk
     */
    export class InputLabel extends TextInput {
        private _bgx: number = 0;
        private _bgy: number = 0;

        constructor() {
            super();
        }

        clone(ret: InputLabel = null): InputLabel {
            ret || (ret = new InputLabel());
            Label.cloneLaya(this, ret);

            ret.bgx = this.bgx;
            ret.bgy = this.bgy;

            ret.skin = this.skin;
            ret.sizeGrid = this.sizeGrid;

            ret.type = this.type;
            ret.multiline = this.multiline;
            ret.editable = this.editable;
            ret.restrict = this.restrict;
            ret.maxChars = this.maxChars;
            ret.asPassword = this.asPassword;
            ret.prompt = this.prompt;
            ret.promptColor = this.promptColor;
            ret.text = this.text;

            return ret;
        }

        get rectangle(): Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }
        set toolTip(value: any) {
            this._toolTip = value;
        }
        get skin(): string {
            return this._skin;
        }
        set skin(value: string) {
            if (this._skin != value) {
                this._skin = value;
                if (sear.loadex.hasRes(value)) {
                    this.setSkin(value);
                } else {
                    sear.loadex.loadImage(value, this, this.setSkin, [value]);
                }
            }
        }
        private setSkin(url: string): void {
            if (this.destroyed) {
                return;
            }
            if (this._skin == url) {
                this._bg || (this.graphics = this._bg = new AutoBitmap());
                (<AutoBitmap>this._bg).offx = this.bgx;
                (<AutoBitmap>this._bg).offy = this.bgy;
                this._bg.source = sear.loadex.getRes(url);
                this._width && (this._bg.width = this._width - this.bgx * 2);
                this._height && (this._bg.height = this._height - this.bgy * 2);
            }
        }
        get sizeGrid(): string {
            return superGet(layaLabel, this, "sizeGrid");
        }
        set sizeGrid(value: string) {
            this._bg || (this.graphics = this._bg = new AutoBitmap());
            this._bg.sizeGrid = laya.ui.UIUtils.fillArray(laya.ui.Styles.defaultSizeGrid, value, Number);
        }
        get width(): number {
            return superGet(layaLabel, this, "width");
        }
        set width(value: number) {
            superSet(layaLabel, this, "width", value);
            this._bg && (this._bg.width = value - this.bgx * 2);
        }
        get height(): number {
            return superGet(layaLabel, this, "height");
        }
        set height(value: number) {
            superSet(layaLabel, this, "height", value);
            this._bg && (this._bg.height = value - this.bgy * 2);
        }
        /** 背景图偏移x坐标*/
        get bgx(): number {
            return this._bgx;
        }
        set bgx(value: number) {
            if (this._bgx != value) {
                this._bgx = value;
                this._bg && this._width && (this._bg.width = this._width - this.bgx * 2);
            }
        }
        /** 背景图偏移y坐标*/
        get bgy(): number {
            return this._bgy;
        }
        set bgy(value: number) {
            if (this._bgy != value) {
                this._bgy = value;
                this._bg && this._height && (this._bg.height = this._height - this.bgy * 2);
            }
        }
    }
}