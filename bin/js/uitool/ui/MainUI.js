var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var Sprite = sear.Sprite;
        var Layout = sear.ui.Layout;
        /**
         * 工具主界面UI
         *
         * @author pbk
         */
        var MainUI = /** @class */ (function () {
            function MainUI() {
                this.layerFixUI = new Sprite();
                sear.stage.addChild(this.layerFixUI);
                this.layerShow = new Sprite();
                this.layerShow.x = 330;
                sear.stage.addChild(this.layerShow);
                this.layerTop = new Sprite();
                sear.stage.addChild(this.layerTop);
                this.initState();
                this.initCommonent();
                this.initTree();
                this.initUIValue();
            }
            MainUI.prototype.initState = function () {
                var x = 0;
                var y = 0;
                var w = sear.stage.width;
                var h = 30;
                this.layerFixUI.graphics.drawLine(x, h, w, h, "0x000000", 1);
                var btnSave = sysui.getButton(100, 28);
                btnSave.label = "Save: Shift+S";
                btnSave.onClick(this, this.onSave);
                this.layerFixUI.addChild(btnSave);
                var labDes = sysui.getLabel(300, 30);
                labDes.fontSize = 16;
                labDes.bold = true;
                labDes.text = "Open: Shift+Q";
                labDes.x = 110;
                labDes.y = 5;
                this.layerFixUI.addChild(labDes);
                this._labPrompt = sysui.getLabel(800, 30);
                this._labPrompt.x = 330;
                this._labPrompt.y = 2;
                this._labPrompt.fontSize = 14;
                this._labPrompt.color = "#ff0000";
                this.layerFixUI.addChild(this._labPrompt);
            };
            MainUI.prototype.onSave = function () {
                uitool.fileCtrl.save();
            };
            /** 设置提示*/
            MainUI.prototype.setPrompt = function (str) {
                this._labPrompt.text = str;
            };
            // ======================================================================================
            MainUI.prototype.initCommonent = function () {
                var x = 0;
                var y = 30;
                var w = 80;
                var h = sear.stage.height - y;
                this.layerFixUI.graphics.drawLine(x + w, y, x + w, h + y, "0x000000", 1);
                var layout = new Layout(x, y, w, h);
                layout.isHorz = false;
                layout.dy = 2;
                var list = uitool.config.getList();
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var data = list_1[_i];
                    var btn = sysui.getButton(82, 40);
                    btn.label = data.name;
                    btn.onClick(this, this.onAddUI, [data]);
                    this.layerFixUI.addChild(btn);
                    layout.addChild(btn);
                }
            };
            MainUI.prototype.onAddUI = function (data) {
                uitool.selectCtrl.addComponent(data);
            };
            MainUI.prototype.initTree = function () {
                var x = 80;
                var y = 30;
                var w = 250;
                var h = sear.stage.height - y;
                this.layerFixUI.graphics.drawLine(x + w, y, x + w, h + y, "0x000000", 1);
                var layout = new Layout(x + 5, y + 4, w, h);
                layout.dx = 2;
                layout.dy = 2;
                this.inputName = sysui.getInputLabel(160, 23);
                this.inputName.prompt = "panel name";
                this.layerFixUI.addChild(this.inputName);
                layout.addChild(this.inputName);
                var btnNew = sysui.getButton(82, 25);
                btnNew.label = "New";
                btnNew.onClick(this, this.onNew);
                this.layerFixUI.addChild(btnNew);
                layout.addChild(btnNew);
                this._inputFind = sysui.getInputLabel(160, 25);
                this._inputFind.prompt = "component name";
                this.layerFixUI.addChild(this._inputFind);
                layout.addChild(this._inputFind);
                var btnFind = sysui.getButton(82, 25);
                btnFind.label = "Find";
                btnFind.onClick(this, this.onFind);
                this.layerFixUI.addChild(btnFind);
                layout.addChild(btnFind);
                // -------------------------------------------------------------
                var topH = 60;
                this.layerFixUI.graphics.drawLine(x, y + topH, x + w, y + topH, "0x000000", 1);
                this.scrollTree = sysui.getVScrollPanel(w, h - topH);
                this.scrollTree.x = x;
                this.scrollTree.y = y + topH;
                this.layerFixUI.addChild(this.scrollTree);
                // -------------------------------------------------------------
                var btnTop = sysui.getButton(82, 25);
                btnTop.label = "ToTop";
                btnTop.onClick(this, this.onTop);
                this.layerFixUI.addChild(btnTop);
                btnTop.x = 247;
                btnTop.y = 93;
                var btnBottom = sysui.getButton(82, 25);
                btnBottom.label = "ToBottom";
                btnBottom.onClick(this, this.onBottom);
                this.layerFixUI.addChild(btnBottom);
                btnBottom.x = btnTop.x;
                btnBottom.y = btnTop.y + btnTop.height;
            };
            MainUI.prototype.onNew = function () {
                uitool.panelCtrl.newPanel();
            };
            MainUI.prototype.onTop = function () {
                uitool.selectCtrl.toTop();
            };
            MainUI.prototype.onBottom = function () {
                uitool.selectCtrl.toBottom();
            };
            MainUI.prototype.onFind = function () {
                if (!this._inputFind.text) {
                    this.setPrompt("查找失败：请输入组件名");
                    return;
                }
                var item = uitool.panelCtrl.treeCtrl.find(this._inputFind.text);
                if (!item) {
                    this.setPrompt("未找到该组件：" + this._inputFind.text);
                    return;
                }
                uitool.selectCtrl.select(item, true);
            };
            MainUI.prototype.initUIValue = function () {
                var w = 300;
                var x = sear.stage.width - w;
                var y = 30;
                var h = sear.stage.height - y;
                this.layerFixUI.graphics.drawLine(x, y, x, h + y, "0x000000", 1);
                var layout = new Layout(x + 3, y + 4, w, h);
                layout.dx = 2;
                layout.dy = 2;
                this._btnAlign = sysui.getButton(82, 25);
                this._btnAlign.label = "L Center R";
                this._btnAlign.onClick(this, this.onAlign);
                this.layerFixUI.addChild(this._btnAlign);
                layout.addChild(this._btnAlign);
                this._btnValign = sysui.getButton(82, 25);
                this._btnValign.label = "T Middle B";
                this._btnValign.onClick(this, this.onValign);
                this.layerFixUI.addChild(this._btnValign);
                layout.addChild(this._btnValign);
                var btnOri = sysui.getButton(82, 25);
                btnOri.label = "Original Size";
                btnOri.onClick(this, this.onOri);
                this.layerFixUI.addChild(btnOri);
                layout.addChild(btnOri);
                var topH = 30;
                this.scrollKey = sysui.getVScrollPanel(w, h - topH);
                this.scrollKey.x = x;
                this.scrollKey.y = y + topH;
                this.layerFixUI.addChild(this.scrollKey);
            };
            MainUI.prototype.onAlign = function (e) {
                var d3 = this._btnAlign.width * 0.3;
                if (this._btnAlign.mouseX < d3) {
                    uitool.selectCtrl.toAlign(Layout.ALIGN_LEFT);
                }
                else if (this._btnAlign.mouseX > this._btnAlign.width - d3) {
                    uitool.selectCtrl.toAlign(Layout.ALIGN_RIGHT);
                }
                else {
                    uitool.selectCtrl.toAlign(Layout.ALIGN_CENTER);
                }
            };
            MainUI.prototype.onValign = function (e) {
                var d3 = this._btnValign.width * 0.3;
                if (this._btnValign.mouseX < d3) {
                    uitool.selectCtrl.toValign(Layout.VALIGN_TOP);
                }
                else if (this._btnValign.mouseX > this._btnValign.width - d3) {
                    uitool.selectCtrl.toValign(Layout.VALIGN_BOTTOM);
                }
                else {
                    uitool.selectCtrl.toValign(Layout.VALIGN_MIDDLE);
                }
            };
            MainUI.prototype.onOri = function () {
                uitool.selectCtrl.toOriginalSize();
            };
            return MainUI;
        }());
        ui.MainUI = MainUI;
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=MainUI.js.map