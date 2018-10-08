module sear.frame {
    import Handler = sear.struct.Handler;
    import HashList = sear.struct.HashList;

    /**
     * 延迟执行
     * @param delay 延迟时间（毫秒）
     * @param caller 执行域。
     * @param method 处理函数。
     * @param args 函数参数。
     * @param repeat 执行次数
     */
    export function setDelay(delay: number, caller: any, method: Function, args: Array<any> = null, repeat: number = 1): Timer {
        if (!method) {
            return null;
        }
        let timer: Timer = pool.getTimer();
        timer.init(Handler.create(caller, method, args), delay, repeat, false, false);
        timer.start();
        return timer;
    }

    /**
     * 指定延迟时间循环执行
     * @param delay 延迟时间（毫秒）
     * @param caller 执行域。
     * @param method 处理函数。
     * @param args 函数参数。
     * @param isFull 是否补帧
     */
    export function setDelayLoop(delay: number, caller: any, method: Function, args: Array<any> = null, isFull: boolean = false): Timer {
        if (!method) {
            return null;
        }
        let timer: Timer = pool.getTimer();
        timer.init(Handler.create(caller, method, args), delay, 0, isFull, false);
        timer.start();
        return timer;
    }

    /**
     * 帧循环执行
     * @param caller 执行域。
     * @param method 处理函数。
     * @param args 函数参数。
     * @param isIgnore 是否在帧频低时忽略执行
     */
    export function setFrameLoop(caller: any, method: Function, args: Array<any> = null, isIgnore: boolean = false): Timer {
        if (!method) {
            return null;
        }
        if (isRepeat(caller, method, true)) {
            return;
        }
        let timer: Timer = pool.getTimer();
        timer.init(Handler.create(caller, method, args), 0, 0, false, isIgnore);
        timer.start();
        return timer;
    }

    /**
     * 延迟计算，避免大量赋值后高频复杂运算
     * @param caller 
     * @param method 
     * @param args 
     */
    export function callLater(caller: any, method: Function, args: Array<any> = null): void {
        if (!method) {
            return;
        }
        if (isRepeat(caller, method, false)) {
            return;
        }
        let timer: Timer = pool.getTimer();
        timer.init(Handler.create(caller, method, args), 0, 1, false, false);
        timer.start();
    }

    // ================================================================================
    let inFrame: boolean = false;

    export let runTime: number = 0;
    let runTimeLast: number = 0;
    let runUseTime: number = 0;

    let FPS: number = 0;
    let FPSCount: number = 0;
    let FPSTime: number = 0;

    export function startup(): void {
        Laya.timer.frameLoop(1, null, onFrame);
    }

    function onFrame(): void {
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
        let list: Timer[] = timerMap.values;
        for (let cell of list) {
            cell.checkCallback(runUseTime);
        }

        inFrame = false;

        // ---------------------------------------------
        if (delayTimerMap.length > 0) {
            for (let cell of delayTimerMap.values) {
                if (cell instanceof Timer) {
                    addTimerReal(cell);
                } else {
                    delTimerReal(cell);
                }
            }
            delayTimerMap.clear();
        }
    }

    // ================================================================================
    // 延迟调用帧事件
    let timerMap: HashList<Timer> = new HashList<Timer>();
    let delayTimerMap: HashList<Timer | number> = new HashList<Timer | number>();

    function addTimerReal(timer: Timer): void {
        timerMap.add(timer.id, timer);
    }

    function delTimerReal(id: number): void {
        let timer: Timer = timerMap.del(id);
        if (timer && timer.isInner) {
            timer.recover();
        }
    }

    export function addTimer(timer: Timer): void {
        if (inFrame) {
            delayTimerMap.add(timer.id, timer);
        } else {
            addTimerReal(timer);
        }
    }

    export function delTimer(timer: Timer): void {
        if (inFrame) {
            delayTimerMap.add(timer.id, timer.id);
        } else {
            delTimerReal(timer.id);
        }
    }
}
module sear {
    export const setDelay: (delay: number, caller: any, method: Function, args?: Array<any>, repeat?: number) => sear.frame.Timer = sear.frame.setDelay;
    export const setDelayLoop: (delay: number, caller: any, method: Function, args?: Array<any>, isFull?: boolean) => sear.frame.Timer = sear.frame.setDelayLoop;
    export const setFrameLoop: (caller: any, method: Function, args?: Array<any>, isIgnore?: boolean) => sear.frame.Timer = sear.frame.setFrameLoop;
    export const callLater: (caller: any, method: Function, args?: Array<any>) => void = sear.frame.callLater;
}