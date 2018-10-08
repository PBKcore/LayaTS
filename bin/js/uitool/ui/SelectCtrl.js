var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        /**
         * 选中组件相关控制
         *
         * @author pbk
         */
        var SelectCtrl = /** @class */ (function () {
            function SelectCtrl() {
                this._selectList = [];
                // ==================================================================================
                this._saveComCtrl = [];
            }
            SelectCtrl.prototype.select = function (item, only) {
                if (!item) {
                    return;
                }
                if (only) {
                    this.cancel();
                }
                else {
                    if (this._selectList.indexOf(item) != -1) {
                        return; // 重复
                    }
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
                for (var _i = 0, _a = this._selectList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.selected = false;
                }
                this._selectList.length = 0;
                this.updateKeyCtrl();
            };
            Object.defineProperty(SelectCtrl.prototype, "isSelect", {
                get: function () {
                    return this._selectList.length > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SelectCtrl.prototype, "onlyOne", {
                get: function () {
                    return this._selectList.length == 1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SelectCtrl.prototype, "targetCtrl", {
                get: function () {
                    return this.isSelect ? this._selectList[0] : null;
                },
                enumerable: true,
                configurable: true
            });
            // ==================================================================================
            SelectCtrl.prototype.updateKeyCtrl = function () {
                if (this.onlyOne) {
                    uitool.keyCtrl.setComCtrl(this.targetCtrl);
                }
                else {
                    uitool.keyCtrl.setComCtrl(null);
                }
            };
            // ==================================================================================
            /** 添加组件*/
            SelectCtrl.prototype.addComponent = function (data) {
                uitool.record.recordNew();
                var item = new ui.ComponentCtrl(data);
                uitool.panelCtrl.treeCtrl.addNode(item, this.targetCtrl);
                this.select(item, true);
            };
            // ==================================================================================
            /** 删除组件*/
            SelectCtrl.prototype.delete = function () {
                if (!this.isSelect) {
                    return;
                }
                uitool.record.recordNew();
                for (var _i = 0, _a = this._selectList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.removeSelf();
                }
                this.cancel();
            };
            /** 剪切组件*/
            SelectCtrl.prototype.cut = function () {
                if (!this.isSelect) {
                    return;
                }
                this._saveComCtrl.length = 0;
                for (var _i = 0, _a = this._selectList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (this.hasSelectParent(item)) {
                        continue;
                    }
                    item.removeSelf();
                    this._saveComCtrl.push(item);
                }
            };
            SelectCtrl.prototype.hasSelectParent = function (child) {
                for (var _i = 0, _a = this._selectList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (this.isParent(child, item)) {
                        return false;
                    }
                }
                return true;
            };
            SelectCtrl.prototype.isParent = function (child, parent) {
                if (!child || !parent) {
                    return false;
                }
                while (child) {
                    if (child.parent == parent) {
                        return true;
                    }
                    child = child.parent;
                }
                return false;
            };
            /** 复制组件*/
            SelectCtrl.prototype.copy = function () {
                if (!this.isSelect) {
                    return;
                }
                this._saveComCtrl.length = 0;
                for (var _i = 0, _a = this._selectList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    this._saveComCtrl.push(item.clone());
                }
            };
            /** 粘贴组件*/
            SelectCtrl.prototype.paste = function () {
                if (this._saveComCtrl.length == 0) {
                    return;
                }
                uitool.record.recordNew();
                this._saveComCtrl.sort();
                for (var _i = 0, _a = this._saveComCtrl; _i < _a.length; _i++) {
                    var item = _a[_i];
                    uitool.panelCtrl.treeCtrl.addNode(item, this.targetCtrl);
                }
            };
            // ==================================================================================
            /** 组件层级前移*/
            SelectCtrl.prototype.toTop = function () {
                if (!this.onlyOne) {
                    uitool.mainUI.setPrompt("仅能操作单个组件");
                    return;
                }
                uitool.record.recordNew();
                this.targetCtrl.toTop();
            };
            /** 组件层次后移*/
            SelectCtrl.prototype.toBottom = function () {
                if (!this.onlyOne) {
                    uitool.mainUI.setPrompt("仅能操作单个组件");
                    return;
                }
                uitool.record.recordNew();
                this.targetCtrl.toBottom();
            };
            // ==================================================================================
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
            // ==================================================================================
            SelectCtrl.prototype.dragStart = function (ctrl) {
            };
            SelectCtrl.prototype.dragEnd = function (ctrl) {
            };
            return SelectCtrl;
        }());
        ui.SelectCtrl = SelectCtrl;
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=SelectCtrl.js.map