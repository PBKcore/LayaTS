var uitool;
(function (uitool) {
    var config;
    (function (config) {
        /**
         * 组件的配置数据
         *
         * @author pbk
         */
        var ComConfig = /** @class */ (function () {
            function ComConfig(comClass) {
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
            ComConfig.prototype.addKey = function (key, type, alias) {
                this._keys.push(new config.ComKey(key, type, alias));
            };
            Object.defineProperty(ComConfig.prototype, "name", {
                get: function () {
                    return this._className;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComConfig.prototype, "uiClass", {
                get: function () {
                    return this._class;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComConfig.prototype, "keys", {
                get: function () {
                    return this._keys;
                },
                enumerable: true,
                configurable: true
            });
            return ComConfig;
        }());
        config.ComConfig = ComConfig;
    })(config = uitool.config || (uitool.config = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=ComConfig.js.map