module uitool.ui.select {
    import Sprite = sear.Sprite;
    import Button = sear.ui.Button;
    import Event = sear.Event;

    /**
     * UI包围框
     * 
     * @author pbk
     */
    export class UIBound extends Sprite {
        private _ctrl: ComponentCtrl;

        private _btnW: Button;
        private _btnH: Button;
        private _btnWH: Button;
        private _btnScroll: Button;

        constructor(ctrl: ComponentCtrl) {
            super();

            this._ctrl = ctrl;

            this._btnW = this.createBtn("#00ff00");
            this._btnW.on(Event.MOUSE_DOWN, this, this.onChange, [1]);
            this._btnH = this.createBtn("#00ff00");
            this._btnH.on(Event.MOUSE_DOWN, this, this.onChange, [2]);
            this._btnWH = this.createBtn("#00ff00");
            this._btnWH.on(Event.MOUSE_DOWN, this, this.onChange, [3]);
            this._btnScroll = this.createBtn("#ffff00");
            this._btnScroll.on(Event.MOUSE_DOWN, this, this.onChange, [4]);
        }

        private createBtn(color: string): Button {
            let btn: Button = new Button();
            btn.width = 4;
            btn.height = 4;
            btn.graphics.drawRect(0, 0, 4, 4, color);
            btn.clickFeedback = 2;
            this.addChild(btn);
            return btn;
        }

        destroy(): void {
            this.onChangeEnd();

            if (this._btnW) {
                this._btnW.destroy();
                this._btnW;
            }
            if (this._btnH) {
                this._btnH.destroy();
                this._btnH;
            }
            if (this._btnWH) {
                this._btnWH.destroy();
                this._btnWH;
            }
            if (this._btnScroll) {
                this._btnScroll.destroy();
                this._btnScroll;
            }

            this.graphics.clear();

            this._ctrl = null;
            super.destroy(true);
        }

        private _tw: number;
        private _th: number;
        updateShow(): void {
            this._tw = this._ctrl.uiIns.width;
            this._th = this._ctrl.uiIns.height;

            this.graphics.clear();
            this.graphics.drawRect(0, 0, this._ctrl.uiIns.width, this._ctrl.uiIns.height, null, "#ff0000");

            this._btnW.x = this._tw - this._btnW.width;
            this._btnW.y = (this._th - this._btnW.height) * 0.5;

            this._btnH.x = (this._tw - this._btnH.width) * 0.5;
            this._btnH.y = this._th - this._btnH.height;

            this._btnWH.x = this._tw - this._btnWH.width;
            this._btnWH.y = this._th - this._btnWH.height;

            this._btnScroll.x = this._tw - this._btnScroll.width;
            this._btnScroll.y = this._th - this._btnScroll.height * 2;
        }

        private onChange(type: number): void {
            sear.stage.on(Event.MOUSE_UP, this, this.onChangeEnd);
            sear.stage.on(Event.MOUSE_MOVE, this, this.moveChange, [false, false]);

            record.recordNew();

            this._type = type;
            this._sw = this._ctrl.uiIns.width;
            this._sh = this._ctrl.uiIns.height;
            this._sx = this._sw - sear.stage.mouseX;
            this._sy = this._sh - sear.stage.mouseY;
        }

        private onChangeEnd(): void {
            sear.stage.off(Event.MOUSE_UP, this, this.onChangeEnd);
            sear.stage.off(Event.MOUSE_MOVE, this, this.moveChange);

            this.moveChange(true, true);
        }

        private _type: number;// 1宽；2高；3宽高；4等比例
        private _sw: number;
        private _sh: number;
        private _sx: number;
        private _sy: number;
        private moveChange(isRecord: boolean, force: boolean): void {
            if (this._type == 1) {
                this._tw = Math.max(this._sx + sear.stage.mouseX, 1);
                this._ctrl.setValue("width", this._tw, isRecord, force);
            } else if (this._type == 2) {
                this._th = Math.max(this._sy + sear.stage.mouseY, 1);
                this._ctrl.setValue("height", this._th, isRecord, force);
            } else {
                this._tw = Math.max(this._sx + sear.stage.mouseX, 1);
                this._th = Math.max(this._sy + sear.stage.mouseY, 1);
                if (this._type == 3) {
                    this._ctrl.setValue("width", this._tw, isRecord, force);
                    this._ctrl.setValue("height", this._th, isRecord, force);
                } else if (this._type == 4) {
                    this._tw = Math.max(this._tw / this._sw, this._th / this._sh);
                    this._ctrl.setValue("width", this._sw * this._tw, isRecord, force);
                    this._ctrl.setValue("height", this._sh * this._th, isRecord, force);
                }
            }

            this.updateShow();
        }
    }
}