module sear.ui {
    import layaButton = laya.ui.Button;
    import Rectangle = sear.maths.Rectangle;
    import FilterUtil = sear.utils.FilterUtil;
    import ShowUtil = sear.utils.ShowUtil;

    /**
     * 按钮
     * skin stateNum sizeGrid
     * 
     * @author pbk
     */
    export class Button extends layaButton {
        protected _clickFeedback: number = 0;
        private _isFeedback: boolean = false;

        constructor() {
            super(null, "");
        }

        clone(ret: Button = null): Button {
            ret || (ret = new Button());
            ShowUtil.cloneComponent(this, ret);

            ret.skin = this.skin;
            ret.stateNum = this.stateNum;
            ret.sizeGrid = this.sizeGrid;

            ret.labelFont = this.labelFont;
            ret.labelSize = this.labelSize;
            ret.labelColors = this.labelColors;
            ret.labelBold = this.labelBold;
            ret.labelPadding = this.labelPadding;
            ret.labelAlign = this.labelAlign;
            ret.labelValign = this.labelValign;

            ret.strokeColors = this.strokeColors;
            ret.labelStroke = this.labelStroke;
            ret.labelStrokeColor = this.labelStrokeColor;

            ret.clickFeedback = this.clickFeedback;

            return ret;
        }

        protected createChildren(): void {
            this.graphics = this._bitmap = new AutoBitmap();
        }

        protected createText(): void {
            if (!this._text) {
                this._text = new Text();
                this._text.overflow = Text.HIDDEN;
                this._text.align = Layout.ALIGN_CENTER;
                this._text.valign = Layout.VALIGN_MIDDLE;
                this._text.width = this._width;
                this._text.height = this._height;
            }
        }

        protected onMouse(e: Event): void {
            if (this.toggle === false && this._selected) {
                return;
            }
            if (e.type == Event.CLICK) {
                if (this.toggle) {
                    this.selected = !this._selected;
                }
                if (this._clickHandler) {
                    this._clickHandler.run();
                }
                return;
            } else if (e.type == Event.MOUSE_DOWN) {
                this.feedback(true);
            } else if (e.type == Event.MOUSE_UP) {
                this.feedback(false);
            } else if (e.type == Event.MOUSE_OUT) {
                this.feedback(false);
            }
            if (!this._selected) {
                this.state = layaButton.stateMap[e.type];
            }
        }

        /** 注册点击回调*/
        onClick(caller: any, method: Function, args: any[] = null): void {
            this.clickHandler = Laya.Handler.create(caller, method, args, false);
        }

        private feedback(show: boolean): void {
            if (this._clickFeedback == 0 || this._isFeedback == show) {
                return;
            }
            if (this._clickFeedback == 1) {
                if (show) {
                    (<AutoBitmap>this._bitmap).scaleX = 0.9;
                    (<AutoBitmap>this._bitmap).scaleY = 0.9;
                } else {
                    (<AutoBitmap>this._bitmap).scaleX = 1;
                    (<AutoBitmap>this._bitmap).scaleY = 1;
                }
            } else if (this._clickFeedback == 2) {
                if (show) {
                    FilterUtil.addFilter(this, FilterUtil.getHightLight());
                } else {
                    FilterUtil.delFilter(this, FilterUtil.getHightLight());
                }
            }

            this._isFeedback = show;
        }

        get rectangle(): Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }
        set toolTip(value: any) {
            this._toolTip = value;
        }
        /** 鼠标点击反馈效果（0无反馈；1缩放；2高亮）*/
        get clickFeedback(): number {
            return this._clickFeedback;
        }
        set clickFeedback(value: number) {
            if (this._clickFeedback != value) {
                if (value > 0 && this.stateNum != 1) {// 先限制单态按钮才有效果
                    return;
                }
                this.feedback(false);
                this._clickFeedback = value;
            }
        }
        get skin(): string {
            return this._skin;
        }
        set skin(value: string) {
            if (this._skin != value) {
                this._skin = value;
                if (value) {
                    if (loadex.hasRes(value)) {
                        this.setSource(value);
                    } else {
                        loadex.loadImage(value, this, this.setSource, [value]);
                    }
                }
            }
        }
        get labelValign(): string {
            this.createText();
            return this._text.valign;
        }
        set labelValign(value: string) {
            this.createText();
            this._text.valign = value;
        }
        protected setSource(url: string): void {
            if (this.destroyed) {
                return;
            }
            if (this._skin === url) {
                this.callLater(this.changeClips);
                this._setStateChanged();
            }
        }
    }
}