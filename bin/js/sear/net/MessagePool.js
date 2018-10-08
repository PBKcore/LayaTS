var sear;
(function (sear) {
    var net;
    (function (net) {
        var Handler = sear.struct.Handler;
        /**
         *
         *
         * @author pbk
         */
        var MessagePool = /** @class */ (function () {
            function MessagePool() {
                // 消息类型
                this._msgClass = {};
                // 消息是否高频触发
                this._msgHighs = {};
                // 消息实例
                this._messages = {};
                // 接收消息回调函数
                this._handlers = {};
            }
            /**
             * 注册消息
             * @param messageClass 消息类
             * @param id 消息ID
             * @param isHigh 是否高频触发（若是高频触发，会保存消息实例以便复用，注意外部不能缓存或者异步使用该消息对象）
             * @param caller 接收消息执行域
             * @param method 接收消息处理函数（注意：实际回调函数要外包一层函数，不能直接注册，以避免注册时初始化对应模块）
             */
            MessagePool.prototype.register = function (id, messageClass, isHigh, caller, method) {
                if (isHigh === void 0) { isHigh = false; }
                if (caller === void 0) { caller = null; }
                if (method === void 0) { method = null; }
                if (this._msgClass[id]) {
                    sear.log("【MessagePool Register】 id repeat:" + id
                        + " old:" + sear.getClassName(this._msgClass[id])
                        + " new:" + sear.getClassName(messageClass));
                    return;
                }
                this._msgClass[id] = messageClass;
                if (isHigh) {
                    this._msgHighs[id] = true;
                }
                if (method) {
                    this._handlers[id] = Handler.create(caller, method);
                }
            };
            MessagePool.prototype.GetMessage = function (id) {
                var message = this._messages[id];
                if (!message) {
                    if (!this._msgClass[id]) {
                        sear.log("【MessagePool GetMessage】Can't find message:" + id);
                        return null;
                    }
                    message = new this._msgClass[id]();
                    if (this._msgHighs[id]) {
                        this._messages[id] = message;
                        delete this._msgHighs[id];
                        delete this._msgClass[id];
                    }
                }
                return message;
            };
            MessagePool.prototype.GetHandler = function (id) {
                if (!this._handlers[id]) {
                    sear.log("【MessagePool GetHandler】Can't find handler:" + id);
                    return null;
                }
                return this._handlers[id];
            };
            return MessagePool;
        }());
        net.MessagePool = MessagePool;
    })(net = sear.net || (sear.net = {}));
})(sear || (sear = {}));
//# sourceMappingURL=MessagePool.js.map