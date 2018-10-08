module sear.loader {
    import IPool = sear.pool.IPool;
    import Handler = sear.struct.Handler;

    let TO_ID: number = 1;

    /**
     * 加载记录
     * 对象池管理
     * 
     * @author pbk
     */
    export class LoadRecord implements IPool {
        private _id: number;

        url: string | string[];
        private _complete: Handler | Handler[];

        constructor() {
            this._id = TO_ID++;
        }

        addComplete(handler: Handler): void {
            if (!this._complete) {
                this._complete = handler;
            } else if (this._complete instanceof Handler) {
                this._complete = [this._complete, handler];
            } else {
                this._complete.push(handler);
            }
        }

        equalsUrl(url: string | string[]): boolean {
            if (typeof url === "string") {
                if (typeof this.url === "string") {
                    return url == this.url;
                } else {
                    return false;
                }
            } else {
                if (typeof this.url === "string") {
                    return false;
                } else {
                    if (url.length != this.url.length) {
                        return false;
                    }

                    for (let cell of this.url) {
                        if (url.indexOf(cell) == -1) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }

        runWith(data: any): void {
            if (!this._complete) {
                return;
            }

            if (this._complete instanceof Handler) {
                this._complete.runWith(data);
            } else {
                for (let handler of this._complete) {
                    handler.runWith(data);
                }
            }
        }

        clear(): void {
            this.url = null;
            this._complete = null;
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
            pool.recLoadRecord(this);
        }

        get id(): number {
            return this._id;
        }
    }
}