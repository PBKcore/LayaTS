var suduku;
(function (suduku) {
    // =================================================================================== 数据
    var MAX = 9;
    /** 所有单元格*/
    var allCells;
    /** 横向单元组*/
    var hGroups;
    /** 纵向单元组*/
    var vGroups;
    /** 九宫单元组*/
    var nGroups;
    /** 强制停止，在一些运算量过大时*/
    suduku.loopMax = 0;
    var resultLen = 0;
    function Calc(datas) {
        // let time: number = Date.now();
        suduku.loopMax = 5000;
        allCells = [];
        hGroups = [];
        vGroups = [];
        nGroups = [];
        suduku.result = [];
        var yLen = datas.length;
        for (var y = 0; y < yLen; ++y) {
            var xList = datas[y];
            var xLen = xList.length;
            for (var x = 0; x < xLen; ++x) {
                var cell = new Cell(x, y);
                if (xList[x] > 0) {
                    cell.SetSureNum(xList[x]);
                }
                else {
                    cell.InitNum();
                }
                allCells.push(cell);
                var group = hGroups[cell.iy];
                if (!group) {
                    group = new Group(cell.iy);
                    hGroups.push(group);
                }
                group.Push(cell);
                group = vGroups[cell.ix];
                if (!group) {
                    group = new Group(cell.ix);
                    vGroups.push(group);
                }
                group.Push(cell);
                group = nGroups[cell.iG];
                if (!group) {
                    group = new Group(cell.iG);
                    nGroups.push(group);
                }
                group.Push(cell);
            }
        }
        // ----------------------------------------------------- calc
        //PrintState("init", null);
        //Sear.Log(Date.now() - time);
        BackTrack(allCells);
        //Sear.Log(Date.now() - time);
    }
    suduku.Calc = Calc;
    // ===================================================================================
    function GetResult() {
        var ret = [];
        for (var _i = 0, hGroups_1 = hGroups; _i < hGroups_1.length; _i++) {
            var group = hGroups_1[_i];
            ret.push(group.GetNumbers());
        }
        return ret;
    }
    function PrintResult(nums) {
        var yLen = nums.length;
        for (var iy = 0; iy < yLen; ++iy) {
            var xns = nums[iy];
            var xLen = xns.length;
            var str = "";
            for (var ix = 0; ix < xLen; ++ix) {
                str += xns[ix] + " ";
            }
            sear.log(str);
        }
    }
    function PrintAllResult() {
        var len = suduku.result.length;
        for (var i = 0; i < len; ++i) {
            sear.log("-----No." + (i + 1) + "------------------------------");
            PrintResult(suduku.result[i]);
        }
    }
    var isDebug = false;
    function PrintState(flag, cell) {
        if (!isDebug) {
            return;
        }
        if (cell != null) {
            sear.log("-----" + flag + ":" + cell.ix + "_" + cell.iy + "------------------------------");
        }
        else {
            sear.log("-----" + flag + "------------------------------");
        }
        for (var _i = 0, hGroups_2 = hGroups; _i < hGroups_2.length; _i++) {
            var group = hGroups_2[_i];
            var str = "";
            for (var _a = 0, _b = group.cells; _a < _b.length; _a++) {
                var cell_1 = _b[_a];
                str += cell_1.num + " ";
            }
            sear.log(str);
        }
    }
    // ===================================================================================
    function GetUnknownCells(list) {
        var ret = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var cell = list_1[_i];
            if (!cell.isSure) {
                ret.push(cell);
            }
        }
        return ret;
    }
    // =================================================================================== 
    /** 回溯算法*/
    function BackTrack(cells) {
        try {
            if (suduku.loopMax-- <= 0) {
                return;
            }
            CheckRule();
            // 当前步骤没问题，进行下一次选择
            var nextCells = GetUnknownCells(cells);
            if (nextCells.length == 0) {
                suduku.result.push(GetResult()); // 计算完成，返回一组合理值
                //resultLen += 1;
            }
            else {
                // branch 仍有分歧值，继续预设值
                // 由最小预设值开始，减少检测次数
                nextCells.sort(function SortOf(cellA, cellB) {
                    if (cellA.length < cellB.length) {
                        return -1;
                    }
                    else if (cellA.length > cellB.length) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
                for (var _i = 0, nextCells_1 = nextCells; _i < nextCells_1.length; _i++) {
                    var cell = nextCells_1[_i];
                    cell.DeepSave();
                }
                var topCell = nextCells[0];
                PrintState("save", topCell);
                var preNums = topCell.deepLast;
                var eIdx = preNums.length - 1;
                for (var i = 0; i <= eIdx; ++i) {
                    if (i > 0) {
                        if (i == eIdx) {
                            for (var _a = 0, nextCells_2 = nextCells; _a < nextCells_2.length; _a++) {
                                var cell = nextCells_2[_a];
                                cell.DeepBack();
                            }
                        }
                        else {
                            for (var _b = 0, nextCells_3 = nextCells; _b < nextCells_3.length; _b++) {
                                var cell = nextCells_3[_b];
                                cell.DeepBackClone();
                            }
                        }
                        PrintState("back", topCell);
                    }
                    topCell.SetSureNum(preNums[i]);
                    BackTrack(nextCells);
                }
            }
        }
        catch (error) {
        }
    }
    // =================================================================================== 数独规则
    /** 数独规则计算*/
    function CheckRule() {
        var isChange = true;
        while (isChange) {
            isChange = false;
            if (HiddenSingle()) {
                isChange = true;
            }
            if (NakedSingle()) {
                isChange = true;
            }
            if (LastValue()) {
                isChange = true;
            }
        }
    }
    /** 唯一解法：单元格剩余唯一值检测*/
    function LastValue() {
        var ret = false;
        for (var _i = 0, allCells_1 = allCells; _i < allCells_1.length; _i++) {
            var cell = allCells_1[_i];
            if (cell.CheckNum()) {
                ret = true;
            }
        }
        return ret;
    }
    /** 唯余解法：单元组剩余唯一余值*/
    function NakedSingle() {
        var ret = false;
        for (var _i = 0, hGroups_3 = hGroups; _i < hGroups_3.length; _i++) {
            var group = hGroups_3[_i];
            if (group.CheckNum()) {
                ret = true;
            }
        }
        for (var _a = 0, vGroups_1 = vGroups; _a < vGroups_1.length; _a++) {
            var group = vGroups_1[_a];
            if (group.CheckNum()) {
                ret = true;
            }
        }
        for (var _b = 0, nGroups_1 = nGroups; _b < nGroups_1.length; _b++) {
            var group = nGroups_1[_b];
            if (group.CheckNum()) {
                ret = true;
            }
        }
        return ret;
    }
    /** 基础摒弃法：单元组剩余唯一值检测*/
    function HiddenSingle() {
        var ret = false;
        for (var _i = 0, allCells_2 = allCells; _i < allCells_2.length; _i++) {
            var cell = allCells_2[_i];
            if (!cell.isSure) {
                continue;
            }
            for (var _a = 0, _b = hGroups[cell.iy].cells; _a < _b.length; _a++) {
                var gCell = _b[_a];
                if (gCell == cell) {
                    continue;
                }
                if (gCell.DelNum(cell.num)) {
                    ret = true;
                }
            }
            for (var _c = 0, _d = vGroups[cell.ix].cells; _c < _d.length; _c++) {
                var gCell = _d[_c];
                if (gCell == cell) {
                    continue;
                }
                if (gCell.DelNum(cell.num)) {
                    ret = true;
                }
            }
            for (var _e = 0, _f = nGroups[cell.iG].cells; _e < _f.length; _e++) {
                var gCell = _f[_e];
                if (gCell == cell) {
                    continue;
                }
                if (gCell.DelNum(cell.num)) {
                    ret = true;
                }
            }
        }
        return ret;
    }
    // ===================================================================================
    /** 数独单元组*/
    var Group = /** @class */ (function () {
        function Group(idx) {
            this._cells = [];
            this._idx = idx;
        }
        Group.prototype.Push = function (cell) {
            this._cells.push(cell);
        };
        Group.prototype.CheckNum = function () {
            var ret = false;
            var onlyCell;
            for (var num = 1; num <= MAX; ++num) {
                onlyCell = null;
                for (var _i = 0, _a = this._cells; _i < _a.length; _i++) {
                    var cell = _a[_i];
                    if (!cell.HasNum(num)) {
                        continue;
                    }
                    if (cell.isSure) {
                        onlyCell = null;
                        break;
                    }
                    if (onlyCell == null) {
                        onlyCell = cell;
                    }
                    else {
                        onlyCell = null;
                        break;
                    }
                }
                if (onlyCell != null) {
                    onlyCell.SetSureNum(num);
                    ret = true;
                }
            }
            return ret;
        };
        Group.prototype.GetNumbers = function () {
            var ret = [];
            for (var _i = 0, _a = this._cells; _i < _a.length; _i++) {
                var cell = _a[_i];
                ret.push(cell.num);
            }
            return ret;
        };
        Object.defineProperty(Group.prototype, "idx", {
            get: function () {
                return this._idx;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Group.prototype, "cells", {
            get: function () {
                return this._cells;
            },
            enumerable: true,
            configurable: true
        });
        return Group;
    }());
    // ===================================================================================
    /** 数独单元格*/
    var Cell = /** @class */ (function () {
        function Cell(ix, iy) {
            // ===========================================================
            /** 回溯深度缓存*/
            this._deepCaches = [];
            this._ix = ix;
            this._iy = iy;
            this._iG = ((ix / 3) | 0) + ((iy / 3) | 0) * 3;
        }
        Cell.prototype.InitNum = function () {
            this._num = [];
            for (var i = 1; i <= MAX; ++i) {
                this._num.push(i);
            }
        };
        Cell.prototype.CheckNum = function () {
            if (this.isSure) {
                return false;
            }
            if (this.length > 1) {
                return false;
            }
            else if (this.length == 1) {
                this.SetSureNum(this._num[0]);
                return true;
            }
            else {
                throw new Error("num is null");
            }
        };
        Cell.prototype.DelNum = function (num) {
            if (this.isSure) {
                if (this._num == num) {
                    throw new Error("num is repeat");
                }
                return false;
            }
            var idx = this._num.indexOf(num);
            if (idx == -1) {
                return false;
            }
            this._num.splice(idx, 1);
            return true;
        };
        Cell.prototype.HasNum = function (num) {
            if (this.isSure) {
                return this._num == num;
            }
            else {
                return this._num.indexOf(num) != -1;
            }
        };
        Object.defineProperty(Cell.prototype, "ix", {
            get: function () {
                return this._ix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "iy", {
            get: function () {
                return this._iy;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "iG", {
            get: function () {
                return this._iG;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "isSure", {
            get: function () {
                return typeof this._num === "number";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cell.prototype, "num", {
            get: function () {
                return this._num;
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.SetSureNum = function (value) {
            this._num = value;
        };
        Object.defineProperty(Cell.prototype, "length", {
            get: function () {
                return this._num.length;
            },
            enumerable: true,
            configurable: true
        });
        /** 保存当前深度数据*/
        Cell.prototype.DeepSave = function () {
            this._deepCaches.push(this._num.concat());
        };
        /** 返回上一层深度数据*/
        Cell.prototype.DeepBack = function () {
            this._num = this._deepCaches.pop();
        };
        Cell.prototype.DeepBackClone = function () {
            this._num = this.deepLast.concat();
        };
        Object.defineProperty(Cell.prototype, "deepLast", {
            get: function () {
                return this._deepCaches[this._deepCaches.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        return Cell;
    }()); // cell end
})(suduku || (suduku = {}));
//# sourceMappingURL=Sudoku.js.map