var sear;
(function (sear) {
    var frame;
    (function (frame) {
        var Handler = sear.struct.Handler;
        var HashList = sear.struct.HashList;
        /**
         * 延迟执行
         * @param delay 延迟时间（毫秒）
         * @param caller 执行域。
         * @param method 处理函数。
         * @param args 函数参数。
         * @param repeat 执行次数
         */
        function setDelay(delay, caller, method, args, repeat) {
            if (args === void 0) { args = null; }
            if (repeat === void 0) { repeat = 1; }
            if (!method) {
                return null;
            }
            var timer = sear.pool.getTimer();
            timer.init(Handler.create(caller, method, args), delay, repeat, false, false);
            timer.start();
            return timer;
        }
        frame.setDelay = setDelay;
        /**
         * 指定延迟时间循环执行
         * @param delay 延迟时间（毫秒）
         * @param caller 执行域。
         * @param method 处理函数。
         * @param args 函数参数。
         * @param isFull 是否补帧
         */
        function setDelayLoop(delay, caller, method, args, isFull) {
            if (args === void 0) { args = null; }
            if (isFull === void 0) { isFull = false; }
            if (!method) {
                return null;
            }
            var timer = sear.pool.getTimer();
            timer.init(Handler.create(caller, method, args), delay, 0, isFull, false);
            timer.start();
            return timer;
        }
        frame.setDelayLoop = setDelayLoop;
        /**
         * 帧循环执行
         * @param caller 执行域。
         * @param method 处理函数。
         * @param args 函数参数。
         * @param isIgnore 是否在帧频低时忽略执行
         */
        function setFrameLoop(caller, method, args, isIgnore) {
            if (args === void 0) { args = null; }
            if (isIgnore === void 0) { isIgnore = false; }
            if (!method) {
                return null;
            }
            if (frame.isRepeat(caller, method, true)) {
                return;
            }
            var timer = sear.pool.getTimer();
            timer.init(Handler.create(caller, method, args), 0, 0, false, isIgnore);
            timer.start();
            return timer;
        }
        frame.setFrameLoop = setFrameLoop;
        /**
         * 延迟计算，避免大量赋值后高频复杂运算
         * @param caller
         * @param method
         * @param args
         */
        function callLater(caller, method, args) {
            if (args === void 0) { args = null; }
            if (!method) {
                return;
            }
            if (frame.isRepeat(caller, method, false)) {
                return;
            }
            var timer = sear.pool.getTimer();
            timer.init(Handler.create(caller, method, args), 0, 1, false, false);
            timer.start();
        }
        frame.callLater = callLater;
        // ================================================================================
        var inFrame = false;
        frame.runTime = 0;
        var runTimeLast = 0;
        var runUseTime = 0;
        var FPS = 0;
        var FPSCount = 0;
        var FPSTime = 0;
        function startup() {
            Laya.timer.frameLoop(1, null, onFrame);
        }
        frame.startup = startup;
        function onFrame() {
            inFrame = true;
            frame.runTime = Date.now();
            runUseTime = frame.runTime - runTimeLast;
            runTimeLast = frame.runTime;
            // 计算帧率
            FPSCount += 1;
            if (frame.runTime - FPSTime >= 1000) {
                FPS = FPSCount;
                FPSCount = 0;
                FPSTime = frame.runTime;
            }
            // ---------------------------------------------
            var list = timerMap.values;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var cell = list_1[_i];
                cell.checkCallback(runUseTime);
            }
            inFrame = false;
            // ---------------------------------------------
            if (delayTimerMap.length > 0) {
                for (var _a = 0, _b = delayTimerMap.values; _a < _b.length; _a++) {
                    var cell = _b[_a];
                    if (cell instanceof frame.Timer) {
                        addTimerReal(cell);
                    }
                    else {
                        delTimerReal(cell);
                    }
                }
                delayTimerMap.clear();
            }
        }
        // ================================================================================
        // 延迟调用帧事件
        var timerMap = new HashList();
        var delayTimerMap = new HashList();
        function addTimerReal(timer) {
            timerMap.add(timer.id, timer);
        }
        function delTimerReal(id) {
            var timer = timerMap.del(id);
            if (timer && timer.isInner) {
                timer.recover();
            }
        }
        function addTimer(timer) {
            if (inFrame) {
                delayTimerMap.add(timer.id, timer);
            }
            else {
                addTimerReal(timer);
            }
        }
        frame.addTimer = addTimer;
        function delTimer(timer) {
            if (inFrame) {
                delayTimerMap.add(timer.id, timer.id);
            }
            else {
                delTimerReal(timer.id);
            }
        }
        frame.delTimer = delTimer;
    })(frame = sear.frame || (sear.frame = {}));
})(sear || (sear = {}));
(function (sear) {
    sear.setDelay = sear.frame.setDelay;
    sear.setDelayLoop = sear.frame.setDelayLoop;
    sear.setFrameLoop = sear.frame.setFrameLoop;
    sear.callLater = sear.frame.callLater;
})(sear || (sear = {}));
//# sourceMappingURL=Frame.js.map