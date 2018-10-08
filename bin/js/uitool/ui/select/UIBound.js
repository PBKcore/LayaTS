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
var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var select;
        (function (select) {
            var Sprite = sear.Sprite;
            var Button = sear.ui.Button;
            var Event = sear.Event;
            /**
             * UI包围框
             *
             * @author pbk
             */
            var UIBound = /** @class */ (function (_super) {
                __extends(UIBound, _super);
                function UIBound(ctrl) {
                    var _this = _super.call(this) || this;
                    _this._ctrl = ctrl;
                    _this._btnW = _this.createBtn("#00ff00");
                    _this._btnW.on(Event.MOUSE_DOWN, _this, _this.onChange, [1]);
                    _this._btnH = _this.createBtn("#00ff00");
                    _this._btnH.on(Event.MOUSE_DOWN, _this, _this.onChange, [2]);
                    _this._btnWH = _this.createBtn("#00ff00");
                    _this._btnWH.on(Event.MOUSE_DOWN, _this, _this.onChange, [3]);
                    _this._btnScroll = _this.createBtn("#ffff00");
                    _this._btnScroll.on(Event.MOUSE_DOWN, _this, _this.onChange, [4]);
                    return _this;
                }
                UIBound.prototype.createBtn = function (color) {
                    var btn = new Button();
                    btn.width = 4;
                    btn.height = 4;
                    btn.graphics.drawRect(0, 0, 4, 4, color);
                    btn.clickFeedback = 2;
                    this.addChild(btn);
                    return btn;
                };
                UIBound.prototype.destroy = function () {
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
                    _super.prototype.destroy.call(this, true);
                };
                UIBound.prototype.updateShow = function () {
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
                };
                UIBound.prototype.onChange = function (type) {
                    sear.stage.on(Event.MOUSE_UP, this, this.onChangeEnd);
                    sear.stage.on(Event.MOUSE_MOVE, this, this.moveChange, [false, false]);
                    uitool.record.recordNew();
                    this._type = type;
                    this._sw = this._ctrl.uiIns.width;
                    this._sh = this._ctrl.uiIns.height;
                    this._sx = this._sw - sear.stage.mouseX;
                    this._sy = this._sh - sear.stage.mouseY;
                };
                UIBound.prototype.onChangeEnd = function () {
                    sear.stage.off(Event.MOUSE_UP, this, this.onChangeEnd);
                    sear.stage.off(Event.MOUSE_MOVE, this, this.moveChange);
                    this.moveChange(true, true);
                };
                UIBound.prototype.moveChange = function (isRecord, force) {
                    if (this._type == 1) {
                        this._tw = Math.max(this._sx + sear.stage.mouseX, 1);
                        this._ctrl.setValue("width", this._tw, isRecord, force);
                    }
                    else if (this._type == 2) {
                        this._th = Math.max(this._sy + sear.stage.mouseY, 1);
                        this._ctrl.setValue("height", this._th, isRecord, force);
                    }
                    else {
                        this._tw = Math.max(this._sx + sear.stage.mouseX, 1);
                        this._th = Math.max(this._sy + sear.stage.mouseY, 1);
                        if (this._type == 3) {
                            this._ctrl.setValue("width", this._tw, isRecord, force);
                            this._ctrl.setValue("height", this._th, isRecord, force);
                        }
                        else if (this._type == 4) {
                            this._tw = Math.max(this._tw / this._sw, this._th / this._sh);
                            this._ctrl.setValue("width", this._sw * this._tw, isRecord, force);
                            this._ctrl.setValue("height", this._sh * this._th, isRecord, force);
                        }
                    }
                    this.updateShow();
                };
                return UIBound;
            }(Sprite));
            select.UIBound = UIBound;
        })(select = ui.select || (ui.select = {}));
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=UIBound.js.map