var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var TreeCtrl = ui.tree.TreeCtrl;
        /**
         * 面板总控件
         *
         * @author pbk
         */
        var PanelCtrl = /** @class */ (function () {
            function PanelCtrl() {
                // 组件树状图
                this._treeCtrl = new TreeCtrl();
            }
            PanelCtrl.prototype.clear = function () {
            };
            /** 创建一个新面板*/
            PanelCtrl.prototype.newPanel = function (force) {
                if (force === void 0) { force = false; }
                if (!force && uitool.record.isChange()) {
                    sysui.SysPrompt.showFast("有修改内容未保存，是否放弃？", this, this.newPanel, [true]);
                    return;
                }
                if (!this.fileName) {
                    uitool.mainUI.setPrompt("请先输入面板名");
                    return;
                }
            };
            Object.defineProperty(PanelCtrl.prototype, "treeCtrl", {
                get: function () {
                    return this._treeCtrl;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanelCtrl.prototype, "fileName", {
                // =================================================================
                /** 文件名（面板名）*/
                get: function () {
                    return uitool.mainUI.inputName.text;
                },
                set: function (value) {
                    uitool.mainUI.inputName.text = value;
                },
                enumerable: true,
                configurable: true
            });
            return PanelCtrl;
        }());
        ui.PanelCtrl = PanelCtrl;
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=PanelCtrl.js.map