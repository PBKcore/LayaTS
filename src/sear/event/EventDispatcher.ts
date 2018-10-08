module sear.event {
    import Handler = sear.struct.Handler;

    /**
     * 事件派发器
     * 
     * @author pbk
     */
    export class EventDispatcher {

        // 响应事件集｛ type :[ Fun... ] ｝
        private _listeners: Object;

        constructor() {
        }

        destroy():void{
            this.offs();
            this._listeners = null;
        }

        /**
         * 添加侦听事件，重复回调不会重复添加
         * @param type 事件类型
         * @param caller 执行域。
         * @param method 处理函数。
         * @param args 函数参数。
         * @param once 是否只执行一次
         */
        on(type: string, caller: any, method: Function, args: Array<any> = null, once: boolean = false): void {
            if (this._isDispatching) {
                this._waitList.push({ operate: 1, type: type, caller: caller, method: method, args: args, once: once });
                return;
            }

            this._listeners || (this._listeners = {});
            let handler: Handler = Handler.create(caller, method, args, once);

            if (!this._listeners[type]) {
                this._listeners[type] = handler;
            } else {
                if (this._listeners[type] instanceof Handler) {
                    if ((<Handler>this._listeners[type]).equals(caller, method)) {
                        return;// 重复 
                    }
                    this._listeners[type] = [this._listeners[type], handler];
                } else {
                    if (this.hasHandelr(this._listeners[type], caller, method)) {
                        return;// 重复 
                    }
                    this._listeners[type].push(handler);
                }
            }
        }

        /**
         * 移除侦听函数
         * @param type 
         * @param caller 
         * @param method 
         */
        off(type: string, caller: any, method: Function): void {
            if (this._isDispatching) {
                this._waitList.push({ operate: 2, type: type, caller: caller, method: method });
                return;
            }

            if (!this.hasEvents(type)) {
                return;
            }

            let listener: any = this._listeners[type];
            if (listener instanceof Handler) {
                if (listener.equals(caller, method)) {
                    delete this._listeners[type];
                    listener.recover();
                }
            } else {
                let len: number = listener.length;
                for (let i: number = 0; i < len; ++i) {
                    if ((<Handler>listener[i]).equals(caller, method)) {
                        (<Handler>listener[i]).recover();
                        if (len == 1) {
                            delete this._listeners[type];
                        } else {
                            (<[Handler[]]>listener).splice(i, 1);
                        }
                        return;
                    }
                }
            }
        }

        /**
         * 移除 所有侦听事件 或 指定类型的所有侦听事件
         * @param type 值为null默认为移除所有侦听事件
         */
        offs(type: string = null): void {
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
                this.offsAux(type);
            } else {
                for (let key in this._listeners) {
                    this.offsAux(key);
                }
                this._listeners = null;
            }
        }

        private offsAux(type: string): void {
            if (this._listeners[type] instanceof Handler) {
                (<Handler>this._listeners[type]).recover();
            } else {
                let list: Handler[] = this._listeners[type];
                for (let cell of list) {
                    cell.recover();
                }
            }
            delete this._listeners[type];
        }

        /**
         * 检测是否有指定类型的侦听事件
         * @param type 
         */
        hasEvents(type: string): boolean {
            return this._listeners && this._listeners[type];
        }

        hasEvent(type: string, caller: any, method: Function): boolean {
            if (!this.hasEvents(type)) {
                return false;
            }

            let listener: any = this._listeners[type];
            if (listener instanceof Handler) {
                return listener.equals(caller, method);
            } else {
                return this.hasHandelr(listener, caller, method);
            }
        }

        // 列表中是否有相同的回调对象
        private hasHandelr(list: Handler[], caller: any, method: Function): boolean {
            for (let cell of list) {
                if (cell.equals(caller, method)) {
                    return true;
                }
            }
            return false;
        }

        // ========================================================================================
        // 派发事件进行时，对中途增添事件做延后处理
        private _isDispatching: boolean = false;
        private _waitList: any[] = [];
        /**
         * 派发事件
         * @param type 事件类型
         * @param data 
         */
        event(type: string, data: any = null): void {
            if (!this.hasEvents(type)) {
                return;
            }

            this._isDispatching = true;
            // try {
            let listener: any = this._listeners[type];
            if (listener instanceof Handler) {
                if (listener.once) {
                    delete this._listeners[type];
                }
                listener.runWith(data);
            } else {
                let len: number = listener.length;
                let dlist: number[];
                for (let i: number = 0; i < len; ++i) {
                    if ((<Handler>listener[i]).once) {
                        dlist || (dlist = []);
                        dlist.push(i);
                    }
                    (<Handler>listener[i]).runWith(data);
                }
                if (dlist) {
                    if (dlist.length == len) {
                        delete this._listeners[type];
                    } else {
                        len = dlist.length;
                        for (let i: number = len - 1; i >= 0; --i) {
                            dlist.splice(dlist[i], 1);
                        }
                    }
                }
            }
            // }
            // catch (error) {
            //     Sear.Error(error);
            // }
            // finally {
            if (this._waitList.length > 0) {
                for (let cell of this._waitList) {
                    if (cell.operate == 1) {
                        this.on(cell.type, cell.caller, cell.method, cell.args, cell.once);
                    } else if (cell.operate == 2) {
                        this.off(cell.type, cell.caller, cell.method);
                    } else if (cell.operate == 3) {
                        this.offs(cell.type);
                    }
                }
                this._waitList.length = 0;
            }

            this._isDispatching = false;
            // }
        }
    }
}
module sear {
    export const eventCenter: sear.event.EventDispatcher = new sear.event.EventDispatcher();
}