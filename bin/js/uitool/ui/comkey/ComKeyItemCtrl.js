var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var comkey;
        (function (comkey) {
            var Event = sear.Event;
            /**
             * 组件属性值控制
             *
             * @author pbk
             */
            var ComKeyItemCtrl = /** @class */ (function () {
                function ComKeyItemCtrl() {
                    this._comKey = new comkey.ComKeyItem();
                    this._comKey.on(Event.BLUR, this, this.onBlur);
                }
                ComKeyItemCtrl.prototype.clear = function () {
                };
                ComKeyItemCtrl.prototype.onBlur = function () {
                };
                return ComKeyItemCtrl;
            }());
            comkey.ComKeyItemCtrl = ComKeyItemCtrl;
        })(comkey = ui.comkey || (ui.comkey = {}));
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=ComKeyItemCtrl.js.map