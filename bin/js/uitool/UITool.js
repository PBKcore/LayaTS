var uitool;
(function (uitool) {
    /** 是否按下Ctrl键*/
    uitool.isCtrl = false;
    // 提示接口：mainUI.SetPrompt("");
    /**
     * UI面板编辑器
     *
     * @author pbk
     */
    var UITool = /** @class */ (function () {
        function UITool() {
            sear.startupWeb();
            sear.stage.bgColor = "#ffffff";
            uitool.fileCtrl = new uitool.file.FileCtrl();
            uitool.panelCtrl = new uitool.ui.PanelCtrl();
            uitool.selectCtrl = new uitool.ui.SelectCtrl();
            uitool.keyCtrl = new uitool.ui.comkey.KeyCtrl();
            uitool.mainUI = new uitool.ui.MainUI();
            sear.stage.on(sear.Event.KEY_DOWN, this, this.onKeyDown);
            sear.stage.on(sear.Event.KEY_UP, this, this.onKeyUp);
        }
        UITool.prototype.onKeyDown = function (e) {
            uitool.isCtrl = e.ctrlKey;
            if (e.shiftKey) {
                // 全在shift，避免和浏览器和组件操作冲突
                switch (e.keyCode) {
                    case sear.Keyboard.S: // 保存
                        uitool.fileCtrl.save();
                        break;
                    case sear.Keyboard.Q: // 打开文件
                        uitool.fileCtrl.open();
                        break;
                    case sear.Keyboard.D: // 删除组件
                        uitool.selectCtrl.delete();
                        break;
                    case sear.Keyboard.Z: // 撤销
                        uitool.record.ctrlZRevert();
                        break;
                    case sear.Keyboard.Y: // 还原
                        uitool.record.ctrlYReturn();
                        break;
                    case sear.Keyboard.X: // 剪切组件
                        uitool.selectCtrl.cut();
                        break;
                    case sear.Keyboard.C: // 复制组件
                        uitool.selectCtrl.copy();
                        break;
                    case sear.Keyboard.V: // 粘贴组件
                        uitool.selectCtrl.paste();
                        break;
                }
            }
            else {
                switch (e.keyCode) {
                    case sear.Keyboard.DELETE: // 删除组件
                        uitool.selectCtrl.delete();
                        break;
                    case sear.Keyboard.UP: // 向上移动
                        uitool.selectCtrl.moveUp();
                        break;
                    case sear.Keyboard.DOWN: // 向下移动
                        uitool.selectCtrl.moveDown();
                        break;
                    case sear.Keyboard.LEFT: // 向左移动
                        uitool.selectCtrl.moveLeft();
                        break;
                    case sear.Keyboard.RIGHT: // 向右移动
                        uitool.selectCtrl.moveRight();
                        break;
                }
            }
            e.stopPropagation();
        };
        UITool.prototype.onKeyUp = function (e) {
            uitool.isCtrl = e.ctrlKey;
        };
        return UITool;
    }());
    uitool.UITool = UITool;
})(uitool || (uitool = {}));
//# sourceMappingURL=UITool.js.map