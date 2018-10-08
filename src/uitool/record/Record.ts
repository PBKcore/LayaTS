module uitool.record {
    import IPool = sear.pool.IPool;
    import Pool = sear.pool.Pool;
    import ComponentCtrl = ui.ComponentCtrl;

    /** 添加到父容器[老父容器,老层级,新父容器,新层级]*/
    export let ADD: number = 1;
    /** 从父容器删除[老父容器,老层级]*/
    export let DELETE: number = 2;
    /** 改变属性[属性键值,老值,新值,...]*/
    export let CHANGE: number = 3;

    let records: Record[][] = [];// 存储记录
    let index: number = -1;// 存储当前索引
    let indexSave: number = -1;// 存储的索引位置

    export function recordNew(): void {
        if (index >= 0 && !records[index]) {
            return;// 避免当前索引下无任何记录
        }
        clearOrder(index + 1);
        index += 1;
    }

    /**
     * 记录指令:
     * ADD[老父容器,老层级,新父容器,新层级];
     * DELETE[老父容器,老层级];
     * CHANGE[属性键值,老值,新值,...]
     * @param type 操作类型
     * @param ctrl UI操作对象
     * @param orders 
     */
    export function recordOrder(type: number, ctrl: ComponentCtrl, orders: any[]): void {
        let list: Record[] = records[index];
        if (!list) {
            records[index] = list = [];
        }

        let record: Record = getPool().pop();
        record.ctrl = ctrl;
        record.type = type;
        record.orders = orders;
        list.push(record);
    }

    /** 清理指令 startIdx至结束所有的指令*/
    export function clearOrder(startIdx: number = 0): void {
        if (startIdx >= records.length) {
            return;
        }
        for (let len: number = records.length; startIdx < len; ++startIdx) {
            let list: Record[] = records[startIdx];
            if (list) {
                for (let record of list) {
                    record.recover();
                }
                list.length = 0;
            }
        }
        records.length = startIdx;
        index = startIdx - 1;
    }

    export function saveIndex(): void {
        indexSave = index;
    }

    /** 有修改*/
    export function isChange(): boolean {
        return index != indexSave;
    }

    /** 还原上一步指令*/
    export function ctrlZRevert(): void {
        if (index < 0) {
            return;
        }
        let list: Record[] = records[index];
        if (list) {
            for (let record of list) {
                record.revertOrder();
            }
        }
        index -= 1;
    }

    /** 返回下一步指令*/
    export function ctrlYReturn(): void {
        if (index >= records.length - 1) {
            return;
        }
        let list: Record[] = records[index];
        if (list) {
            for (let record of list) {
                record.returnOrder();
            }
        }
        index += 1;
    }

    // ====================================================================================
    /**
     * 记录操作
     * 
     * @author pbk
     */
    export class Record implements IPool {
        ctrl: ComponentCtrl;
        /** 当前操作类型*/
        type: number;
        orders: any[] = [];

        constructor() {
        }

        /** 还原操作*/
        revertOrder(): void {
            if (this.type == CHANGE) {
                let len: number = this.orders.length;
                for (let i: number = 0; i < len; i += 3) {
                    this.ctrl.setValue(this.orders[i], this.orders[i + 1], false);
                }
            } else if (this.type == ADD) {
                if (this.oldParent) {
                    this.oldParent.addChildAt(this.ctrl, this.oldLayer, false);
                } else if (this.newParent) {
                    this.newParent.removeChild(this.ctrl, false);
                } else {
                    panelCtrl.treeCtrl.delHead(this.ctrl, false);
                }
            } else if (this.type == DELETE) {
                if (this.oldParent) {
                    this.oldParent.addChildAt(this.ctrl, this.oldLayer, false);
                } else {
                    panelCtrl.treeCtrl.addHead(this.ctrl);
                }
            }
        }

        /** 返回操作*/
        returnOrder(): void {
            if (this.type == CHANGE) {
                let len: number = this.orders.length;
                for (let i: number = 0; i < len; i += 3) {
                    this.ctrl.setValue(this.orders[i], this.orders[i + 2], false);
                }
            } else if (this.type == ADD) {
                if (this.newParent) {
                    this.newParent.addChildAt(this.ctrl, this.newLayer, false);
                } else {
                    panelCtrl.treeCtrl.addHead(this.ctrl);
                }
            } else if (this.type == DELETE) {
                if (this.oldParent) {
                    this.oldParent.removeChild(this.ctrl, false);
                } else {
                    panelCtrl.treeCtrl.delHead(this.ctrl);
                }
            }
        }

        private get oldParent(): ComponentCtrl {
            return this.orders[0];
        }
        private get oldLayer(): number {
            return this.orders[1];
        }
        private get newParent(): ComponentCtrl {
            return this.orders[2];
        }
        private get newLayer(): number {
            return this.orders[3];
        }

        clear(): void {
            if (this.type == DELETE) {
                this.ctrl.destroy();
                this.ctrl = null;
            }
            this.type = 0;
            this.orders = null;
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
            getPool().push(this);
        }
    }

    let pool: Pool<Record> = null;
    function getPool(): Pool<Record> {
        return pool || (pool = new Pool<Record>(Record, 50));
    }
}