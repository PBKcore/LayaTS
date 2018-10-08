module sear.ui {
    import LoadType = sear.loader.LoadType;
    import Handler = sear.struct.Handler;

    /**
     * [组件]组成：背景图片bg；滑动按钮bar；进度图片progress
     * sizeGrid各个分开赋值
     * skin统一赋值
     * 
     * @author pbk
     */
    export class Slider extends laya.ui.Slider {
        constructor(skin: string = null) {
            super(skin);
        }

        protected createChiildren(): void {
            this.addChild(this._bg = new Image());
            this.addChild(this._bar = new Button());
        }

        /** 背景图片缩放网格数据*/
        get sizeGrid(): string {
            return this._bg.sizeGrid;
        }
        set sizeGrid(value: string) {
            this._bg.sizeGrid;
        }
        /** 格式：背景图片skin;滑动按钮skin;进度图片skin(可选)。使用分号;分割*/
        get skin(): string {
            return this._skin;
        }
        set skin(value: string) {
            if (this._skin != value) {
                this._skin = value;
                if (value) {
                    let skins: string[] = value.split(";");
                    if (skins && skins.length > 0) {
                        if (loadex.hasRes(skins)) {
                            this.setSource(value);
                        } else {
                            loadex.load(skins, LoadType.image, Handler.create(this, this.setSource, [value], true));
                        }
                    }
                }
            }
        }
        protected setSource(url: string): void {
            if (this.destroyed) {
                return;
            }
            if (this._skin === url) {
                let skins: string[] = url.split(";");

                this._bg.skin = skins[0];
                if (skins.length > 1) {
                    this._bar.skin = skins[1];
                    if (skins.length > 2) {
                        this.progress.skin = skins[2];
                    }
                }

                this.setBarPoint();
                this.callLater(this.changeValue);
            }
        }
        /** 进度图片（注意：调用即会创建。不需要避免调用！）*/
        get progress(): Image {
            if (!this._progress) {
                this.addChildAt(this._progress = new Image(), 1);
            }
            return <Image>this._progress;
        }
    }
}