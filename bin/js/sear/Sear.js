var sear;
(function (sear) {
    function startupWeb() {
        var width = 1136;
        var height = 640;
        if (sear.Browser.clientWidth > width) {
            width = sear.Browser.clientWidth;
        }
        if (sear.Browser.clientHeight > height) {
            height = sear.Browser.clientHeight;
        }
        startup(width, height);
    }
    sear.startupWeb = startupWeb;
    function startupApp() {
        var width = 1136;
        var height = 640;
        var phyPer = sear.Browser.clientWidth / sear.Browser.clientHeight;
        var desPer = width / height;
        if (sear.Render.isConchApp || !sear.Browser.onPC) {
            if (phyPer > desPer) {
                width = height * phyPer;
            }
            else {
                height = width / phyPer;
            }
        }
        startup(width, height);
        if (sear.Render.isConchApp) {
            sear.stage.scaleMode = sear.Stage.SCALE_SHOWALL;
            sear.stage.screenMode = sear.Stage.SCREEN_HORIZONTAL;
        }
        else if (!sear.Browser.onPC) {
            sear.stage.scaleMode = sear.Stage.SCALE_EXACTFIT;
        }
        else {
            sear.stage.scaleMode = sear.Stage.SCALE_NOSCALE;
        }
    }
    sear.startupApp = startupApp;
    /** 启动引擎*/
    function startup(width, height) {
        Laya.init(width, height, sear.webgl.WebGL);
        sear.stage = Laya.stage;
        sear.stage.alignV = sear.Stage.ALIGN_MIDDLE;
        sear.stage.alignH = sear.Stage.ALIGN_CENTER;
        sear.frame.startup();
        sear.soundex.startup();
    }
    /** 隐藏APP初始启动画面*/
    function hideLoadingView() {
        if (sear.Render.isConchApp) {
            if (sear.Browser.window.loadingView != null) {
                sear.Browser.window.loadingView.loading(100);
            }
        }
    }
    sear.hideLoadingView = hideLoadingView;
})(sear || (sear = {}));
//# sourceMappingURL=Sear.js.map