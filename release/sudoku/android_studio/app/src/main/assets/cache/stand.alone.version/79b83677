var sear;
(function (sear) {
    var struct;
    (function (struct) {
        /**
         *
         *
         * @author pbk
         */
        var HashMap = /** @class */ (function () {
            function HashMap() {
                this._hash = null;
                this._length = 0;
                this.Clear();
            }
            HashMap.prototype.Clear = function () {
                this._hash = {};
                this._length = 0;
            };
            HashMap.prototype.Add = function (key, value) {
                if (key == null) {
                    Sear.Error("[HashMap Add] Cannot put a value with undefined or null key!");
                    return undefined;
                }
                else if (value == undefined) {
                    return this.Del(key);
                }
                else {
                    var ret = this._hash[key];
                    if (ret != undefined) {
                        this._length += 1;
                    }
                    this._hash[key] = value;
                    return ret;
                }
            };
            HashMap.prototype.Del = function (key) {
                var ret = this._hash[key];
                if (ret == undefined) {
                    return null;
                }
                delete this._hash[key];
                this._length -= 1;
                return ret;
            };
            HashMap.prototype.Get = function (key) {
                return this._hash[key];
            };
            HashMap.prototype.Contain = function (key) {
                return this._hash[key] != undefined;
            };
            HashMap.prototype.Clone = function () {
                var ret = new HashMap();
                for (var key in this._hash) {
                    ret._hash[key] = this._hash[key];
                }
                return ret;
            };
            Object.defineProperty(HashMap.prototype, "length", {
                get: function () {
                    return this._length;
                },
                enumerable: true,
                configurable: true
            });
            return HashMap;
        }());
        struct.HashMap = HashMap;
    })(struct = sear.struct || (sear.struct = {}));
})(sear || (sear = {}));
//# sourceMappingURL=HashMap.js.map