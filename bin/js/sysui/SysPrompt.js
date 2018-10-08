var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var sysui;
(function (sysui) {
    var Sprite = sear.Sprite;
    var Handler = sear.struct.Handler;
    var Layout = sear.ui.Layout;
    /**
     * 系统提示面板
     *
     * @author pbk
     */
    var SysPrompt = /** @class */ (function (_super) {
        __extends(SysPrompt, _super);
        function SysPrompt() {
            var _this = _super.call(this) || this;
            _this.width = sear.stage.width;
            _this.height = sear.stage.height;
            _this._block = new Sprite();
            _this._block.width = _this.width;
            _this._block.height = _this.height;
            _this._block.graphics.drawRect(0, 0, _this.width, _this.height, "#000000");
            _this._block.alpha = 0.3;
            _this._block.mouseEnabled = true;
            _this._block.mouseThrough = false;
            _this.addChild(_this._block);
            _this._labText = sysui.getLabel(800, 500);
            _this._labText.fontSize = 22;
            _this._labText.color = "#e4eabb";
            _this._labText.wordWrap = true;
            _this._labText.align = Layout.ALIGN_CENTER;
            _this._labText.x = (_this.width - _this._labText.width) * 0.5;
            _this.addChild(_this._labText);
            _this._btnYes = sysui.getButton(100, 30);
            _this._btnYes.onClick(_this, _this.onYes);
            _this._btnYes.x = _this.width * 0.5 - 120;
            _this.addChild(_this._btnYes);
            _this._btnNo = sysui.getButton(100, 30);
            _this._btnNo.onClick(_this, _this.onNo);
            _this._btnNo.x = _this.width * 0.5 + 20;
            _this.addChild(_this._btnNo);
            return _this;
        }
        SysPrompt.showFast = function (text, caller, method, args) {
            if (args === void 0) { args = null; }
            SysPrompt.show(text, Handler.create(caller, method, args, true));
        };
        SysPrompt.show = function (text, handlerYes, handlerNo, labYes, labNo) {
            if (handlerNo === void 0) { handlerNo = null; }
            if (labYes === void 0) { labYes = "YES"; }
            if (labNo === void 0) { labNo = "NO"; }
            SysPrompt.ins || (SysPrompt.ins = new SysPrompt());
            if (!SysPrompt.ins.parent) {
                sear.stage.addChild(SysPrompt.ins);
            }
            SysPrompt.ins.setData(text, handlerYes, handlerNo, labYes, labNo);
        };
        SysPrompt.prototype.setData = function (text, handlerYes, handlerNo, labYes, labNo) {
            this._labText.text = text;
            this._btnYes.label = labYes;
            this._btnNo.label = labNo;
            this._handlerYes = handlerYes;
            this._handlerNo = handlerNo;
            var textH = this._labText.textHeight;
            this._labText.y = (this.height - textH) * 0.5;
            this._btnYes.y = this._btnNo.y = this._labText.y + textH + 30;
            var textW = this._labText.textWidth;
            var off = 20;
            this.graphics.clear();
            this.graphics.drawRect(Math.min((this.width - textW) * 0.5, this._btnYes.x) - off, this._labText.y - off, Math.max(textW, this._btnNo.x + this._btnNo.width - this._btnYes.x) + off * 2, this._btnYes.y + this._btnYes.height - this._labText.y + off * 2, "#5d5a5a", "#000000");
        };
        SysPrompt.prototype.onYes = function () {
            if (this._handlerYes) {
                this._handlerYes.run();
            }
            this.removeSelf();
        };
        SysPrompt.prototype.onNo = function () {
            if (this._handlerNo) {
                this._handlerNo.run();
            }
            this.removeSelf();
        };
        return SysPrompt;
    }(Sprite));
    sysui.SysPrompt = SysPrompt;
})(sysui || (sysui = {}));
//# sourceMappingURL=SysPrompt.js.map