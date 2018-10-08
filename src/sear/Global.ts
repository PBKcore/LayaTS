module sear {

    /**
     * 获取类名
     * @param target 支持：类型、对象
     */
    export function getClassName(target: any): string {
        if (!target["constructor"] && target["prototype"]) {
            // 初步判定：实例有constructor属性，没有prototype属性
            target = target["constructor"];
        }

        return target["name"];
    }

    /** 获取对象的GID*/
    export function getGID(target: any): number {
        return target ? target.$_GID || (target.$_GID = laya.utils.Utils.getGID()) : 0;
    }

    let MID: number = 1;
    /** 获取函数的MID*/
    export function getMID(method: any): number {
        return method ? method.$_MID || (method.$_MID = MID++) : 0;
    }

    /** 删除数组中指定的一个对象*/
    export function arrayDelete(list: any[], cell: any | any[]): boolean {
        if (!list) {
            return false;
        }
        let idx: number = list.indexOf(cell);
        if (idx == -1) {
            return false;
        }
        list.splice(idx, 1);
        return true;
    }

    /**
     * 批量删除数组中对象。只要有一个未删除返回false
     * @param list 
     * @param dels 
     */
    export function arrayDeletes(list: any[], dels: any[]): boolean {
        if (!list || !dels) {
            return false;
        }
        let ret: boolean = true;
        let idx: number;
        for (let cell of dels) {
            idx = list.indexOf(cell);
            if (idx == -1) {
                ret = false;
            }
            list.splice(idx, 1);
        }
        return ret;
    }
}