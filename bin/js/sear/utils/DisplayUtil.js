var sear;
(function (sear) {
    var utils;
    (function (utils) {
        var Point = sear.maths.Point;
        /**
         * 显示工具（针对Sprite和Node的接口）
         *
         * @author pbk
         */
        var DisplayUtil = /** @class */ (function () {
            function DisplayUtil() {
            }
            DisplayUtil.toTop = function (node) {
                if (!node || !node.parent) {
                    return;
                }
                var idx = node.parent.numChildren - 1;
                if (node.parent.getChildIndex(node) != idx) {
                    node.parent.setChildIndex(node, idx);
                }
            };
            DisplayUtil.toBottom = function (node) {
                if (!node || !node.parent) {
                    return;
                }
                if (node.parent.getChildIndex(node) != 0) {
                    node.setChildIndex(node, 0);
                }
            };
            DisplayUtil.getRelativePos = function (curSpr, toSpr) {
                var pos = new Point();
                while (curSpr != null && curSpr != toSpr) {
                    pos.x += curSpr.x;
                    pos.y += curSpr.y;
                    curSpr = curSpr.parent;
                }
                return pos;
            };
            /**
             * 获取对象的子对象树
             * @param target
             */
            DisplayUtil.getChildsTree = function (target) {
                if (!target) {
                    return null;
                }
                var tree = [];
                return tree;
            };
            return DisplayUtil;
        }());
        utils.DisplayUtil = DisplayUtil;
    })(utils = sear.utils || (sear.utils = {}));
})(sear || (sear = {}));
//# sourceMappingURL=DisplayUtil.js.map