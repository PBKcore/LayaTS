module uitool.ui {
    import TreeCtrl = tree.TreeCtrl;

    /**
     * 面板总控件
     * 
     * @author pbk
     */
    export class PanelCtrl {
        // 组件树状图
        private _treeCtrl: TreeCtrl = new TreeCtrl();

        constructor() {

        }

        clear(): void {

        }

        /** 创建一个新面板*/
        newPanel(force: boolean = false): void {
            if (!force && record.isChange()) {
                sysui.SysPrompt.showFast("有修改内容未保存，是否放弃？", this, this.newPanel, [true]);
                return;
            }
            if (!this.fileName){
                mainUI.setPrompt("请先输入面板名");
                return;
            }


        }

        get treeCtrl(): TreeCtrl {
            return this._treeCtrl;
        }

        // =================================================================
        /** 文件名（面板名）*/
        get fileName(): string {
            return mainUI.inputName.text;
        }
        set fileName(value: string) {
            mainUI.inputName.text = value;
        }
    }
}