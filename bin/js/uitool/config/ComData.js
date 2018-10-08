var uitool;
(function (uitool) {
    var config;
    (function (config) {
        /**
         * 组件的配置数据
         *
         * @author pbk
         */
        var ComData = /** @class */ (function () {
            function ComData(comClass) {
                this._keys = [];
                this._class = comClass;
                this._className = sear.getClassName(comClass);
                this.addKey("name", config.ComKey.string, "变量名");
                this.addKey("x", config.ComKey.number, "x坐标");
                this.addKey("y", config.ComKey.number, "y坐标");
                this.addKey("width", config.ComKey.number, "宽度");
                this.addKey("height", config.ComKey.number, "高度");
                this.addKey("tag", config.ComKey.string, "携带数据");
                this.addKey("toolTip", config.ComKey.string, "鼠标tips");
            }
            ComData.prototype.addKey = function (key, type, alias) {
                this._keys.push(new config.ComKey(key, type, alias));
            };
            Object.defineProperty(ComData.prototype, "name", {
                get: function () {
                    return this._className;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComData.prototype, "uiClass", {
                get: function () {
                    return this._class;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComData.prototype, "keys", {
                get: function () {
                    return this._keys;
                },
                enumerable: true,
                configurable: true
            });
            return ComData;
        }());
        config.ComData = ComData;
    })(config = uitool.config || (uitool.config = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=ComData.js.map