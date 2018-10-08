module sear.ui {
    import layaLabel = laya.ui.Label;
    import Rectangle = sear.maths.Rectangle;
    import ShowUtil = sear.utils.ShowUtil;

    /**
     * 
     * 
     * @author pbk
     */
    export class Label extends layaLabel {
        static cloneLaya(og: layaLabel, ret: layaLabel): layaLabel {
            ret || (ret = new layaLabel());
            ShowUtil.cloneComponent(og, ret);

            ret.font = og.font;
            ret.fontSize = og.fontSize;
            ret.color = og.color;
            ret.align = og.align;
            ret.valign = og.valign;
            ret.bold = og.bold;
            ret.italic = og.italic;
            ret.padding = og.padding;
            ret.leading = og.leading;
            ret.wordWrap = og.wordWrap;
            ret.overflow = og.overflow;

            ret.underline = og.underline;
            ret.underlineColor = og.underlineColor;

            ret.stroke = og.stroke;
            ret.strokeColor = og.strokeColor;

            ret.bgColor = og.bgColor;
            ret.borderColor = og.borderColor;

            ret.text = og.text;

            return ret;
        }

        constructor() {
            super();
        }

        clone(ret: Label = null): Label {
            ret || (ret = new Label());
            return <Label>Label.cloneLaya(this, ret);
        }

        protected createChildren(): void {
            this.addChild(this._tf = new Text());
        }

        get rectangle(): Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }
        get textHeight(): number {
            return this._tf.textHeight;
        }
        get textWidth(): number {
            return this._tf.textWidth;
        }
        set toolTip(value: any) {
            this._toolTip = value;
        }
    }
}