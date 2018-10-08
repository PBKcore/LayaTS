var sear;
(function (sear) {
    var struct;
    (function (struct) {
        /**
         * 函数回调处理器
         * 对象池管理
         *
         * @author pbk
         */
        var Handler = /** @class */ (function () {
            function Handler() {
                this._destroyed = false;
            }
            /**
             * 从对象池内创建一个Handler（推荐使用）
             * @param caller 执行域。
             * @param method 处理函数。
             * @param args 函数参数。
             * @param once 是否只执行一次
             */
            Handler.create = function (caller, method, args, once) {
                if (args === void 0) { args = null; }
                if (once === void 0) { once = false; }
                var handler = sear.pool.getHandler();
                handler.caller = caller;
                handler.method = method;
                handler.args = args;
                handler.once = once;
                return handler;
            };
            Handler.toID = function (caller, method) {
                return sear.getGID(caller) + "_" + sear.getMID(method);
            };
            /** 执行处理器*/
            Handler.prototype.run = function () {
                if (this.method == null) {
                    return null;
                }
                var result = this.method.apply(this.caller, this.args);
                if (this.once) {
                    this.recover();
                }
                return result;
            };
            /**
             * 执行处理器，携带额外数据
             * @param data 附加的回调数据，可以是单数据或者Array(作为多参)
             */
            Handler.prototype.runWith = function (data) {
                if (this.method == null) {
                    return null;
                }
                var result;
                if (data == null) {
                    result = this.method.apply(this.caller, this.args);
                }
                else {
                    if (!this.args) {
                        if (typeof data === "array") {
                            result = this.method.apply(this.caller, data);
                        }
                        else {
                            result = this.method.call(this.caller, data);
                        }
                    }
                    else {
                        if (typeof data === "array") {
                            result = this.method.apply(this.caller, this.args.concat(data));
                        }
                        else {
                            this.args = this.args.concat();
                            this.args.push(data);
                            result = this.method.apply(this.caller, this.args);
                        }
                    }
                }
                if (this.once) {
                    this.recover();
                }
                return result;
            };
            /** 添加参数*/
            Handler.prototype.addArg = function (arg) {
                this.args || (this.args = []);
                this.args.push(arg);
            };
            Handler.prototype.equalsHandler = function (handler) {
                if (!handler) {
                    return false;
                }
                return this.equals(handler.caller, handler.method);
            };
            /** 检测执行域和执行函数是否相同*/
            Handler.prototype.equals = function (caller, method) {
                return sear.getGID(this.caller) == sear.getGID(caller) && sear.getMID(this.method) == sear.getMID(method);
            };
            Object.defineProperty(Handler.prototype, "id", {
                get: function () {
                    return Handler.toID(this.caller, this.method);
                },
                enumerable: true,
                configurable: true
            });
            Handler.prototype.clear = function () {
                this.caller = null;
                this.method = null;
                this.args = null;
                this.once = false;
            };
            Handler.prototype.destroy = function () {
                this.clear();
                this._destroyed = true;
            };
            Object.defineProperty(Handler.prototype, "destroyed", {
                get: function () {
                    return this._destroyed;
                },
                enumerable: true,
                configurable: true
            });
            /** 回收进对象池*/
            Handler.prototype.recover = function () {
                sear.pool.recHandler(this);
            };
            return Handler;
        }());
        struct.Handler = Handler;
    })(struct = sear.struct || (sear.struct = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Handler.js.map