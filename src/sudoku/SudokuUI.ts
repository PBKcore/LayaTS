module suduku {
    import InputLabel = sear.ui.InputLabel;
    import Label = sear.ui.Label;
    import Button = sear.ui.Button;

    let editList: InputLabel[][];

    let labPage: Label;
    let labLog: Label;

    export function Main(): void {
        sear.startupApp();

        const max: number = 9;
        let off: number = 10;
        let initY: number = 10;
        let initX: number = (sear.stage.width - (max * 50 + (max - 1) * off)) * 0.5;
        off += 50;

        editList = [];
        for (let iy: number = 0; iy < max; ++iy) {
            let xlist: InputLabel[] = [];
            editList.push(xlist);
            for (let ix: number = 0; ix < max; ++ix) {
                let edit: InputLabel = GetEdit();
                edit.x = initX + ix * off;
                edit.y = initY + iy * off;
                xlist.push(edit);
            }
        }

        let brE: InputLabel = editList[max - 1][max - 1];
        let btnStart: Button = GetBtn();
        btnStart.x = brE.x - btnStart.width;
        btnStart.y = brE.y + btnStart.height + 40;
        btnStart.label = "Start";
        btnStart.on(Laya.Event.CLICK, null, StartHandler);

        let btnClear: Button = GetBtn();
        btnClear.x = btnStart.x;
        btnClear.y = btnStart.y + 35;
        btnClear.label = "Clear";
        btnClear.on(Laya.Event.CLICK, null, ClearHandler);

        let btnLeft: Button = GetBtn();
        btnLeft.x = initX;
        btnLeft.y = btnStart.y;
        btnLeft.label = "Left";
        btnLeft.on(Laya.Event.CLICK, null, LeftHandler);

        let btnRight: Button = GetBtn();
        btnRight.x = initX + 150;
        btnRight.y = btnStart.y;
        btnRight.label = "Right";
        btnRight.on(Laya.Event.CLICK, null, RightHandler);

        labPage = new Label();
        labPage.width = 50;
        labPage.height = 30;
        labPage.color = "#ffffff";
        labPage.fontSize = 20;
        labPage.font = "Arial";
        labPage.align = "center";
        labPage.valign = "middle";
        labPage.x = initX + 75;
        labPage.y = btnStart.y;
        sear.stage.addChild(labPage);

        labLog = new Label();
        labLog.width = 200;
        labLog.height = 30;
        labLog.color = "#ff0000";
        labLog.fontSize = 20;
        labLog.font = "Arial";
        labLog.align = "left";
        labLog.valign = "middle";
        labLog.x = initX;
        labLog.y = btnClear.y;
        sear.stage.addChild(labLog);
    }

    function GetEdit(): InputLabel {
        let edit: InputLabel = new InputLabel();
        edit.color = "#000000";
        edit.font = "Arial";
        edit.fontSize = 40;
        edit.width = 50;
        edit.height = 50;
        edit.align = "center";
        edit.valign = "middle";
        edit.restrict = "0-9";
        edit.maxChars = 1;
        edit.bgColor = "#ffffff";
        edit.borderColor = "#000000";
        sear.stage.addChild(edit);
        return edit;
    }

    function GetBtn(): Button {
        let btn: Button = new Button();
        btn.width = 60;
        btn.height = 30;
        btn.labelBold = true;
        btn.labelSize = 22;
        btn.labelColors = "#00ff00,#00ff00,#f6cb38,#5d5a5a";
        sear.stage.addChild(btn);
        return btn;
    }

    function GetEditNums(): number[][] {
        let nums: number[][] = [];
        for (let subList of editList) {
            let list: number[] = [];
            nums.push(list);
            for (let edit of subList) {
                list.push(parseInt(edit.text));
            }
        }
        return nums;
    }

    let pageIdx: number = 0;
    function ShowResult(): void {
        CleanBaseUI();

        if (!result || result.length == 0) {
            labLog.text = "Number Error!";
            return;
        } else if (loopMax <= 0) {
            labLog.text = "Time Over!";
        }

        ShowToEdit(pageIdx);
    }

    function CleanBaseUI(): void {
        pageIdx = -1;
        labPage.text = "";
        labLog.text = "";
    }

    function ShowToEdit(idx: number): void {
        if (!result || result.length == 0) {
            return;
        }

        if (idx < 0) {
            idx = 0;
        } else if (idx + 1 >= result.length) {
            idx = result.length - 1;
        }

        if (pageIdx == idx) {
            return;
        }

        pageIdx = idx;
        labPage.text = (idx + 1) + "/" + result.length;

        let nums: number[][] = result[idx];

        for (let i: number = 0; i < nums.length; ++i) {
            let subs: number[] = nums[i];
            for (let j: number = 0; j < subs.length; ++j) {
                editList[i][j].text = subs[j].toString();
            }
        }
    }

    function ClearEdit(): void {
        for (let iy: number = 0; iy < 9; ++iy) {
            for (let ix: number = 0; ix < 9; ++ix) {
                editList[iy][ix].text = "";
            }
        }
    }

    function StartHandler(): void {
        Calc(GetEditNums());
        ShowResult();
    }

    function ClearHandler(): void {
        CleanBaseUI();
        ClearEdit();
    }

    function LeftHandler(): void {
        if (pageIdx == -1) {
            return;
        }

        ShowToEdit(pageIdx - 1);
    }

    function RightHandler(): void {
        if (pageIdx == -1) {
            return;
        }

        ShowToEdit(pageIdx + 1);
    }
}