module sear.pool {

    /**
     * 对象池
     * 
     * @author pbk
     */
    export class Pool<T extends IPool> {
        private _nodeClass: new () => T;
        private _maxCount: number;
        private _list: T[];

        constructor(nodeClass: any, max: number) {
            this._nodeClass = nodeClass;
            this._maxCount = max;

            this._list = [];
        }

        /** 压入对象*/
        push(node: T): void {
            if (node == null) {
                error("[ObjectPool Push] node is null");
                return;
            }

            if (node.destroyed) {
                error("[ObjectPool Push] node was destroyed");
                return;
            }

            if (this._list.indexOf(node) != -1) {
                return;
            }

            if (this._list.length < this._maxCount) {
                node.clear();
                this._list.push(node);// 存储对象
            } else {
                node.destroy();// 对象池已满，拒绝并销毁对象
            }
        }

        /** 取出对象*/
        pop(): T {
            if (this._list.length > 0) {
                return this._list.pop();
            } else {
                return new this._nodeClass();
            }
        }

        /** 清理对象池数据*/
        clear(): void {
            for (let node of this._list) {
                node.destroy();
            }
            this._list.length = 0;
        }

        /** 对象池最大存储数*/
        set maxCount(value: number) {
            this._maxCount = value;
        }

        /** 对象池当前存储数*/
        get count(): number {
            return this._list.length;
        }
    }
}