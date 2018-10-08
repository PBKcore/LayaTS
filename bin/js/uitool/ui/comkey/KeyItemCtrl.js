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
            var KeyItemCtrl = /** @class */ (function () {
                function KeyItemCtrl(config, comCtrl) {
                    this._config = config;
                    this._comCtrl = comCtrl;
                    this._comKey = new comkey.KeyItem();
                    this._comKey.on(Event.BLUR, this, this.onBlur);
                }
                KeyItemCtrl.prototype.destroy = function () {
                };
                /**
                 * 设置数值的唯一接口
                 * @param value 数值
                 * @param isRecord 是否记录操作
                 * @param force 强制赋值
                 */
                KeyItemCtrl.prototype.setValue = function (value, isRecord, force) {
                    if (isRecord === void 0) { isRecord = true; }
                    if (force === void 0) { force = false; }
                    value = this.formatValue(value);
                    if (!force && this.keyValue == value) {
                        return;
                    }
                    if (isRecord) {
                        uitool.record.recordOrder(uitool.record.CHANGE, this._comCtrl, [this.key, this.keyValue, value]);
                    }
                    this.keyValue = value;
                    if (this.key == "name") {
                        this._comCtrl.treeItem.updateShow();
                    }
                    this.updateShow();
                };
                // 格式化数值
                KeyItemCtrl.prototype.formatValue = function (value) {
                };
                KeyItemCtrl.prototype.updateShow = function () {
                };
                Object.defineProperty(KeyItemCtrl.prototype, "key", {
                    get: function () {
                        return this._config.key;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(KeyItemCtrl.prototype, "keyValue", {
                    get: function () {
                        return this._comCtrl.uiIns[this.key];
                    },
                    set: function (value) {
                        this._comCtrl.uiIns[this.key] = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                KeyItemCtrl.prototype.onBlur = function () {
                };
                return KeyItemCtrl;
            }());
            comkey.KeyItemCtrl = KeyItemCtrl;
        })(comkey = ui.comkey || (ui.comkey = {}));
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=KeyItemCtrl.js.map