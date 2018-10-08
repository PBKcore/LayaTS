var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var panel;
        (function (panel) {
            var ComKeyCtrl = ui.comkey.ComKeyCtrl;
            /**
             * 选中组件相关控制
             *
             * @author pbk
             */
            var SelectCtrl = /** @class */ (function () {
                function SelectCtrl() {
                    this._selectList = [];
                    this._keyCtrl = new ComKeyCtrl();
                }
                SelectCtrl.prototype.select = function (item) {
                    if (!item) {
                        return;
                    }
                    if (this._selectList.indexOf(item) != -1) {
                        return; // 重复
                    }
                    this._selectList.push(item);
                    item.selected = true;
                    this.updateKeyCtrl();
                };
                SelectCtrl.prototype.unselect = function (item) {
                    if (!item) {
                        return;
                    }
                    if (!sear.arrayDelete(this._selectList, item)) {
                        return;
                    }
                    item.selected = false;
                    this.updateKeyCtrl();
                };
                /** 取消所有选择*/
                SelectCtrl.prototype.cancel = function () {
                    this._selectList.length = 0;
                    this.updateKeyCtrl();
                };
                Object.defineProperty(SelectCtrl.prototype, "onlyOne", {
                    get: function () {
                        return this._selectList.length == 1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectCtrl.prototype, "targetCtrl", {
                    get: function () {
                        return this._selectList[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                SelectCtrl.prototype.updateKeyCtrl = function () {
                    if (this.onlyOne) {
                        this._keyCtrl.setItemCtrl(this.targetCtrl.comItemCtrl);
                    }
                    else {
                        this._keyCtrl.setItemCtrl(null);
                    }
                };
                // ==================================================================================
                /** 添加组件*/
                SelectCtrl.prototype.addComponent = function (data) {
                };
                // ==================================================================================
                /** 删除组件*/
                SelectCtrl.prototype.delete = function () {
                    uitool.mainUI.setPrompt("delete");
                    if (!this.onlyOne) {
                        return;
                    }
                };
                // ==================================================================================
                /** 剪切组件*/
                SelectCtrl.prototype.cut = function () {
                    uitool.mainUI.setPrompt("cut");
                };
                /** 复制组件*/
                SelectCtrl.prototype.copy = function () {
                    uitool.mainUI.setPrompt("copy");
                };
                /** 粘贴组件*/
                SelectCtrl.prototype.paste = function () {
                    uitool.mainUI.setPrompt("paste");
                };
                // ==================================================================================
                /** 组件层级前移*/
                SelectCtrl.prototype.toTop = function () {
                };
                /** 组件层次后移*/
                SelectCtrl.prototype.toBottom = function () {
                };
                SelectCtrl.prototype.toAlign = function (align) {
                };
                SelectCtrl.prototype.toValign = function (valign) {
                };
                SelectCtrl.prototype.toOriginalSize = function () {
                };
                // ==================================================================================
                SelectCtrl.prototype.moveUp = function () {
                };
                SelectCtrl.prototype.moveDown = function () {
                };
                SelectCtrl.prototype.moveLeft = function () {
                };
                SelectCtrl.prototype.moveRight = function () {
                };
                return SelectCtrl;
            }());
            panel.SelectCtrl = SelectCtrl;
        })(panel = ui.panel || (ui.panel = {}));
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=SelectCtrl.js.map