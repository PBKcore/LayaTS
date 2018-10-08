module sear.net {
    import Handler = sear.struct.Handler;

    /**
     * 
     * 
     * @author pbk
     */
    export class MessagePool {
        // 消息类型
        private _msgClass: Object = {};
        // 消息是否高频触发
        private _msgHighs: Object = {};
        // 消息实例
        private _messages: Object = {};

        // 接收消息回调函数
        private _handlers: Object = {};

        constructor() {
        }W

        /**
         * 注册消息
         * @param messageClass 消息类
         * @param id 消息ID
         * @param isHigh 是否高频触发（若是高频触发，会保存消息实例以便复用，注意外部不能缓存或者异步使用该消息对象）
         * @param caller 接收消息执行域
         * @param method 接收消息处理函数（注意：实际回调函数要外包一层函数，不能直接注册，以避免注册时初始化对应模块）
         */
        register(id :number, messageClass: any, isHigh: boolean = false, caller: any = null, method: Function = null): void {
            if (this._msgClass[id]) {
                log("【MessagePool Register】 id repeat:" + id
                    + " old:" + getClassName(this._msgClass[id])
                    + " new:" + getClassName(messageClass));
                return;
            }

            this._msgClass[id] = messageClass;

            if (isHigh) {
                this._msgHighs[id] = true;
            }
            if (method) {
                this._handlers[id] = Handler.create(caller, method);
            }
        }

        GetMessage(id: number): any {
            let message: any = this._messages[id];
            if (!message) {
                if (!this._msgClass[id]) {
                    log("【MessagePool GetMessage】Can't find message:" + id);
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
        }

        GetHandler(id: number): Handler {
            if (!this._handlers[id]) {
                log("【MessagePool GetHandler】Can't find handler:" + id);
                return null;
            }
            return this._handlers[id];
        }
    }
}