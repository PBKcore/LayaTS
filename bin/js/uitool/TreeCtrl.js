var uitool;
(function (uitool) {
    /**
     * 组件节点树控制（增删查改）
     *
     * @author pbk
     */
    var TreeCtrl = /** @class */ (function () {
        function TreeCtrl() {
        }
        Object.defineProperty(TreeCtrl.prototype, "scroll", {
            /** 滚动容器*/
            get: function () {
                return uitool.mainUI.scrollTree;
            },
            enumerable: true,
            configurable: true
        });
        // ==================================================================================
        /** 组件层级前移*/
        TreeCtrl.prototype.toTop = function () {
        };
        /** 组件层次后移*/
        TreeCtrl.prototype.toBottom = function () {
        };
        /** 根据名字查找组件*/
        TreeCtrl.prototype.find = function (name) {
        };
        return TreeCtrl;
    }());
    uitool.TreeCtrl = TreeCtrl;
})(uitool || (uitool = {}));
//# sourceMappingURL=TreeCtrl.js.map