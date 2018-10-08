var sear;
(function (sear) {
    var webgl;
    (function (webgl) {
        /**
         *
         *
         * @author pbk
         */
        var WebGL = /** @class */ (function () {
            function WebGL() {
            }
            WebGL.enable = function () {
                if (laya.webgl.WebGL.enable()) {
                    laya.resource.HTMLImage.create = function (src, def) {
                        if (def === void 0) { def = null; }
                        return new laya.webgl.resource.WebGLImage(src, def, laya.webgl.WebGLContext.RGBA, false);
                    };
                    return true;
                }
                return false;
            };
            return WebGL;
        }());
        webgl.WebGL = WebGL;
    })(webgl = sear.webgl || (sear.webgl = {}));
})(sear || (sear = {}));
//# sourceMappingURL=WebGL.js.map