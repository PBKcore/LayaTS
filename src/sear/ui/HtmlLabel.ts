module sear.ui {
    import HTMLDivElement = laya.html.dom.HTMLDivElement;
    import Rectangle = sear.maths.Rectangle;
    import ShowUtil = sear.utils.ShowUtil;

    /**
     * 
     * 
     * @author pbk
     */
    export class HtmlLabel extends laya.ui.Component {
        private _htmlDiv: HTMLDivElement;
        private _text: string = "";

        constructor() {
            super();
        }

        clone(ret: HtmlLabel = null): HtmlLabel {
            ret || (ret = new HtmlLabel());
            ShowUtil.cloneComponent(this, ret);

            ret.align = this.align;
            ret.valign = this.valign;
            ret.padding = this.padding;
            ret.leading = this.leading;
            ret.password = this.password;

            ret.stroke = this.stroke;
            ret.strokeColor = this.strokeColor;

            ret.bgColor = this.bgColor;
            ret.borderColor = this.borderColor;

            ret.text = this.text;

            return ret;
        }

        destroy(destroyChild: boolean = true): void {
            this._htmlDiv = null;
            super.destroy(destroyChild);
        }

        createChildren(): void {
            this.addChild(this._htmlDiv = new HTMLDivElement());
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
            this._text = value;
            this._htmlDiv.innerHTML = value;
        }
        /** html纯文字*/
        get textWord(): string {
            let word: string = "";
            let chars: laya.utils.HTMLChar[] = this._getWords();
            for (let char of chars) {
                word += char.char;
            }
            return word;
        }
        get textHeight(): number {
            return this._htmlDiv.contextHeight;
        }
        get textWidth(): number {
            return this._htmlDiv.contextWidth;
        }
        get leading(): number {
            return this._htmlDiv.style.leading;
        }
        set leading(value: number) {
            this._htmlDiv.style.leading = value;
            this._htmlDiv.innerHTML = this._text;
        }
        get align(): string {
            return this._htmlDiv.style.align;
        }
        set align(value: string) {
            this._htmlDiv.style.align = value;
        }
        get valign(): string {
            return this._htmlDiv.style.valign;
        }
        set valign(value: string) {
            this._htmlDiv.style.valign = value;
        }
        get padding(): any[] {
            return this._htmlDiv.style.padding;
        }
        set padding(value: any[]) {
            this._htmlDiv.style.padding = value;
        }
        get password(): boolean {
            return this._htmlDiv.style.password;
        }
        set password(value: boolean) {
            this._htmlDiv.style.password = value;
        }
        get stroke(): number {
            return this._htmlDiv.style.stroke;
        }
        set stroke(value: number) {
            this._htmlDiv.style.stroke = value;
        }
        get strokeColor(): string {
            return this._htmlDiv.style.strokeColor;
        }
        set strokeColor(value: string) {
            this._htmlDiv.style.strokeColor = value;
        }
        get bgColor(): string {
            return this._htmlDiv.style.backgroundColor;
        }
        set bgColor(value: string) {
            this._htmlDiv.style.backgroundColor = value;
        }
        get borderColor(): string {
            return this._htmlDiv.style.borderColor;
        }
        set borderColor(value: string) {
            this._htmlDiv.style.borderColor = value;
        }
    }
}