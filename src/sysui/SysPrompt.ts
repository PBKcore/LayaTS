module sysui {
    import Sprite = sear.Sprite;
    import Handler = sear.struct.Handler;
    import Layout = sear.ui.Layout;
    import Label = sear.ui.Label;
    import Button = sear.ui.Button;

    /**
     * 系统提示面板
     * 
     * @author pbk
     */
    export class SysPrompt extends Sprite {
        private static ins: SysPrompt;

        static showFast(text: string, caller: any, method: Function, args: any[] = null): void {
            SysPrompt.show(text, Handler.create(caller, method, args, true));
        }

        static show(text: string, handlerYes: Handler, handlerNo: Handler = null, labYes: string = "YES", labNo: string = "NO"): void {
            SysPrompt.ins || (SysPrompt.ins = new SysPrompt());
            if (!SysPrompt.ins.parent) {
                sear.stage.addChild(SysPrompt.ins);
            }
            SysPrompt.ins.setData(text, handlerYes, handlerNo, labYes, labNo);
        }

        private _block: Sprite;
        private _labText: Label;
        private _btnYes: Button;
        private _btnNo: Button;

        private _handlerYes: Handler;
        private _handlerNo: Handler;

        constructor() {
            super();

            this.width = sear.stage.width;
            this.height = sear.stage.height;

            this._block = new Sprite();
            this._block.width = this.width;
            this._block.height = this.height;
            this._block.graphics.drawRect(0, 0, this.width, this.height, "#000000");
            this._block.alpha = 0.3;
            this._block.mouseEnabled = true;
            this._block.mouseThrough = false;
            this.addChild(this._block);

            this._labText = getLabel(800, 500);
            this._labText.fontSize = 22;
            this._labText.color = "#e4eabb";
            this._labText.wordWrap = true;
            this._labText.align = Layout.ALIGN_CENTER;
            this._labText.x = (this.width - this._labText.width) * 0.5;
            this.addChild(this._labText);

            this._btnYes = getButton(100, 30);
            this._btnYes.onClick(this, this.onYes);
            this._btnYes.x = this.width * 0.5 - 120;
            this.addChild(this._btnYes);

            this._btnNo = getButton(100, 30);
            this._btnNo.onClick(this, this.onNo);
            this._btnNo.x = this.width * 0.5 + 20;
            this.addChild(this._btnNo);
        }

        setData(text: string, handlerYes: Handler, handlerNo: Handler, labYes: string, labNo: string): void {
            this._labText.text = text;
            this._btnYes.label = labYes;
            this._btnNo.label = labNo;
            this._handlerYes = handlerYes;
            this._handlerNo = handlerNo;

            let textH: number = this._labText.textHeight;
            this._labText.y = (this.height - textH) * 0.5;
            this._btnYes.y = this._btnNo.y = this._labText.y + textH + 30;

            let textW: number = this._labText.textWidth;
            let off: number = 20;
            this.graphics.clear();
            this.graphics.drawRect(
                Math.min((this.width - textW) * 0.5, this._btnYes.x) - off,
                this._labText.y - off,
                Math.max(textW, this._btnNo.x + this._btnNo.width - this._btnYes.x) + off * 2,
                this._btnYes.y + this._btnYes.height - this._labText.y + off * 2,
                "#5d5a5a", "#000000"
            );
        }

        private onYes(): void {
            if (this._handlerYes) {
                this._handlerYes.run();
            }
            this.removeSelf();
        }

        private onNo(): void {
            if (this._handlerNo) {
                this._handlerNo.run();
            }
            this.removeSelf();
        }
    }
}