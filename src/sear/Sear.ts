module sear {
    /* 
    重写父类get set；必须两个都一起重写，不然没写的会找不到
    函数可以重写，并找到父类函数，但属性只有一个，不能找到父类属性
    instanceof 判断时，使用其子类 
    代码规划：未知类型对象调用属性一定要先强转类型，防止代码修改编辑器不能自动识别。ts转js类型都会自动删除的
    */
    /*
    先用引擎写工具，再写应用

    UI编辑器,UI资源打包

    动画编辑器
    地图编辑器
    消息编辑器
    配置编辑器
    */
    // ============================================================================
    export let stage: Stage;

    export function startupWeb(): void {
        let width: number = 1136;
        let height: number = 640;
        if (Browser.clientWidth > width) {
            width = Browser.clientWidth;
        }
        if (Browser.clientHeight > height) {
            height = Browser.clientHeight;
        }
        startup(width, height);
    }

    export function startupApp(): void {
        let width: number = 1136;
        let height: number = 640;
        let phyPer: number = Browser.clientWidth / Browser.clientHeight;
        let desPer: number = width / height;
        if (Render.isConchApp || !Browser.onPC) {
            if (phyPer > desPer) {
                width = height * phyPer;
            } else {
                height = width / phyPer;
            }
        }

        startup(width, height);

        if (Render.isConchApp) {
            stage.scaleMode = Stage.SCALE_SHOWALL;
            stage.screenMode = Stage.SCREEN_HORIZONTAL;
        } else if (!Browser.onPC) {
            stage.scaleMode = Stage.SCALE_EXACTFIT;
        } else {
            stage.scaleMode = Stage.SCALE_NOSCALE;
        }
    }

    /** 启动引擎*/
    function startup(width: number, height: number): void {
        Laya.init(width, height, webgl.WebGL);
        stage = Laya.stage;
        stage.alignV = Stage.ALIGN_MIDDLE;
        stage.alignH = Stage.ALIGN_CENTER;

        frame.startup();
        soundex.startup();
    }

    /** 隐藏APP初始启动画面*/
    export function hideLoadingView(): void {
        if (Render.isConchApp) {
            if (Browser.window.loadingView != null) {
                Browser.window.loadingView.loading(100);
            }
        }
    }
}