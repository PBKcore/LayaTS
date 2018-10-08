var uitool;
(function (uitool) {
    var config;
    (function (config) {
        /**
         * 组件可控属性类型
         *
         * @author pbk
         */
        var ComKey = /** @class */ (function () {
            function ComKey(key, type, alias) {
                this._key = key;
                this._type = type;
                this._alias = alias;
            }
            Object.defineProperty(ComKey.prototype, "key", {
                /** 属性键值*/
                get: function () {
                    return this._key;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComKey.prototype, "type", {
                /** 值类型*/
                get: function () {
                    return this._type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ComKey.prototype, "alias", {
                /** 别名*/
                get: function () {
                    return this._alias;
                },
                enumerable: true,
                configurable: true
            });
            ComKey.number = 1;
            ComKey.string = 2;
            ComKey.boolean = 3;
            return ComKey;
        }());
        config.ComKey = ComKey;
    })(config = uitool.config || (uitool.config = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=ComKey.js.map