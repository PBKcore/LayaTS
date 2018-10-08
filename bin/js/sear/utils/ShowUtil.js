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
        var ShowUtil = /** @class */ (function () {
            function ShowUtil() {
            }
            ShowUtil.getSprite = function (url, width, height, cacheAs, completeCaller, completeMethod) {
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                if (cacheAs === void 0) { cacheAs = "none"; }
                if (completeCaller === void 0) { completeCaller = null; }
                if (completeMethod === void 0) { completeMethod = null; }
                var sprite = new sear.Sprite();
                sprite.width = width;
                sprite.height = height;
                sprite.cacheAs = cacheAs;
                sprite.loadImage(url, 0, 0, width, height, !completeMethod ? null : Laya.Handler.create(completeCaller, completeMethod, null, true));
                return sprite;
            };
            /**
             * 克隆Sprite（仅基本描述信息）
             * @param og
             * @param ret
             */
            ShowUtil.cloneSprite = function (og, ret) {
                ret || (ret = new sear.Sprite());
                ret.width = og.width;
                ret.height = og.height;
                ret.x = og.x;
                ret.y = og.y;
                ret.scaleX = og.scaleX;
                ret.scaleY = og.scaleY;
                ret.rotation = og.rotation;
                ret.visible = og.visible;
                ret.cacheAs = og.cacheAs;
                ret.staticCache = og.staticCache;
                return ret;
            };
            ShowUtil.cloneComponent = function (og, ret) {
                ret || (ret = new sear.Component());
                ShowUtil.cloneSprite(og, ret);
                ret.tag = og.tag;
                ret.toolTip = og.toolTip;
                return ret;
            };
            // ==================================================================================
            ShowUtil.toTop = function (node) {
                if (!node || !node.parent) {
                    return;
                }
                var idx = node.parent.numChildren - 1;
                if (node.parent.getChildIndex(node) != idx) {
                    node.parent.setChildIndex(node, idx);
                }
            };
            ShowUtil.toBottom = function (node) {
                if (!node || !node.parent) {
                    return;
                }
                if (node.parent.getChildIndex(node) != 0) {
                    node.setChildIndex(node, 0);
                }
            };
            /**
             * 获取指定对象到父对象的相对位置（注意：返回是临时变量，勿存储使用）
             * @param target
             * @param parent 默认时舞台根容器。若不存在层级关系，则返回默认容器结果
             */
            ShowUtil.relativePos = function (target, parent) {
                if (parent === void 0) { parent = null; }
                parent || (parent = sear.stage);
                var ret = Point.TEMP;
                while (target != null && target != parent) {
                    ret.x += target.x;
                    ret.y += target.y;
                    target = target.parent;
                }
                return ret;
            };
            return ShowUtil;
        }());
        utils.ShowUtil = ShowUtil;
    })(utils = sear.utils || (sear.utils = {}));
})(sear || (sear = {}));
//# sourceMappingURL=ShowUtil.js.map