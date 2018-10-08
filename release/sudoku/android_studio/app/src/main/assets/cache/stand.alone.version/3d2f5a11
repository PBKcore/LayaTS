var Sear;
(function (Sear) {
    /** 启动引擎*/
    function Startup(width, height) {
        if (width === void 0) { width = 1136; }
        if (height === void 0) { height = 640; }
        var phyPer = Laya.Browser.clientWidth / Laya.Browser.clientHeight;
        var desPer = width / height;
        if (Laya.Render.isConchApp || !Laya.Browser.onPC) {
            if (phyPer > desPer) {
                width = height * phyPer;
            }
            else {
                height = width / phyPer;
            }
        }
        Laya.init(width, height, Laya.WebGL);
        Sear.stage = Laya.stage;
        Sear.stage.alignV = Sear.Stage.ALIGN_MIDDLE;
        Sear.stage.alignH = Sear.Stage.ALIGN_CENTER;
        if (Laya.Render.isConchApp) {
            Sear.stage.scaleMode = Sear.Stage.SCALE_SHOWALL;
            Sear.stage.screenMode = Sear.Stage.SCREEN_HORIZONTAL;
        }
        else if (!Laya.Browser.onPC) {
            Sear.stage.scaleMode = Sear.Stage.SCALE_EXACTFIT;
        }
        else {
            Sear.stage.scaleMode = Sear.Stage.SCALE_NOSCALE;
        }
        Sear.stage.bgColor = "#232628";
        sear.frame.Startup();
        Sear.SoundMgr.Startup();
    }
    Sear.Startup = Startup;
    /**
     * 获取类名
     * @param target 支持：类型、对象
     */
    function GetClassName(target) {
        if (!target["constructor"] && target["prototype"]) {
            // 初步判定：实例有constructor属性，没有prototype属性
            target = target["constructor"];
        }
        return target["name"];
    }
    Sear.GetClassName = GetClassName;
})(Sear || (Sear = {}));
//# sourceMappingURL=Global.js.map