var sear;
(function (sear) {
    /**
     * 获取类名
     * @param target 支持：类型、对象
     */
    function getClassName(target) {
        if (!target["constructor"] && target["prototype"]) {
            // 初步判定：实例有constructor属性，没有prototype属性
            target = target["constructor"];
        }
        return target["name"];
    }
    sear.getClassName = getClassName;
    /** 获取对象的GID*/
    function getGID(target) {
        return target ? target.$_GID || (target.$_GID = laya.utils.Utils.getGID()) : 0;
    }
    sear.getGID = getGID;
    var MID = 1;
    /** 获取函数的MID*/
    function getMID(method) {
        return method ? method.$_MID || (method.$_MID = MID++) : 0;
    }
    sear.getMID = getMID;
    /** 删除数组中指定的一个对象*/
    function arrayDelete(list, cell) {
        if (!list) {
            return false;
        }
        var idx = list.indexOf(cell);
        if (idx == -1) {
            return false;
        }
        list.splice(idx, 1);
        return true;
    }
    sear.arrayDelete = arrayDelete;
    /**
     * 批量删除数组中对象。只要有一个未删除返回false
     * @param list
     * @param dels
     */
    function arrayDeletes(list, dels) {
        if (!list || !dels) {
            return false;
        }
        var ret = true;
        var idx;
        for (var _i = 0, dels_1 = dels; _i < dels_1.length; _i++) {
            var cell = dels_1[_i];
            idx = list.indexOf(cell);
            if (idx == -1) {
                ret = false;
            }
            list.splice(idx, 1);
        }
        return ret;
    }
    sear.arrayDeletes = arrayDeletes;
})(sear || (sear = {}));
//# sourceMappingURL=Global.js.map