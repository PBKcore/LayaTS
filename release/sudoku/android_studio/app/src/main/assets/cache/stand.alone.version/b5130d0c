var sear;
(function (sear) {
    var struct;
    (function (struct) {
        /**
         * 字典，键值不限制类型
         *
         * @author pbk
         */
        var Dictionary = /** @class */ (function () {
            function Dictionary() {
                this._keys = [];
                this._values = [];
            }
            Dictionary.prototype.Clear = function () {
                this._keys.length = 0;
                this._values.length = 0;
            };
            Dictionary.prototype.Add = function (key, value) {
                var index = this.IndexOf(key);
                if (index >= 0) {
                    var ret = this._values[index];
                    this._values[index] = value;
                    return ret;
                }
                this._keys.push(key);
                this._values.push(value);
                return null;
            };
            Dictionary.prototype.Del = function (key) {
                var index = this.IndexOf(key);
                if (index >= 0) {
                    var ret = this._values[index];
                    this._keys.splice(index, 1);
                    this._values.splice(index, 1);
                    return ret;
                }
                return null;
            };
            Dictionary.prototype.Get = function (key) {
                var index = this.IndexOf(key);
                return index < 0 ? null : this._values[index];
            };
            Dictionary.prototype.Contain = function (key) {
                return this.IndexOf(key) >= 0;
            };
            /** 获取指定对象的键名索引*/
            Dictionary.prototype.IndexOf = function (key) {
                var index = this._keys.indexOf(key);
                if (index >= 0) {
                    return index;
                }
                if (typeof key == "string") {
                    key = Number(key);
                }
                else if (typeof key == "number") {
                    key = key.toString();
                }
                else {
                    return index;
                }
                return this._keys.indexOf(key);
            };
            Dictionary.prototype.Clone = function () {
                var ret = new Dictionary();
                ret._keys = this._keys.concat();
                ret._values = this._values.concat();
                return ret;
            };
            Object.defineProperty(Dictionary.prototype, "keys", {
                get: function () {
                    return this._keys;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Dictionary.prototype, "values", {
                get: function () {
                    return this._values;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Dictionary.prototype, "length", {
                get: function () {
                    return this._keys.length;
                },
                enumerable: true,
                configurable: true
            });
            return Dictionary;
        }());
        struct.Dictionary = Dictionary;
    })(struct = sear.struct || (sear.struct = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Dictionary.js.map