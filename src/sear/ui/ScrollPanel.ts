module sear.ui {
    import layaPanel = laya.ui.Panel;
    import Rectangle = sear.maths.Rectangle;
    import ShowUtil = sear.utils.ShowUtil;

    /**
     * 滚动面板
     * 
     * @author pbk
     */
    export class ScrollPanel extends layaPanel {

        protected _fixContentWidth: number = 0;
        protected _fixContentHeight: number = 0;

        constructor() {
            super();
        }

        clone(ret: ScrollPanel = null): ScrollPanel {
            ret || (ret = new ScrollPanel());
            ShowUtil.cloneComponent(this, ret);

            if (this.vScrollBar) {
                ret.vScrollBarSkin = this.vScrollBarSkin;
                (<VScrollBar>this.vScrollBar).clone(<VScrollBar>ret.vScrollBar);
            }

            if (this.hScrollBar) {
                ret.hScrollBarSkin = this.hScrollBarSkin;
                (<HScrollBar>this.hScrollBar).clone(<HScrollBar>ret.hScrollBar);
            }

            return ret;
        }

        protected rawAddChild(child: Node): Node {
            let fun: Function = Sprite.prototype["addChild"];
            return fun ? fun.call(this, child) : null;
        }

        /** 移除容器中所有的子对象*/
        removeAllChilds(destroyChild: boolean = false): void {
            while (this.content.numChildren > 0) {
                let node: Node = this.content.removeChildAt(0);
                if (destroyChild) {
                    node.destroy();
                }
            }
        }

        get rectangle(): Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }
        set toolTip(value: any) {
            this._toolTip = value;
        }
        /** 格式：背景图片skin;滑动按钮skin;进度图片skin(可选)|上按钮skin;下按钮skin*/
        get vScrollBarSkin(): string {
            return this._vScrollBar ? this._vScrollBar.skin : null;
        }
        set vScrollBarSkin(value: string) {
            if (!this._vScrollBar) {
                this.rawAddChild(this._vScrollBar = new VScrollBar());
                this._vScrollBar.on(Event.CHANGE, this, this.onScrollBarChange, [this._vScrollBar]);
                this._vScrollBar.target = this._content;
            }
            this._vScrollBar.skin = value;
            this.callLater(this._setScrollChanged);
        }
        /** 格式：背景图片skin;滑动按钮skin;进度图片skin(可选)|左按钮skin;右按钮skin*/
        get hScrollBarSkin(): string {
            return this._hScrollBar ? this._hScrollBar.skin : null;
        }
        set hScrollBarSkin(value: string) {
            if (!this._hScrollBar) {
                let hBar: any = new HScrollBar();
                this.rawAddChild(this._hScrollBar = hBar);// js无类型检查，这样强制类型转换
                this._hScrollBar.on(Event.CHANGE, this, this.onScrollBarChange, [this._hScrollBar]);
                this._hScrollBar.target = this._content;
            }
            this._hScrollBar.skin = value;
            this.callLater(this._setScrollChanged);
        }
        /** 固定内容宽度*/
        get fixContentWidth(): number {
            return this._fixContentWidth;
        }
        set fixContentWidth(value: number) {
            if (this._fixContentWidth != value) {
                this._fixContentWidth = value;
                this._setScrollChanged();
            }
        }
        /** 固定内容高度*/
        get fixContentHeight(): number {
            return this._fixContentHeight;
        }
        set fixContentHeight(value: number) {
            if (this._fixContentHeight != value) {
                this._fixContentHeight = value;
                this._setScrollChanged();
            }
        }
        get contentWidth(): number {
            if (this._fixContentWidth > 0) {
                return this._fixContentWidth;
            }
            return superGet(layaPanel, this, "contentWidth");
        }
        get contentHeight(): number {
            if (this._fixContentHeight > 0) {
                return this._fixContentHeight;
            }
            return superGet(layaPanel, this, "contentHeight");
        }
        /** 滚动显示区域最左端值*/
        get scrollX(): number {
            return this._content && this._content.scrollRect ? this._content.scrollRect.x : 0;
        }
        /** 滚动显示区域最顶部值*/
        get scrollY(): number {
            return this._content && this._content.scrollRect ? this._content.scrollRect.y : 0;
        }
    }
}