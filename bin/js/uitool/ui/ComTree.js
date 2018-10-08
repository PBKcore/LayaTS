var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        /**
         *
         *
         * @author pbk
         */
        var ComTree = /** @class */ (function () {
            function ComTree() {
                // 顶部节点
                this._headNode = null;
                /** 当前选中节点*/
                this._curNode = null;
                // ========================================================================
                // ========================================================================
                this._items = [];
            }
            return ComTree;
        }());
        ui.ComTree = ComTree;
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=ComTree.js.map