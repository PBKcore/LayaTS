module suduku {
    // =================================================================================== 数据
    const MAX: number = 9;

    /** 所有单元格*/
    let allCells: Cell[];
    /** 横向单元组*/
    let hGroups: Group[];
    /** 纵向单元组*/
    let vGroups: Group[];
    /** 九宫单元组*/
    let nGroups: Group[];

    export let result: number[][][];
    /** 强制停止，在一些运算量过大时*/
    export let loopMax: number = 0;
    let resultLen: number = 0;

    export function Calc(datas: number[][]): void {
        // let time: number = Date.now();
        loopMax = 5000;

        allCells = [];
        hGroups = [];
        vGroups = [];
        nGroups = [];
        result = [];

        let yLen: number = datas.length;
        for (let y: number = 0; y < yLen; ++y) {
            let xList: number[] = datas[y];
            let xLen: number = xList.length;
            for (let x: number = 0; x < xLen; ++x) {
                let cell: Cell = new Cell(x, y);
                if (xList[x] > 0) {
                    cell.SetSureNum(xList[x]);
                } else {
                    cell.InitNum();
                }
                allCells.push(cell);

                let group: Group = hGroups[cell.iy];
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

    // ===================================================================================
    function GetResult(): number[][] {
        let ret: number[][] = [];
        for (let group of hGroups) {
            ret.push(group.GetNumbers());
        }
        return ret;
    }

    function PrintResult(nums: number[][]): void {
        let yLen: number = nums.length;
        for (let iy: number = 0; iy < yLen; ++iy) {
            let xns: number[] = nums[iy];
            let xLen: number = xns.length;
            let str: string = "";
            for (let ix: number = 0; ix < xLen; ++ix) {
                str += xns[ix] + " ";
            }
            sear.log(str);
        }
    }

    function PrintAllResult(): void {
        let len: number = result.length;
        for (let i: number = 0; i < len; ++i) {
            sear.log("-----No." + (i + 1) + "------------------------------");
            PrintResult(result[i]);
        }
    }
    let isDebug: boolean = false;
    function PrintState(flag: string, cell: Cell): void {
        if (!isDebug) {
            return;
        }
        if (cell != null) {
            sear.log("-----" + flag + ":" + cell.ix + "_" + cell.iy + "------------------------------");
        } else {
            sear.log("-----" + flag + "------------------------------");
        }

        for (let group of hGroups) {
            let str: string = "";
            for (let cell of group.cells) {
                str += cell.num + " ";
            }
            sear.log(str);
        }
    }

    // ===================================================================================
    function GetUnknownCells(list: Cell[]): Cell[] {
        let ret: Cell[] = [];
        for (let cell of list) {
            if (!cell.isSure) {
                ret.push(cell);
            }
        }
        return ret;
    }

    // =================================================================================== 
    /** 回溯算法*/
    function BackTrack(cells: Cell[]): void {
        try {
            if (loopMax-- <= 0) {
                return;
            }

            CheckRule();

            // 当前步骤没问题，进行下一次选择
            let nextCells: Cell[] = GetUnknownCells(cells);
            if (nextCells.length == 0) {
                result.push(GetResult());// 计算完成，返回一组合理值
                //resultLen += 1;
            } else {
                // branch 仍有分歧值，继续预设值
                // 由最小预设值开始，减少检测次数
                nextCells.sort(
                    function SortOf(cellA: Cell, cellB: Cell): number {
                        if (cellA.length < cellB.length) {
                            return -1;
                        } else if (cellA.length > cellB.length) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                );
                for (let cell of nextCells) {
                    cell.DeepSave();
                }
                let topCell: Cell = nextCells[0];
                PrintState("save", topCell);
                let preNums: number[] = topCell.deepLast;
                let eIdx: number = preNums.length - 1;
                for (let i: number = 0; i <= eIdx; ++i) {
                    if (i > 0) {
                        if (i == eIdx) {
                            for (let cell of nextCells) {
                                cell.DeepBack();
                            }
                        } else {
                            for (let cell of nextCells) {
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
    function CheckRule(): void {
        let isChange: boolean = true;

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
    function LastValue(): boolean {
        let ret: boolean = false;
        for (let cell of allCells) {
            if (cell.CheckNum()) {
                ret = true;
            }
        }
        return ret;
    }

    /** 唯余解法：单元组剩余唯一余值*/
    function NakedSingle(): boolean {
        let ret: boolean = false;
        for (let group of hGroups) {
            if (group.CheckNum()) {
                ret = true;
            }
        }
        for (let group of vGroups) {
            if (group.CheckNum()) {
                ret = true;
            }
        }
        for (let group of nGroups) {
            if (group.CheckNum()) {
                ret = true;
            }
        }
        return ret;
    }

    /** 基础摒弃法：单元组剩余唯一值检测*/
    function HiddenSingle(): boolean {
        let ret: boolean = false;
        for (let cell of allCells) {
            if (!cell.isSure) {
                continue;
            }

            for (let gCell of hGroups[cell.iy].cells) {
                if (gCell == cell) {
                    continue;
                }
                if (gCell.DelNum(cell.num)) {
                    ret = true;
                }
            }

            for (let gCell of vGroups[cell.ix].cells) {
                if (gCell == cell) {
                    continue;
                }
                if (gCell.DelNum(cell.num)) {
                    ret = true;
                }
            }

            for (let gCell of nGroups[cell.iG].cells) {
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
    class Group {
        private _idx: number;
        private _cells: Cell[] = [];

        constructor(idx: number) {
            this._idx = idx;
        }

        Push(cell: Cell): void {
            this._cells.push(cell);
        }

        CheckNum(): boolean {
            let ret: boolean = false;
            let onlyCell: Cell;
            for (let num: number = 1; num <= MAX; ++num) {
                onlyCell = null;

                for (let cell of this._cells) {
                    if (!cell.HasNum(num)) {
                        continue;
                    }

                    if (cell.isSure) {
                        onlyCell = null;
                        break;
                    }

                    if (onlyCell == null) {
                        onlyCell = cell;
                    } else {
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
        }

        GetNumbers(): number[] {
            let ret: number[] = [];
            for (let cell of this._cells) {
                ret.push(cell.num);
            }
            return ret;
        }

        get idx(): number {
            return this._idx;
        }

        get cells(): Cell[] {
            return this._cells;
        }
    }

    // ===================================================================================
    /** 数独单元格*/
    class Cell {
        private _ix: number;
        private _iy: number;
        private _iG: number;
        private _num: any;

        constructor(ix: number, iy: number) {
            this._ix = ix;
            this._iy = iy;
            this._iG = ((ix / 3) | 0) + ((iy / 3) | 0) * 3;
        }

        InitNum(): void {
            this._num = [];

            for (let i: number = 1; i <= MAX; ++i) {
                this._num.push(i);
            }
        }

        CheckNum(): boolean {
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
        }

        DelNum(num: number): boolean {
            if (this.isSure) {
                if (this._num == num) {
                    throw new Error("num is repeat");
                }
                return false;
            }

            let idx: number = this._num.indexOf(num);
            if (idx == -1) {
                return false;
            }

            this._num.splice(idx, 1);
            return true;
        }

        HasNum(num: number): boolean {
            if (this.isSure) {
                return this._num == num;
            } else {
                return this._num.indexOf(num) != -1;
            }
        }

        get ix(): number {
            return this._ix;
        }

        get iy(): number {
            return this._iy;
        }

        get iG(): number {
            return this._iG;
        }

        get isSure(): boolean {
            return typeof this._num === "number";
        }

        get num(): number {
            return this._num;
        }

        SetSureNum(value: number): void {
            this._num = value;
        }

        get length(): number {
            return this._num.length;
        }

        // ===========================================================
        /** 回溯深度缓存*/
        private _deepCaches: any[] = [];

        /** 保存当前深度数据*/
        DeepSave(): void {
            this._deepCaches.push(this._num.concat());
        }

        /** 返回上一层深度数据*/
        DeepBack(): void {
            this._num = this._deepCaches.pop();
        }

        DeepBackClone(): void {
            this._num = this.deepLast.concat();
        }

        get deepLast(): number[] {
            return this._deepCaches[this._deepCaches.length - 1];
        }
    }// cell end
}