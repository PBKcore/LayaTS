var sear;
(function (sear) {
    var frame;
    (function (frame) {
        var Handler = sear.struct.Handler;
        var TO_ID = 0;
        /**
         * 帧事件对象
         * 对象池管理
         *
         * @author pbk
         */
        var Timer = /** @class */ (function () {
            function Timer() {
                this._id = 0;
                this._running = false;
                this._count = 0;
                this._interval = 0;
                this._isInner = true;
                this._destroyed = false;
                this._id = ++TO_ID;
            }
            Timer.prototype.init = function (handler, delay, repeat, isFull, isIgnore) {
                if (this._handler) {
                    return; // 不能重复赋值
                }
                this._delay = delay;
                this._repeat = repeat;
                this._handler = handler;
                this._isFull = isFull;
                this._isIgnore = isIgnore;
            };
            Timer.prototype.clear = function () {
                this._delay = 0;
                this._repeat = 0;
                this._isFull = false;
                this._isIgnore = false;
                this._running = false;
                this._count = 0;
                this._interval = 0;
                this._isInner = true;
                if (this._handler != null) {
                    this._handler.recover();
                    this._handler = null;
                }
            };
            Object.defineProperty(Timer.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timer.prototype, "handler", {
                get: function () {
                    return this._handler;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timer.prototype, "isLoop", {
                /** 是否循环*/
                get: function () {
                    return this._repeat == 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timer.prototype, "isLoopFrame", {
                /** 是否帧循环*/
                get: function () {
                    return this._delay == 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timer.prototype, "isLater", {
                /** 是否延迟下一帧执行*/
                get: function () {
                    return this._delay == 1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timer.prototype, "running", {
                get: function () {
                    return this._running;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timer.prototype, "isInner", {
                /** 内部管理，会自动回收使用*/
                get: function () {
                    return this._isInner;
                },
                enumerable: true,
                configurable: true
            });
            // ===============================================
            Timer.prototype.destroy = function () {
                this.clear();
                this._destroyed = true;
            };
            /** 回收进对象池*/
            Timer.prototype.recover = function () {
                sear.pool.recTimer(this);
            };
            Object.defineProperty(Timer.prototype, "destroyed", {
                get: function () {
                    return this._destroyed;
                },
                enumerable: true,
                configurable: true
            });
            // ===============================================
            /** 执行回调函数，每帧调用（注意：慎手动调用）*/
            Timer.prototype.checkCallback = function (interval) {
                if (this.isLoop) {
                    if (this.isLoopFrame) {
                        // 帧循环
                        if (this._isIgnore && Date.now() - frame.runTime > 40) {
                            return;
                        }
                        this.doCallback();
                    }
                    else {
                        // 定时循环
                        this._interval += interval;
                        if (this._isFull) {
                            // 补帧
                            while (this._interval >= this._delay) {
                                this._interval -= this._delay;
                                this.doCallback();
                            }
                        }
                        else {
                            if (this._interval >= this._delay) {
                                this._interval = 0;
                                this.doCallback();
                            }
                        }
                    }
                }
                else {
                    // 延迟执行
                    this._interval += interval;
                    if (this._interval >= this._delay) {
                        this._count += 1;
                        this._interval = 0;
                        this.doCallback();
                        if (this._count >= this._repeat) {
                            this.stop(true);
                        }
                    }
                }
            };
            Timer.prototype.doCallback = function () {
                if (!this._handler) {
                    return;
                }
                this._handler.run(); // try catch 会大幅度降低效率，故这里先不做检测
            };
            Timer.prototype.start = function () {
                if (this._running) {
                    return;
                }
                if (this.checkRepeat()) {
                    return;
                }
                this._running = true;
                frame.addTimer(this);
            };
            /**
             * 停止计时器
             * @param isInner true：停止后不可再次使用，会自动回收；false：停止后不回收脱管，可再次开启或关闭
             */
            Timer.prototype.stop = function (isInner) {
                if (isInner === void 0) { isInner = true; }
                if (!this._running) {
                    return;
                }
                this._running = false;
                this._isInner = isInner;
                this.cRepeat();
                frame.delTimer(this);
            };
            Object.defineProperty(Timer.prototype, "delay", {
                set: function (value) {
                    if (this.isLoopFrame) {
                        return;
                    }
                    this._delay = value;
                },
                enumerable: true,
                configurable: true
            });
            // ---------------------------------------------------------------------
            Timer.prototype.checkRepeat = function () {
                if (!this._handler) {
                    return false;
                }
                var type;
                if (this.isLoopFrame) {
                    type = 2;
                }
                else if (this.isLater) {
                    type = 1;
                }
                else {
                    return false;
                }
                var hID = this._handler.id;
                var state = repeatMap[hID];
                if (state) {
                    if (type <= state) {
                        return true;
                    }
                    else {
                        repeatMap[hID] = type + state;
                        return false;
                    }
                }
                else {
                    repeatMap[hID] = type;
                    return false;
                }
            };
            Timer.prototype.cRepeat = function () {
                if (!this._handler) {
                    return;
                }
                var type;
                if (this.isLoopFrame) {
                    type = 2;
                }
                else if (this.isLater) {
                    type = 1;
                }
                else {
                    return;
                }
                var hID = this._handler.id;
                var state = repeatMap[hID];
                if (state > type) {
                    repeatMap[hID] = state - type;
                }
                else if (state == type) {
                    delete repeatMap[hID];
                }
                else {
                    sear.error("Timer Repeat logic error!");
                }
            };
            return Timer;
        }());
        frame.Timer = Timer;
        var repeatMap = {}; // 避免重复
        function isRepeat(caller, method, isFrame) {
            return repeatMap[Handler.toID(caller, method)] >= (isFrame ? 2 : 1);
        }
        frame.isRepeat = isRepeat;
    })(frame = sear.frame || (sear.frame = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Timer.js.map