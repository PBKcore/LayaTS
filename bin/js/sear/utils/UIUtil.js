var sear;
(function (sear) {
    var utils;
    (function (utils) {
        /**
         *
         *
         * @author pbk
         */
        var UIUtil = /** @class */ (function () {
            function UIUtil() {
            }
            UIUtil.getSprite = function (url, width, height, cacheAs, completeCaller, completeMethod) {
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
            return UIUtil;
        }());
        utils.UIUtil = UIUtil;
    })(utils = sear.utils || (sear.utils = {}));
})(sear || (sear = {}));
//# sourceMappingURL=UIUtil.js.map