var sear;
(function (sear) {
    var frame;
    (function (frame) {
        var TO_ID = 0;
        /**
         *
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
                // ===============================================
                this.isDispose = false;
                this._id = ++TO_ID;
            }
            Timer.prototype.Init = function (handler, delay, repeat, isFull, isIgnore) {
                this._delay = delay;
                this._repeat = repeat;
                this._handler = handler;
                this._isFull = isFull;
                this._isIgnore = isIgnore;
            };
            Timer.prototype.Clean = function () {
                this._delay = 0;
                this._repeat = 0;
                this._isFull = false;
                this._isIgnore = false;
                this._running = false;
                this._count = 0;
                this._interval = 0;
                this._isInner = true;
                if (this._handler != null) {
                    this._handler.Recover();
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
            Object.defineProperty(Timer.prototype, "running", {
                get: function () {
                    return this._running;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Timer.prototype, "isInner", {
                get: function () {
                    return this._isInner;
                },
                enumerable: true,
                configurable: true
            });
            Timer.prototype.Dispose = function () {
                this.Clean();
                this.isDispose = true;
            };
            /** 回收进对象池*/
            Timer.prototype.Recover = function () {
                PoolPush(this);
            };
            // ===============================================
            /** 执行回调函数，每帧调用（注意：慎手动调用）*/
            Timer.prototype.CheckCallback = function (interval) {
                if (this.isLoop) {
                    if (this.isLoopFrame) {
                        // 帧循环
                        if (this._isIgnore && Date.now() - runTime > 40) {
                            return;
                        }
                        this.DoCallback();
                    }
                    else {
                        // 定时循环
                        this._interval += interval;
                        if (this._isFull) {
                            // 补帧
                            while (this._interval >= this._delay) {
                                this._interval -= this._delay;
                                this.DoCallback();
                            }
                        }
                        else {
                            if (this._interval >= this._delay) {
                                this._interval = 0;
                                this.DoCallback();
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
                        this.DoCallback();
                        if (this._count >= this._repeat) {
                            this.Stop(true);
                        }
                    }
                }
            };
            Timer.prototype.DoCallback = function () {
                if (!this._handler) {
                    return;
                }
                try {
                    this._handler.Run();
                }
                catch (error) {
                    Sear.Error(error);
                }
            };
            Timer.prototype.Start = function () {
                if (this._running)
                    return;
                this._running = true;
                AddTimer(this);
            };
            /**
             * 停止计时器
             * @param isInner true：停止后不可再次使用，会自动回收；false：停止后不回收脱管，可再次开启或关闭
             */
            Timer.prototype.Stop = function (isInner) {
                if (isInner === void 0) { isInner = true; }
                if (!this._running)
                    return;
                this._running = false;
                this._isInner = isInner;
                DelTimer(this);
            };
            return Timer;
        }());
        frame.Timer = Timer;
        // =========================================================================
        var inFrame = false;
        var runTime = 0;
        var runTimeLast = 0;
        var runUseTime = 0;
        var FPS = 0;
        var FPSCount = 0;
        var FPSTime = 0;
        function Startup() {
            Laya.timer.frameLoop(1, null, OnFrame);
        }
        frame.Startup = Startup;
        function OnFrame() {
            inFrame = true;
            runTime = Date.now();
            runUseTime = runTime - runTimeLast;
            runTimeLast = runTime;
            // 计算帧率
            FPSCount += 1;
            if (runTime - FPSTime >= 1000) {
                FPS = FPSCount;
                FPSCount = 0;
                FPSTime = runTime;
            }
            // ---------------------------------------------
            var list = timerMap.values;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var cell = list_1[_i];
                cell.CheckCallback(runUseTime);
            }
            inFrame = false;
            // ---------------------------------------------
            if (delayTimerMap.length > 0) {
                for (var _a = 0, _b = delayTimerMap.values; _a < _b.length; _a++) {
                    var cell = _b[_a];
                    if (cell instanceof Timer) {
                        AddTimerReal(cell);
                    }
                    else {
                        DelTimerReal(cell);
                    }
                }
                delayTimerMap.Clear();
            }
        }
        // ================================================================================
        // 延迟调用帧事件
        var timerMap = new sear.struct.HashList();
        var delayTimerMap = new sear.struct.HashList();
        function AddTimerReal(timer) {
            if (timer.isLoopFrame) {
                // 帧循环检重
                for (var _i = 0, _a = timerMap.values; _i < _a.length; _i++) {
                    var cell = _a[_i];
                    if (!cell.isLoopFrame) {
                        continue;
                    }
                    if (cell.handler.EqualsHandler(timer.handler)) {
                        timer.Recover();
                        return;
                    }
                }
            }
            timerMap.Add(timer.id, timer);
        }
        function DelTimerReal(id) {
            var timer = timerMap.Del(id);
            if (!timer && timer.isInner) {
                timer.Recover();
            }
        }
        function AddTimer(timer) {
            if (this.inFrame) {
                delayTimerMap.Add(timer.id, timer);
            }
            else {
                AddTimerReal(timer);
            }
        }
        function DelTimer(timer) {
            if (this.inFrame) {
                delayTimerMap.Add(timer.id, timer.id);
            }
            else {
                DelTimerReal(timer.id);
            }
        }
        // ================================================================================
        var pool = null;
        function GetPool() {
            return pool || (pool = new sear.pool.Pool(Timer, 50));
        }
        function PoolPop() {
            return GetPool().Pop();
        }
        function PoolPush(timer) {
            GetPool().Push(timer);
        }
        /**
         * 延迟执行
         * @param delay 延迟时间（毫秒）
         * @param caller 执行域。
         * @param method 处理函数。
         * @param args 函数参数。
         * @param repeat 执行次数
         */
        function SetDelay(delay, caller, method, args, repeat) {
            if (args === void 0) { args = null; }
            if (repeat === void 0) { repeat = 1; }
            if (!method) {
                return null;
            }
            var timer = PoolPop();
            timer.Init(Sear.Handler.Create(caller, method, args), delay, repeat, false, false);
            timer.Start();
            return timer;
        }
        frame.SetDelay = SetDelay;
        /**
         * 指定延迟时间循环执行
         * @param delay 延迟时间（毫秒）
         * @param caller 执行域。
         * @param method 处理函数。
         * @param args 函数参数。
         * @param isFull 是否补帧
         */
        function SetDelayLoop(delay, caller, method, args, isFull) {
            if (args === void 0) { args = null; }
            if (isFull === void 0) { isFull = false; }
            if (!method) {
                return null;
            }
            var timer = PoolPop();
            timer.Init(Sear.Handler.Create(caller, method, args), delay, 0, isFull, false);
            timer.Start();
            return timer;
        }
        frame.SetDelayLoop = SetDelayLoop;
        /**
         * 帧循环执行
         * @param caller 执行域。
         * @param method 处理函数。
         * @param args 函数参数。
         * @param isIgnore 是否在帧频低时忽略执行
         */
        function SetFrameLoop(caller, method, args, isIgnore) {
            if (args === void 0) { args = null; }
            if (isIgnore === void 0) { isIgnore = false; }
            if (!method) {
                return null;
            }
            var timer = PoolPop();
            timer.Init(Sear.Handler.Create(caller, method, args), 0, 0, false, isIgnore);
            timer.Start();
            return timer;
        }
        frame.SetFrameLoop = SetFrameLoop;
    })(frame = sear.frame || (sear.frame = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Timer.js.map