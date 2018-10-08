var sear;
(function (sear) {
    var utils;
    (function (utils) {
        var ColorFilter = laya.filters.ColorFilter;
        /**
         *
         *
         * @author pbk
         */
        var FilterUtil = /** @class */ (function () {
            function FilterUtil() {
            }
            FilterUtil.addFilter = function (target, filter) {
                if (!target || !filter) {
                    return;
                }
                var filters = target.filters;
                if (!filters) {
                    filters = [filter];
                }
                else {
                    if (filters.indexOf(filter) != -1) {
                        return;
                    }
                    filters.push(filter);
                }
                target.filters = filters;
            };
            FilterUtil.delFilter = function (target, filter) {
                if (!target || !filter || !target.filters) {
                    return;
                }
                var idx = target.filters.indexOf(filter);
                if (idx != -1) {
                    var filters = target.filters;
                    filters.splice(idx, 1);
                    target.filters = filters;
                }
            };
            /** 高亮滤镜*/
            FilterUtil.getHightLight = function () {
                if (!FilterUtil._highLight) {
                    FilterUtil._highLight = new ColorFilter([
                        1.6, 0, 0, 0, 0,
                        0, 1.6, 0, 0, 0,
                        0, 0, 1.6, 0, 0,
                        0, 0, 0, 1, 0
                    ]);
                }
                return FilterUtil._highLight;
            };
            /** 灰色滤镜*/
            FilterUtil.getGrayFilter = function () {
                return laya.ui.UIUtils["grayFilter"];
            };
            FilterUtil._highLight = null;
            return FilterUtil;
        }());
        utils.FilterUtil = FilterUtil;
    })(utils = sear.utils || (sear.utils = {}));
})(sear || (sear = {}));
//# sourceMappingURL=FilterUtil.js.map