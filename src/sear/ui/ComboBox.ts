module sear.ui {
    import Rectangle = sear.maths.Rectangle;
    import ShowUtil = sear.utils.ShowUtil;

    /**
     * 下拉框
     * skin stateNum sizeGrid
     * scrollBarSkin
     * 
     * @author pbk
     */
    export class ComboBox extends laya.ui.ComboBox {
        constructor(skin: string = null, labels: string = null) {
            super(skin, labels);
        }

        clone(ret: ComboBox = null): ComboBox {
            ret || (ret = new ComboBox());
            ShowUtil.cloneComponent(this, ret);

            this.button.clone(ret.button);

            ret.scrollBarSkin = this.scrollBarSkin;

            ret.itemSize = this.itemSize;
            ret.visibleNum = this.visibleNum;
            ret.itemColors = this.itemColors;

            ret.items = this.items;

            return ret;
        }

        protected createChildren(): void {
            this.addChild(this._button = new Button());
            this._button.text.align = Layout.ALIGN_LEFT;
            this._button.labelPadding = "0,0,0,5";
            this._button.on(Event.MOUSE_DOWN, this, this["onButtonMouseDown"]);
        }

        addItem(item: string): void {
            this._labels.push(item);
        }

        get items(): string[] {
            return this._labels;
        }
        set items(value: string[]) {
            if (!value) {
                this._labels.length = 0;
            }
            this._labels = value;
        }
        get rectangle(): Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }
        set toolTip(value: any) {
            this._toolTip = value;
        }
        get button(): Button {
            return <Button>this._button;
        }
    }
}