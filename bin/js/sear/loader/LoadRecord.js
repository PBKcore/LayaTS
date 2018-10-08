var sear;
(function (sear) {
    var loader;
    (function (loader) {
        var Handler = sear.struct.Handler;
        var TO_ID = 1;
        /**
         * 加载记录
         * 对象池管理
         *
         * @author pbk
         */
        var LoadRecord = /** @class */ (function () {
            function LoadRecord() {
                this._destroyed = false;
                this._id = TO_ID++;
            }
            LoadRecord.prototype.addComplete = function (handler) {
                if (!this._complete) {
                    this._complete = handler;
                }
                else if (this._complete instanceof Handler) {
                    this._complete = [this._complete, handler];
                }
                else {
                    this._complete.push(handler);
                }
            };
            LoadRecord.prototype.equalsUrl = function (url) {
                if (typeof url === "string") {
                    if (typeof this.url === "string") {
                        return url == this.url;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if (typeof this.url === "string") {
                        return false;
                    }
                    else {
                        if (url.length != this.url.length) {
                            return false;
                        }
                        for (var _i = 0, _a = this.url; _i < _a.length; _i++) {
                            var cell = _a[_i];
                            if (url.indexOf(cell) == -1) {
                                return false;
                            }
                        }
                        return true;
                    }
                }
            };
            LoadRecord.prototype.runWith = function (data) {
                if (!this._complete) {
                    return;
                }
                if (this._complete instanceof Handler) {
                    this._complete.runWith(data);
                }
                else {
                    for (var _i = 0, _a = this._complete; _i < _a.length; _i++) {
                        var handler = _a[_i];
                        handler.runWith(data);
                    }
                }
            };
            LoadRecord.prototype.clear = function () {
                this.url = null;
                this._complete = null;
            };
            LoadRecord.prototype.destroy = function () {
                this.clear();
                this._destroyed = true;
            };
            Object.defineProperty(LoadRecord.prototype, "destroyed", {
                get: function () {
                    return this._destroyed;
                },
                enumerable: true,
                configurable: true
            });
            /** 回收进对象池*/
            LoadRecord.prototype.recover = function () {
                sear.pool.recLoadRecord(this);
            };
            Object.defineProperty(LoadRecord.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            return LoadRecord;
        }());
        loader.LoadRecord = LoadRecord;
    })(loader = sear.loader || (sear.loader = {}));
})(sear || (sear = {}));
//# sourceMappingURL=LoadRecord.js.map