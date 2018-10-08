module uitool {
    export let mainUI: ui.MainUI;

    /** 文件控制*/
    export let fileCtrl: file.FileCtrl;
    /** 面板控制*/
    export let panelCtrl: ui.PanelCtrl;
    /** 当前选择的组件*/
    export let selectCtrl: ui.SelectCtrl;
    /** 组件属性管理*/
    export let keyCtrl :ui.comkey.KeyCtrl;

    /** 是否按下Ctrl键*/
    export let isCtrl: boolean = false;

    // 提示接口：mainUI.SetPrompt("");

    /**
     * UI面板编辑器
     * 
     * @author pbk
     */
    export class UITool {

        constructor() {
            sear.startupWeb();
            sear.stage.bgColor = "#ffffff";

            fileCtrl = new file.FileCtrl();
            panelCtrl = new ui.PanelCtrl();
            selectCtrl = new ui.SelectCtrl();
            keyCtrl = new ui.comkey.KeyCtrl();

            mainUI = new ui.MainUI();

            sear.stage.on(sear.Event.KEY_DOWN, this, this.onKeyDown);
            sear.stage.on(sear.Event.KEY_UP, this, this.onKeyUp);
        }

        private onKeyDown(e: KeyboardEvent): void {
            isCtrl = e.ctrlKey;

            if (e.shiftKey) {
                // 全在shift，避免和浏览器和组件操作冲突
                switch (e.keyCode) {
                    case sear.Keyboard.S:// 保存
                        fileCtrl.save();
                        break;
                    case sear.Keyboard.Q:// 打开文件
                        fileCtrl.open();
                        break;
                    case sear.Keyboard.D:// 删除组件
                        selectCtrl.delete();
                        break;
                    case sear.Keyboard.Z:// 撤销
                        record.ctrlZRevert();
                        break;
                    case sear.Keyboard.Y:// 还原
                        record.ctrlYReturn();
                        break;
                    case sear.Keyboard.X:// 剪切组件
                        selectCtrl.cut();
                        break;
                    case sear.Keyboard.C:// 复制组件
                        selectCtrl.copy();
                        break;
                    case sear.Keyboard.V:// 粘贴组件
                        selectCtrl.paste();
                        break;
                }
            } else {
                switch (e.keyCode) {
                    case sear.Keyboard.DELETE:// 删除组件
                        selectCtrl.delete();
                        break;
                    case sear.Keyboard.UP:// 向上移动
                        selectCtrl.moveUp();
                        break;
                    case sear.Keyboard.DOWN:// 向下移动
                        selectCtrl.moveDown();
                        break;
                    case sear.Keyboard.LEFT:// 向左移动
                        selectCtrl.moveLeft();
                        break;
                    case sear.Keyboard.RIGHT:// 向右移动
                        selectCtrl.moveRight();
                        break;
                }
            }
            e.stopPropagation();
        }

        private onKeyUp(e: KeyboardEvent): void {
            isCtrl = e.ctrlKey;
        }
    }
}