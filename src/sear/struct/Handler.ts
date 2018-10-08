module sear.struct {
    import IPool = sear.pool.IPool;
    import Utils = laya.utils.Utils;

    /**
     * 函数回调处理器
     * 对象池管理
     * 
     * @author pbk
     */
    export class Handler implements IPool {
        /**
         * 从对象池内创建一个Handler（推荐使用）
         * @param caller 执行域。
         * @param method 处理函数。
         * @param args 函数参数。
         * @param once 是否只执行一次
         */
        static create(caller: any, method: Function, args: Array<any> = null, once: boolean = false): Handler {
            let handler: Handler = pool.getHandler();
            handler.caller = caller;
            handler.method = method;
            handler.args = args;
            handler.once = once;

            return handler;
        }

        static toID(caller: any, method: any): string {
            return getGID(caller) + "_" + getMID(method);
        }

        /** 执行域*/
        caller: any;
        /** 执行函数*/
        method: Function;
        /** 参数*/
        args: Array<any>;
        /** 是否只执行一次*/
        once: boolean;

        constructor() {
        }

        /** 执行处理器*/
        run(): any {
            if (this.method == null) {
                return null;
            }
            let result: any = this.method.apply(this.caller, this.args);
            if (this.once) {
                this.recover();
            }
            return result;
        }

        /**
         * 执行处理器，携带额外数据
         * @param data 附加的回调数据，可以是单数据或者Array(作为多参)
         */
        runWith(data: any): any {
            if (this.method == null) {
                return null;
            }
            let result: any;
            if (data == null) {
                result = this.method.apply(this.caller, this.args);
            } else {
                if (!this.args) {
                    if (typeof data === "array") {
                        result = this.method.apply(this.caller, data);
                    } else {
                        result = this.method.call(this.caller, data);
                    }
                } else {
                    if (typeof data === "array") {
                        result = this.method.apply(this.caller, this.args.concat(data));
                    } else {
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
        }

        /** 添加参数*/
        addArg(arg: any): void {
            this.args || (this.args = []);
            this.args.push(arg);
        }

        equalsHandler(handler: Handler): boolean {
            if (!handler) {
                return false;
            }
            return this.equals(handler.caller, handler.method);
        }

        /** 检测执行域和执行函数是否相同*/
        equals(caller: any, method: Function): boolean {
            return getGID(this.caller) == getGID(caller) && getMID(this.method) == getMID(method);
        }

        get id(): string {
            return Handler.toID(this.caller, this.method);
        }

        clear(): void {
            this.caller = null;
            this.method = null;
            this.args = null;
            this.once = false;
        }

        destroy(): void {
            this.clear();
            this._destroyed = true;
        }

        private _destroyed: boolean = false;
        get destroyed(): boolean {
            return this._destroyed;
        }

        /** 回收进对象池*/
        recover(): void {
            pool.recHandler(this);
        }
    }
}