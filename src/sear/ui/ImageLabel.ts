module sear.ui {
    import Rectangle = sear.maths.Rectangle;
    import Handler = sear.struct.Handler;
    import ShowUtil = sear.utils.ShowUtil;

    /**
     * skin
     * 
     * @author pbk
     */
    export class ImageLabel extends laya.ui.Component {
        private _text: string;
        private _align: string = Layout.ALIGN_LEFT;
        private _valign: string = Layout.VALIGN_BOTTOM;

        private _texs: Texture[] = [];
        private _urlRoot: string;
        private _urlExt: string;

        constructor() {
            super();
        }

        clone(ret: ImageLabel = null): ImageLabel {
            ret || (ret = new ImageLabel());
            ShowUtil.cloneComponent(this, ret);

            ret.align = this.align;
            ret.valign = this.valign;
            ret.skin = this.skin;

            return ret;
        }

        destroy(destroyChild: boolean = true): void {
            this.clear();
            this._texs = null;
            super.destroy(destroyChild);
        }

        clear(): void {
            this.graphics.clear();
            this._texs.length = 0;
        }

        private update(): void {
            this.clear();
            if (!this._text || !this._urlRoot) {
                return;
            }
            let len: number = this._text.length;
            if (len <= 0) {
                return;
            }
            let urls: string[] = [];
            for (let i: number = 0; i < len; ++i) {
                urls.push(this._urlRoot + this._text.charAt(i) + this._urlExt);
            }

            loadex.loadImages(urls, Handler.create(this, this.loadComplete, null, true));
        }

        private loadComplete(tex: Texture[]): void {
            if (!tex) {
                return;
            }
            this._texs = tex;
            this.updateLayout();
        }

        private updateLayout(): void {
            if (this._texs.length <= 0) {
                return;
            }

            let toX: number = 0;
            if (this.align != Layout.ALIGN_LEFT) {
                let maxW: number = 0;
                for (let tex of this._texs) {
                    maxW += tex.width;
                }
                if (this.align == Layout.ALIGN_RIGHT) {
                    toX = this.width - maxW;
                } else {
                    toX = (this.width - maxW) * 0.5;
                }
            }

            let offY: number = 0;
            let maxH: number = 0;
            let isCenter: boolean = false;
            if (this.valign != Layout.VALIGN_TOP) {
                for (let tex of this._texs) {
                    if (tex.height > maxH) {
                        maxH = tex.height;
                    }
                }
                offY = this.height - maxH;
                if (this.valign == Layout.VALIGN_MIDDLE) {
                    offY *= 0.5;
                    isCenter = true;
                }
            }

            let toY: number;
            this.graphics.clear();
            for (let tex of this._texs) {
                if (maxH == 0) {
                    toY = offY;
                } else {
                    toY = maxH - tex.height;
                    isCenter && (toY *= 0.5);
                    toY += offY;
                }

                this.graphics.drawTexture(tex, toX, toY);
                toX += tex.width;
            }
        }

        get rectangle(): Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }
        set toolTip(value: any) {
            this._toolTip = value;
        }
        get text(): string {
            return this._text;
        }
        set text(value: string) {
            if (this._text == value) {
                return;
            }
            this._text = value;
            this.callLater(this.update);
        }
        set skin(value: string) {
            this._urlRoot = null;
            this._urlExt = null;
            if (value != null) {
                let idxExt: number = value.lastIndexOf(".");
                let idxBoot: number = value.lastIndexOf("/");
                if (idxExt != -1 && idxBoot != -1 && idxExt > idxBoot) {
                    this._urlRoot = value.substring(0, idxBoot + 1);
                    this._urlExt = value.substring(idxExt);
                }
            }
            this.callLater(this.update);
        }
        get align(): string {
            return this._align;
        }
        set align(value: string) {
            if (this._align == value) {
                return;
            }
            this._align = value;
            this.callLater(this.updateLayout);
        }
        get valign(): string {
            return this._valign;
        }
        set valign(value: string) {
            if (this._valign == value) {
                return;
            }
            this._valign = value;
            this.callLater(this.updateLayout);
        }
    }
}