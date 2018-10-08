var sear;
(function (sear) {
    var struct;
    (function (struct) {
        /**
         *
         *
         * @author pbk
         */
        var HashList = /** @class */ (function () {
            function HashList() {
                this._hash = null;
                this._values = null;
                this.clear();
            }
            HashList.prototype.clear = function () {
                this._hash = {};
                this._values = [];
            };
            HashList.prototype.add = function (key, value) {
                if (key == null) {
                    sear.error("[HashList Add] Cannot put a value with undefined or null key!");
                    return undefined;
                }
                else if (value == undefined) {
                    return this.del(key);
                }
                else {
                    var ret = this._hash[key];
                    if (ret != undefined) {
                        this._values[this._values.indexOf(ret)] = value;
                    }
                    else {
                        this._values.push(value);
                    }
                    this._hash[key] = value;
                    return ret;
                }
            };
            HashList.prototype.del = function (key) {
                var ret = this._hash[key];
                if (ret != undefined) {
                    delete this._hash[key];
                    this._values.splice(this._values.indexOf(ret), 1);
                }
                return ret;
            };
            HashList.prototype.get = function (key) {
                return this._hash[key];
            };
            HashList.prototype.contains = function (key) {
                return this._hash[key] != undefined;
            };
            HashList.prototype.clone = function () {
                var ret = new HashList();
                for (var key in this._hash) {
                    ret._hash[key] = this._hash[key];
                }
                ret._values = this._values.concat();
                return ret;
            };
            Object.defineProperty(HashList.prototype, "values", {
                get: function () {
                    return this._values;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HashList.prototype, "length", {
                get: function () {
                    return this._values.length;
                },
                enumerable: true,
                configurable: true
            });
            return HashList;
        }());
        struct.HashList = HashList;
    })(struct = sear.struct || (sear.struct = {}));
})(sear || (sear = {}));
//# sourceMappingURL=HashList.js.map