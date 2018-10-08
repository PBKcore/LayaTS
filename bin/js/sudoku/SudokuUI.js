var suduku;
(function (suduku) {
    var InputLabel = sear.ui.InputLabel;
    var Label = sear.ui.Label;
    var Button = sear.ui.Button;
    var editList;
    var labPage;
    var labLog;
    function Main() {
        sear.startupApp();
        var max = 9;
        var off = 10;
        var initY = 10;
        var initX = (sear.stage.width - (max * 50 + (max - 1) * off)) * 0.5;
        off += 50;
        editList = [];
        for (var iy = 0; iy < max; ++iy) {
            var xlist = [];
            editList.push(xlist);
            for (var ix = 0; ix < max; ++ix) {
                var edit = GetEdit();
                edit.x = initX + ix * off;
                edit.y = initY + iy * off;
                xlist.push(edit);
            }
        }
        var brE = editList[max - 1][max - 1];
        var btnStart = GetBtn();
        btnStart.x = brE.x - btnStart.width;
        btnStart.y = brE.y + btnStart.height + 40;
        btnStart.label = "Start";
        btnStart.on(Laya.Event.CLICK, null, StartHandler);
        var btnClear = GetBtn();
        btnClear.x = btnStart.x;
        btnClear.y = btnStart.y + 35;
        btnClear.label = "Clear";
        btnClear.on(Laya.Event.CLICK, null, ClearHandler);
        var btnLeft = GetBtn();
        btnLeft.x = initX;
        btnLeft.y = btnStart.y;
        btnLeft.label = "Left";
        btnLeft.on(Laya.Event.CLICK, null, LeftHandler);
        var btnRight = GetBtn();
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
    suduku.Main = Main;
    function GetEdit() {
        var edit = new InputLabel();
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
    function GetBtn() {
        var btn = new Button();
        btn.width = 60;
        btn.height = 30;
        btn.labelBold = true;
        btn.labelSize = 22;
        btn.labelColors = "#00ff00,#00ff00,#f6cb38,#5d5a5a";
        sear.stage.addChild(btn);
        return btn;
    }
    function GetEditNums() {
        var nums = [];
        for (var _i = 0, editList_1 = editList; _i < editList_1.length; _i++) {
            var subList = editList_1[_i];
            var list = [];
            nums.push(list);
            for (var _a = 0, subList_1 = subList; _a < subList_1.length; _a++) {
                var edit = subList_1[_a];
                list.push(parseInt(edit.text));
            }
        }
        return nums;
    }
    var pageIdx = 0;
    function ShowResult() {
        CleanBaseUI();
        if (!suduku.result || suduku.result.length == 0) {
            labLog.text = "Number Error!";
            return;
        }
        else if (suduku.loopMax <= 0) {
            labLog.text = "Time Over!";
        }
        ShowToEdit(pageIdx);
    }
    function CleanBaseUI() {
        pageIdx = -1;
        labPage.text = "";
        labLog.text = "";
    }
    function ShowToEdit(idx) {
        if (!suduku.result || suduku.result.length == 0) {
            return;
        }
        if (idx < 0) {
            idx = 0;
        }
        else if (idx + 1 >= suduku.result.length) {
            idx = suduku.result.length - 1;
        }
        if (pageIdx == idx) {
            return;
        }
        pageIdx = idx;
        labPage.text = (idx + 1) + "/" + suduku.result.length;
        var nums = suduku.result[idx];
        for (var i = 0; i < nums.length; ++i) {
            var subs = nums[i];
            for (var j = 0; j < subs.length; ++j) {
                editList[i][j].text = subs[j].toString();
            }
        }
    }
    function ClearEdit() {
        for (var iy = 0; iy < 9; ++iy) {
            for (var ix = 0; ix < 9; ++ix) {
                editList[iy][ix].text = "";
            }
        }
    }
    function StartHandler() {
        suduku.Calc(GetEditNums());
        ShowResult();
    }
    function ClearHandler() {
        CleanBaseUI();
        ClearEdit();
    }
    function LeftHandler() {
        if (pageIdx == -1) {
            return;
        }
        ShowToEdit(pageIdx - 1);
    }
    function RightHandler() {
        if (pageIdx == -1) {
            return;
        }
        ShowToEdit(pageIdx + 1);
    }
})(suduku || (suduku = {}));
//# sourceMappingURL=SudokuUI.js.map