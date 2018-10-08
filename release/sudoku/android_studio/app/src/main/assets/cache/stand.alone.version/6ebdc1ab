var sear;
(function (sear) {
    var event;
    (function (event) {
        /**
         * 事件派发器
         *
         * @author pbk
         */
        var EventDispatcher = /** @class */ (function () {
            function EventDispatcher() {
                // ========================================================================================
                // 派发事件进行时，对中途增添事件做延后处理
                this._isDispatching = false;
                this._waitList = [];
            }
            /**
             * 添加侦听事件，重复回调不会重复添加
             * @param type 事件类型
             * @param caller 执行域。
             * @param method 处理函数。
             * @param args 函数参数。
             * @param once 是否只执行一次
             */
            EventDispatcher.prototype.AddEvent = function (type, caller, method, args, once) {
                if (args === void 0) { args = null; }
                if (once === void 0) { once = false; }
                if (this._isDispatching) {
                    this._waitList.push({ operate: 1, type: type, caller: caller, method: method, args: args, once: once });
                    return;
                }
                this._listeners || (this._listeners = {});
                var handler = Sear.Handler.Create(caller, method, args, once);
                if (!this._listeners[type]) {
                    this._listeners[type] = handler;
                }
                else {
                    if (this._listeners[type].Run) {
                        if (this._listeners[type].Equals(caller, method)) {
                            return; // 重复 
                        }
                        this._listeners[type] = [this._listeners[type], handler];
                    }
                    else {
                        if (this.HasHandelr(this._listeners[type], caller, method)) {
                            return; // 重复 
                        }
                        this._listeners[type].push(handler);
                    }
                }
            };
            /**
             * 移除侦听函数
             * @param type
             * @param caller
             * @param method
             */
            EventDispatcher.prototype.DelEvent = function (type, caller, method) {
                if (this._isDispatching) {
                    this._waitList.push({ operate: 2, type: type, caller: caller, method: method });
                    return;
                }
                if (!this.HasEvents(type)) {
                    return;
                }
                var listener = this._listeners[type];
                if (listener.Run) {
                    if (listener.Equals(caller, method)) {
                        delete this._listeners[type];
                        listener.Recover();
                    }
                }
                else {
                    var len = listener.length;
                    for (var i = 0; i < len; ++i) {
                        if (listener[i].Equals(caller, method)) {
                            listener[i].Recover();
                            if (len == 1) {
                                delete this._listeners[type];
                            }
                            else {
                                listener.splice(i, 1);
                            }
                            return;
                        }
                    }
                }
            };
            /**
             * 移除 所有侦听事件 或 指定类型的所有侦听事件
             * @param type 值为null默认为移除所有侦听事件
             */
            EventDispatcher.prototype.DelEvents = function (type) {
                if (type === void 0) { type = null; }
                if (this._isDispatching) {
                    this._waitList.push({ operate: 3, type: type });
                    return;
                }
                if (!this._listeners) {
                    return;
                }
                if (type != null) {
                    if (!this._listeners[type]) {
                        return;
                    }
                    this.DelEventType(type);
                }
                else {
                    for (var key in this._listeners) {
                        this.DelEventType(key);
                    }
                    this._listeners = null;
                }
            };
            EventDispatcher.prototype.DelEventType = function (type) {
                if (this._listeners[type].Run) {
                    this._listeners[type].Recover();
                }
                else {
                    var list = this._listeners[type];
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var cell = list_1[_i];
                        cell.Recover();
                    }
                }
                delete this._listeners[type];
            };
            /**
             * 检测是否有指定类型的侦听事件
             * @param type
             */
            EventDispatcher.prototype.HasEvents = function (type) {
                return this._listeners && this._listeners[type];
            };
            EventDispatcher.prototype.HasEvent = function (type, caller, method) {
                if (!this.HasEvents(type)) {
                    return false;
                }
                var listener = this._listeners[type];
                if (listener.Run) {
                    return listener.Equals(caller, method);
                }
                else {
                    return this.HasHandelr(listener, caller, method);
                }
            };
            // 列表中是否有相同的回调对象
            EventDispatcher.prototype.HasHandelr = function (list, caller, method) {
                for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                    var cell = list_2[_i];
                    if (cell.Equals(caller, method)) {
                        return true;
                    }
                }
                return false;
            };
            /**
             * 派发事件
             * @param type 事件类型
             * @param data
             */
            EventDispatcher.prototype.Dispatch = function (type, data) {
                if (data === void 0) { data = null; }
                if (!this.HasEvents(type)) {
                    return;
                }
                this._isDispatching = true;
                try {
                    var listener = this._listeners[type];
                    if (listener.Run) {
                        if (listener.once) {
                            delete this._listeners[type];
                        }
                        listener.RunWith(data);
                    }
                    else {
                        var len = listener.length;
                        var dlist = void 0;
                        for (var i = 0; i < len; ++i) {
                            if (listener[i].once) {
                                dlist || (dlist = []);
                                dlist.push(i);
                            }
                            listener[i].RunWith(data);
                        }
                        if (dlist) {
                            if (dlist.length == len) {
                                delete this._listeners[type];
                            }
                            else {
                                len = dlist.length;
                                for (var i = len - 1; i >= 0; --i) {
                                    dlist.splice(dlist[i], 1);
                                }
                            }
                        }
                    }
                }
                catch (error) {
                    Sear.Error(error);
                }
                finally {
                    if (this._waitList.length > 0) {
                        for (var _i = 0, _a = this._waitList; _i < _a.length; _i++) {
                            var cell = _a[_i];
                            if (cell.operate == 1) {
                                this.AddEvent(cell.type, cell.caller, cell.method, cell.args, cell.once);
                            }
                            else if (cell.operate == 2) {
                                this.DelEvent(cell.type, cell.caller, cell.method);
                            }
                            else if (cell.operate == 3) {
                                this.DelEvents(cell.type);
                            }
                        }
                        this._waitList.length = 0;
                    }
                    this._isDispatching = false;
                }
            };
            return EventDispatcher;
        }());
        event.EventDispatcher = EventDispatcher;
        var ins = new EventDispatcher();
        /**
             * 添加侦听事件，重复回调不会重复添加
             * @param type 事件类型
             * @param caller 执行域。
             * @param method 处理函数。
             * @param args 函数参数。
             * @param once 是否只执行一次
             */
        function EventOn(type, caller, method, args, once) {
            if (args === void 0) { args = null; }
            if (once === void 0) { once = false; }
            ins.AddEvent(type, caller, method, args, once);
        }
        event.EventOn = EventOn;
        /**
         * 删除侦听事件
         * @param type
         * @param caller
         * @param method
         */
        function EventOff(type, caller, method) {
            ins.DelEvent(type, caller, method);
        }
        event.EventOff = EventOff;
        /**
         * 派发事件
         * @param type 事件类型
         * @param data 携带数据
         */
        function EventSend(type, data) {
            if (data === void 0) { data = null; }
            ins.Dispatch(type, data);
        }
        event.EventSend = EventSend;
    })(event = sear.event || (sear.event = {}));
})(sear || (sear = {}));
//# sourceMappingURL=EventDispatcher.js.map