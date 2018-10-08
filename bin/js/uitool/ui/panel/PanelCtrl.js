var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var panel;
        (function (panel) {
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
                PanelCtrl.prototype.newPanel = function () {
                    sysui.SysPrompt.show("创建不了，请重试", null);
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
                        return "";
                    },
                    enumerable: true,
                    configurable: true
                });
                return PanelCtrl;
            }());
            panel.PanelCtrl = PanelCtrl;
        })(panel = ui.panel || (ui.panel = {}));
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=PanelCtrl.js.map