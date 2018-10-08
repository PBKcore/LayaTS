module uitool.ui {
    import Sprite = sear.Sprite;
    import Event = sear.Event;
    import Layout = sear.ui.Layout;
    import Label = sear.ui.Label;
    import Button = sear.ui.Button;
    import InputLabel = sear.ui.InputLabel;
    import ScrollPanel = sear.ui.ScrollPanel;

    /**
     * 工具主界面UI
     * 
     * @author pbk
     */
    export class MainUI {
        /** 操作UI层*/
        layerFixUI: Sprite;
        /** 面板UI层*/
        layerShow: Sprite;
        /** 顶层UI层*/
        layerTop: Sprite;

        constructor() {
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

        // ======================================================================================
        private _labPrompt: Label;

        private initState(): void {
            let x: number = 0;
            let y: number = 0;
            let w: number = sear.stage.width;
            let h: number = 30;
            this.layerFixUI.graphics.drawLine(x, h, w, h, "0x000000", 1);

            let btnSave: Button = sysui.getButton(100, 28);
            btnSave.label = "Save: Shift+S";
            btnSave.onClick(this, this.onSave);
            this.layerFixUI.addChild(btnSave);

            let labDes: Label = sysui.getLabel(300, 30);
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
        }

        private onSave(): void {
            fileCtrl.save();
        }

        /** 设置提示*/
        setPrompt(str: string): void {
            this._labPrompt.text = str;
        }

        // ======================================================================================
        private initCommonent(): void {
            let x: number = 0;
            let y: number = 30;
            let w: number = 80;
            let h: number = sear.stage.height - y;
            this.layerFixUI.graphics.drawLine(x + w, y, x + w, h + y, "0x000000", 1);

            let layout: Layout = new Layout(x, y, w, h);
            layout.isHorz = false;
            layout.dy = 2;

            let list: config.ComData[] = config.getList();
            for (let data of list) {
                let btn: Button = sysui.getButton(82, 40);
                btn.label = data.name;
                btn.onClick(this, this.onAddUI, [data]);
                this.layerFixUI.addChild(btn);
                layout.addChild(btn);
            }
        }

        private onAddUI(data: config.ComData): void {
            selectCtrl.addComponent(data);
        }

        // ======================================================================================
        inputName: InputLabel;
        private _inputFind: InputLabel;
        scrollTree: ScrollPanel;

        private initTree(): void {
            let x: number = 80;
            let y: number = 30;
            let w: number = 250;
            let h: number = sear.stage.height - y;
            this.layerFixUI.graphics.drawLine(x + w, y, x + w, h + y, "0x000000", 1);

            let layout: Layout = new Layout(x + 5, y + 4, w, h);
            layout.dx = 2;
            layout.dy = 2;

            this.inputName = sysui.getInputLabel(160, 23);
            this.inputName.prompt = "panel name";
            this.layerFixUI.addChild(this.inputName);
            layout.addChild(this.inputName);

            let btnNew: Button = sysui.getButton(82, 25);
            btnNew.label = "New";
            btnNew.onClick(this, this.onNew);
            this.layerFixUI.addChild(btnNew);
            layout.addChild(btnNew);

            this._inputFind = sysui.getInputLabel(160, 25);
            this._inputFind.prompt = "component name";
            this.layerFixUI.addChild(this._inputFind);
            layout.addChild(this._inputFind);

            let btnFind: Button = sysui.getButton(82, 25);
            btnFind.label = "Find";
            btnFind.onClick(this, this.onFind);
            this.layerFixUI.addChild(btnFind);
            layout.addChild(btnFind);

            // -------------------------------------------------------------
            let topH: number = 60;
            this.layerFixUI.graphics.drawLine(x, y + topH, x + w, y + topH, "0x000000", 1);

            this.scrollTree = sysui.getVScrollPanel(w, h - topH);
            this.scrollTree.x = x;
            this.scrollTree.y = y + topH;
            this.layerFixUI.addChild(this.scrollTree);

            // -------------------------------------------------------------
            let btnTop: Button = sysui.getButton(82, 25);
            btnTop.label = "ToTop";
            btnTop.onClick(this, this.onTop);
            this.layerFixUI.addChild(btnTop);
            btnTop.x = 247;
            btnTop.y = 93;

            let btnBottom: Button = sysui.getButton(82, 25);
            btnBottom.label = "ToBottom";
            btnBottom.onClick(this, this.onBottom);
            this.layerFixUI.addChild(btnBottom);
            btnBottom.x = btnTop.x;
            btnBottom.y = btnTop.y + btnTop.height;
        }

        private onNew(): void {
            panelCtrl.newPanel();
        }

        private onTop(): void {
            selectCtrl.toTop();
        }

        private onBottom(): void {
            selectCtrl.toBottom();
        }

        private onFind(): void {
            if (!this._inputFind.text) {
                this.setPrompt("查找失败：请输入组件名");
                return;
            }
            let item: ComponentCtrl = panelCtrl.treeCtrl.find(this._inputFind.text);
            if (!item) {
                this.setPrompt("未找到该组件：" + this._inputFind.text);
                return;
            }
            selectCtrl.select(item, true);
        }

        // ======================================================================================
        private _btnAlign: Button;
        private _btnValign: Button;
        scrollKey: ScrollPanel;

        private initUIValue(): void {
            let w: number = 300;
            let x: number = sear.stage.width - w;
            let y: number = 30;
            let h: number = sear.stage.height - y;
            this.layerFixUI.graphics.drawLine(x, y, x, h + y, "0x000000", 1);

            let layout: Layout = new Layout(x + 3, y + 4, w, h);
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

            let btnOri: Button = sysui.getButton(82, 25);
            btnOri.label = "Original Size";
            btnOri.onClick(this, this.onOri);
            this.layerFixUI.addChild(btnOri);
            layout.addChild(btnOri);

            let topH: number = 30;
            this.scrollKey = sysui.getVScrollPanel(w, h - topH);
            this.scrollKey.x = x;
            this.scrollKey.y = y + topH;
            this.layerFixUI.addChild(this.scrollKey);
        }

        private onAlign(e: Event): void {
            let d3: number = this._btnAlign.width * 0.3;
            if (this._btnAlign.mouseX < d3) {
                selectCtrl.toAlign(Layout.ALIGN_LEFT);
            } else if (this._btnAlign.mouseX > this._btnAlign.width - d3) {
                selectCtrl.toAlign(Layout.ALIGN_RIGHT);
            } else {
                selectCtrl.toAlign(Layout.ALIGN_CENTER);
            }
        }

        private onValign(e: Event): void {
            let d3: number = this._btnValign.width * 0.3;
            if (this._btnValign.mouseX < d3) {
                selectCtrl.toValign(Layout.VALIGN_TOP);
            } else if (this._btnValign.mouseX > this._btnValign.width - d3) {
                selectCtrl.toValign(Layout.VALIGN_BOTTOM);
            } else {
                selectCtrl.toValign(Layout.VALIGN_MIDDLE);
            }
        }

        private onOri(): void {
            selectCtrl.toOriginalSize();
        }
    }
}