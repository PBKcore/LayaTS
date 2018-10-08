var uitool;
(function (uitool) {
    var record;
    (function (record_1) {
        var Pool = sear.pool.Pool;
        /** 添加到父容器[老父容器,老层级,新父容器,新层级]*/
        record_1.ADD = 1;
        /** 从父容器删除[老父容器,老层级]*/
        record_1.DELETE = 2;
        /** 改变属性[属性键值,老值,新值,...]*/
        record_1.CHANGE = 3;
        var records = []; // 存储记录
        var index = -1; // 存储当前索引
        var indexSave = -1; // 存储的索引位置
        function recordNew() {
            if (index >= 0 && !records[index]) {
                return; // 避免当前索引下无任何记录
            }
            clearOrder(index + 1);
            index += 1;
        }
        record_1.recordNew = recordNew;
        /**
         * 记录指令:
         * ADD[老父容器,老层级,新父容器,新层级];
         * DELETE[老父容器,老层级];
         * CHANGE[属性键值,老值,新值,...]
         * @param type 操作类型
         * @param ctrl UI操作对象
         * @param orders
         */
        function recordOrder(type, ctrl, orders) {
            var list = records[index];
            if (!list) {
                records[index] = list = [];
            }
            var record = getPool().pop();
            record.ctrl = ctrl;
            record.type = type;
            record.orders = orders;
            list.push(record);
        }
        record_1.recordOrder = recordOrder;
        /** 清理指令 startIdx至结束所有的指令*/
        function clearOrder(startIdx) {
            if (startIdx === void 0) { startIdx = 0; }
            if (startIdx >= records.length) {
                return;
            }
            for (var len = records.length; startIdx < len; ++startIdx) {
                var list = records[startIdx];
                if (list) {
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var record_2 = list_1[_i];
                        record_2.recover();
                    }
                    list.length = 0;
                }
            }
            records.length = startIdx;
            index = startIdx - 1;
        }
        record_1.clearOrder = clearOrder;
        function saveIndex() {
            indexSave = index;
        }
        record_1.saveIndex = saveIndex;
        /** 有修改*/
        function isChange() {
            return index != indexSave;
        }
        record_1.isChange = isChange;
        /** 还原上一步指令*/
        function ctrlZRevert() {
            if (index < 0) {
                return;
            }
            var list = records[index];
            if (list) {
                for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                    var record_3 = list_2[_i];
                    record_3.revertOrder();
                }
            }
            index -= 1;
        }
        record_1.ctrlZRevert = ctrlZRevert;
        /** 返回下一步指令*/
        function ctrlYReturn() {
            if (index >= records.length - 1) {
                return;
            }
            var list = records[index];
            if (list) {
                for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                    var record_4 = list_3[_i];
                    record_4.returnOrder();
                }
            }
            index += 1;
        }
        record_1.ctrlYReturn = ctrlYReturn;
        // ====================================================================================
        /**
         * 记录操作
         *
         * @author pbk
         */
        var Record = /** @class */ (function () {
            function Record() {
                this.orders = [];
                this._destroyed = false;
            }
            /** 还原操作*/
            Record.prototype.revertOrder = function () {
                if (this.type == record_1.CHANGE) {
                    var len = this.orders.length;
                    for (var i = 0; i < len; i += 3) {
                        this.ctrl.setValue(this.orders[i], this.orders[i + 1], false);
                    }
                }
                else if (this.type == record_1.ADD) {
                    if (this.oldParent) {
                        this.oldParent.addChildAt(this.ctrl, this.oldLayer, false);
                    }
                    else if (this.newParent) {
                        this.newParent.removeChild(this.ctrl, false);
                    }
                    else {
                        uitool.panelCtrl.treeCtrl.delHead(this.ctrl, false);
                    }
                }
                else if (this.type == record_1.DELETE) {
                    if (this.oldParent) {
                        this.oldParent.addChildAt(this.ctrl, this.oldLayer, false);
                    }
                    else {
                        uitool.panelCtrl.treeCtrl.addHead(this.ctrl);
                    }
                }
            };
            /** 返回操作*/
            Record.prototype.returnOrder = function () {
                if (this.type == record_1.CHANGE) {
                    var len = this.orders.length;
                    for (var i = 0; i < len; i += 3) {
                        this.ctrl.setValue(this.orders[i], this.orders[i + 2], false);
                    }
                }
                else if (this.type == record_1.ADD) {
                    if (this.newParent) {
                        this.newParent.addChildAt(this.ctrl, this.newLayer, false);
                    }
                    else {
                        uitool.panelCtrl.treeCtrl.addHead(this.ctrl);
                    }
                }
                else if (this.type == record_1.DELETE) {
                    if (this.oldParent) {
                        this.oldParent.removeChild(this.ctrl, false);
                    }
                    else {
                        uitool.panelCtrl.treeCtrl.delHead(this.ctrl);
                    }
                }
            };
            Object.defineProperty(Record.prototype, "oldParent", {
                get: function () {
                    return this.orders[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Record.prototype, "oldLayer", {
                get: function () {
                    return this.orders[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Record.prototype, "newParent", {
                get: function () {
                    return this.orders[2];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Record.prototype, "newLayer", {
                get: function () {
                    return this.orders[3];
                },
                enumerable: true,
                configurable: true
            });
            Record.prototype.clear = function () {
                if (this.type == record_1.DELETE) {
                    this.ctrl.destroy();
                    this.ctrl = null;
                }
                this.type = 0;
                this.orders = null;
            };
            Record.prototype.destroy = function () {
                this.clear();
                this._destroyed = true;
            };
            Object.defineProperty(Record.prototype, "destroyed", {
                get: function () {
                    return this._destroyed;
                },
                enumerable: true,
                configurable: true
            });
            /** 回收进对象池*/
            Record.prototype.recover = function () {
                getPool().push(this);
            };
            return Record;
        }());
        record_1.Record = Record;
        var pool = null;
        function getPool() {
            return pool || (pool = new Pool(Record, 50));
        }
    })(record = uitool.record || (uitool.record = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=Record.js.map