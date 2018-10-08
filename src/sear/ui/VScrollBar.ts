module sear.ui {
    import Rectangle = sear.maths.Rectangle;
    import LoadType = sear.loader.LoadType;
    import Handler = sear.struct.Handler;
    import ShowUtil = sear.utils.ShowUtil;

    /**
     * [组件]
     * 
     * @author pbk
     */
    export class VScrollBar extends laya.ui.ScrollBar {
        constructor() {
            super();
        }

        clone(ret: VScrollBar = null): VScrollBar {
            ret || (ret = new VScrollBar());
            ShowUtil.cloneComponent(this, ret);

            ret.hide = this.hide;
            ret.skin = this.skin;
            ret.sizeGrid = this.sizeGrid;
            ret.max = this.max;
            ret.min = this.min;
            ret.tick = this.tick;
            ret.scrollSize = this.scrollSize;
            ret.thumbPercent = this.thumbPercent;
            ret.target = this.target;
            ret.touchScrollEnable = this.touchScrollEnable;
            ret.mouseWheelEnable = this.mouseWheelEnable;

            ret.showButtons = this.showButtons;
            (<Button>this.upButton).clone(<Button>ret.upButton);
            (<Button>this.downButton).clone(<Button>ret.downButton);

            return ret;
        }

        protected createChildren(): void {
            this.addChild(this.slider = new Slider());
            this.addChild(this.upButton = new Button());
            this.addChild(this.downButton = new Button());
        }

        get rectangle(): Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }
        set toolTip(value: any) {
            this._toolTip = value;
        }
        /** 格式：背景图片skin;滑动按钮skin;进度图片skin(可选)|上按钮skin;下按钮skin*/
        get skin(): string {
            return this._skin;
        }
        set skin(value: string) {
            if (this._skin != value) {
                this._skin = value;
                if (value) {
                    let skins: string[] = value.split(/;|\|/);
                    if (skins && skins.length > 0) {
                        if (loadex.hasRes(skins)) {
                            this.setSource(value);
                        } else {
                            loadex.load(skins, LoadType.image, Handler.create(this, this.setSource, [value], true));
                        }
                    }
                }
            }
        }
        protected setSource(url: string): void {
            if (this.destroyed) {
                return;
            }
            if (this._skin === url) {
                let skins: string[] = url.split("|");
                if (skins && skins.length > 0) {
                    this.slider.skin = skins[0];
                    if (skins.length > 1) {
                        skins = skins[1].split(";");
                        if (skins && skins.length > 2) {
                            this.upButton.skin = skins[0];
                            this.downButton.skin = skins[1];
                        }
                    }
                    this.callLater(this.changeScrollBar);
                }
            }
        }
        protected changeScrollBar(): void {
            this.upButton.visible = this._showButtons;
            this.downButton.visible = this._showButtons;
            if (this.slider.isVertical) {
                this.slider.y = this._showButtons ? this.upButton.height : 0;
            } else {
                this.slider.x = this._showButtons ? this.upButton.width : 0;
            }
            this["resetPositions"]();
            this.repaint();
        }
    }
}