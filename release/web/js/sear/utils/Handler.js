var sear;
(function (sear) {
    var utils;
    (function (utils) {
        var pool = null;
        function GetPool() {
            return pool || (pool = new sear.pool.Pool(Handler, 50));
        }
        function PoolPop() {
            return GetPool().Pop();
        }
        function PoolPush(handler) {
            GetPool().Push(handler);
        }
        /**
         * 函数回调处理器
         *
         * @author pbk
         */
        var Handler = /** @class */ (function () {
            function Handler() {
                this.isDispose = false;
            }
            /**
             * 从对象池内创建一个Handler（推荐使用）
             * @param caller 执行域。
             * @param method 处理函数。
             * @param args 函数参数。
             * @param once 是否只执行一次
             */
            Handler.Create = function (caller, method, args, once) {
                if (args === void 0) { args = null; }
                if (once === void 0) { once = false; }
                var handler = PoolPop();
                handler.caller = caller;
                handler.method = method;
                handler.args = args;
                handler.once = once;
                return handler;
            };
            /** 执行处理器*/
            Handler.prototype.Run = function () {
                if (this.method == null) {
                    return null;
                }
                var result = this.method.apply(this.caller, this.args);
                if (this.once) {
                    this.Recover();
                }
                return result;
            };
            /**
             * 执行处理器，携带额外数据
             * @param data 附加的回调数据，可以是单数据或者Array(作为多参)
             */
            Handler.prototype.RunWith = function (data) {
                if (this.method == null) {
                    return null;
                }
                var result;
                if (data == null) {
                    result = this.method.apply(this.caller, this.args);
                }
                else if (!this.args && !data.unshift) {
                    result = this.method.call(this.caller, data);
                }
                else if (this.args) {
                    result = this.method.apply(this.caller, this.args.concat(data));
                }
                else {
                    result = this.method.apply(this.caller, data);
                }
                if (this.once) {
                    this.Recover();
                }
                return result;
            };
            Handler.prototype.EqualsHandler = function (handler) {
                if (!handler) {
                    return false;
                }
                return this.Equals(handler.caller, handler.method);
            };
            /** 检测执行域和执行函数是否相同*/
            Handler.prototype.Equals = function (caller, method) {
                return this.caller === caller && this.method === method;
            };
            Handler.prototype.Clean = function () {
                this.caller = null;
                this.method = null;
                this.args = null;
                this.once = false;
            };
            Handler.prototype.Dispose = function () {
                this.Clean();
                this.isDispose = true;
            };
            /** 回收进对象池*/
            Handler.prototype.Recover = function () {
                PoolPush(this);
            };
            return Handler;
        }());
        utils.Handler = Handler;
    })(utils = sear.utils || (sear.utils = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Handler.js.map