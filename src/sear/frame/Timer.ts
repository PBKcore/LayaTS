module sear.frame {
    import IPool = sear.pool.IPool;
    import Handler = sear.struct.Handler;

    let TO_ID: number = 0;
    /**
     * 帧事件对象
     * 对象池管理
     * 
     * @author pbk
     */
    export class Timer implements IPool {

        /** 计时器延迟时间（毫秒）*/
        private _delay: number;
        /** 计时器运行总次数*/
        private _repeat: number;
        /** 回调函数*/
        private _handler: Handler;
        /** 是否补帧*/
        private _isFull: boolean;
        /** 当帧率太低时忽略执行*/
        private _isIgnore: boolean;

        private _id: number = 0;
        private _running: boolean = false;
        private _count: number = 0;
        private _interval: number = 0;

        private _isInner: boolean = true;

        constructor() {
            this._id = ++TO_ID;
        }

        init(handler: Handler, delay: number, repeat: number, isFull: boolean, isIgnore: boolean): void {
            if (this._handler) {
                return;// 不能重复赋值
            }
            this._delay = delay;
            this._repeat = repeat;
            this._handler = handler;
            this._isFull = isFull;
            this._isIgnore = isIgnore;
        }

        clear(): void {
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
        }

        get id(): number {
            return this._id;
        }
        get handler(): Handler {
            return this._handler;
        }
        /** 是否循环*/
        get isLoop(): boolean {
            return this._repeat == 0;
        }
        /** 是否帧循环*/
        get isLoopFrame(): boolean {
            return this._delay == 0;
        }
        /** 是否延迟下一帧执行*/
        get isLater(): boolean {
            return this._delay == 1;
        }
        get running(): boolean {
            return this._running;
        }
        /** 内部管理，会自动回收使用*/
        get isInner(): boolean {
            return this._isInner;
        }

        // ===============================================
        destroy(): void {
            this.clear();
            this._destroyed = true;
        }

        /** 回收进对象池*/
        recover(): void {
            pool.recTimer(this);
        }

        private _destroyed: boolean = false;
        get destroyed(): boolean {
            return this._destroyed;
        }

        // ===============================================
        /** 执行回调函数，每帧调用（注意：慎手动调用）*/
        checkCallback(interval: number): void {
            if (this.isLoop) {
                if (this.isLoopFrame) {
                    // 帧循环
                    if (this._isIgnore && Date.now() - runTime > 40) {
                        return;
                    }
                    this.doCallback();
                } else {
                    // 定时循环
                    this._interval += interval;
                    if (this._isFull) {
                        // 补帧
                        while (this._interval >= this._delay) {
                            this._interval -= this._delay;
                            this.doCallback();
                        }
                    } else {
                        if (this._interval >= this._delay) {
                            this._interval = 0;
                            this.doCallback();
                        }
                    }
                }
            } else {
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
        }

        doCallback(): void {
            if (!this._handler) {
                return;
            }
            this._handler.run();// try catch 会大幅度降低效率，故这里先不做检测
        }

        start(): void {
            if (this._running) {
                return;
            }
            if (this.checkRepeat()) {
                return;
            }
            this._running = true;
            addTimer(this);
        }

        /**
         * 停止计时器
         * @param isInner true：停止后不可再次使用，会自动回收；false：停止后不回收脱管，可再次开启或关闭
         */
        stop(isInner: boolean = true): void {
            if (!this._running) {
                return;
            }
            this._running = false;
            this._isInner = isInner;
            this.cRepeat();
            delTimer(this);
        }

        set delay(value: number) {
            if (this.isLoopFrame) {
                return;
            }
            this._delay = value;
        }

        // ---------------------------------------------------------------------
        private checkRepeat(): boolean {
            if (!this._handler) {
                return false;
            }
            let type: number;
            if (this.isLoopFrame) {
                type = 2;
            } else if (this.isLater) {
                type = 1;
            } else {
                return false;
            }
            let hID: string = this._handler.id;
            let state: number = repeatMap[hID];
            if (state) {
                if (type <= state) {
                    return true;
                } else {
                    repeatMap[hID] = type + state;
                    return false;
                }
            } else {
                repeatMap[hID] = type;
                return false;
            }
        }

        private cRepeat(): void {
            if (!this._handler) {
                return;
            }
            let type: number;
            if (this.isLoopFrame) {
                type = 2;
            } else if (this.isLater) {
                type = 1;
            } else {
                return;
            }
            let hID: string = this._handler.id;
            let state: number = repeatMap[hID];
            if (state > type) {
                repeatMap[hID] = state - type;
            } else if (state == type) {
                delete repeatMap[hID];
            } else {
                error("Timer Repeat logic error!");
            }
        }
    }

    let repeatMap: Object = {};// 避免重复

    export function isRepeat(caller: any, method: Function, isFrame: boolean): boolean {
        return repeatMap[Handler.toID(caller, method)] >= (isFrame ? 2 : 1);
    }
}