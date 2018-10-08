module sear.loader {
    import Handler = sear.struct.Handler;

    export enum LoadType {
        text,// 文本
        json,// json
        xml,// domXML
        buffer,// arraybuffer
        image,// Texture
        sound,// sound
        atlas,// json & Texture
        font,// BitmapFont
        ttf,// null
        plf// preLoadedMap
    }

    /**
     * 
     * 
     * @author pbk
     */
    export class LoaderManager {
        constructor() {
        }

        /**
         * 加载图片
         * @param url 资源路径
         * @param caller 加载完成执行域
         * @param method 加载完成回调函数
         */
        loadImage(url: string, caller: any, method: Function, args: any[] = null): void {
            this.load(url, LoadType.image, Handler.create(caller, method, args, true));
        }

        /**
         * 加载图片集
         * @param urls 
         * @param complete 加载成功返回Texture列表，加载失败返回null
         */
        loadImages(urls: string[], complete: Handler): void {
            this.load(urls, LoadType.image, Handler.create(this, this.loadImagesComplete, [urls, complete], true));
        }

        private loadImagesComplete(urls: string[], complete: Handler, result: boolean): void {
            if (!complete) {
                return;
            }
            if (result) {
                let texs: Texture[] = [];
                for (let url of urls) {
                    let tex: Texture = this.getRes(url);
                    if (!tex) {
                        complete.runWith(null);
                        return;
                    }
                    texs.push(tex);
                }
                complete.runWith(texs);
            } else {
                complete.runWith(null);
            }
        }

        // =============================================================================
        load(url: string | string[], type: LoadType, complete: Handler,
            cache: boolean = true, ignoreCache: boolean = false,
            priority: number = 1, group: string = null,
            progressCaller: any = null, progressMethod: Function = null
        ): void {
            if (!url) {
                return;
            }

            let record: LoadRecord = this.addRecord(url, complete);
            if (!record) {
                return;
            }

            Laya.loader.load(url,
                Laya.Handler.create(this, this.loadComplete, [record]),
                progressMethod ? Laya.Handler.create(progressCaller, progressMethod) : null,
                LoadType[type], priority, cache, group, ignoreCache
            );
        }

        private loadComplete(record: LoadRecord, data: any): void {
            record.runWith(data);
            this.delRecord(record);
        }

        // =============================================================================
        getRes(url: string): any {
            return Laya.loader.getRes(url);
        }

        hasRes(url: string | string[]): boolean {
            if (!url) {
                return false;
            }
            if (typeof url === "string") {
                return this.getRes(url);
            } else {
                for (let sub of url) {
                    if (!this.getRes(sub)) {
                        return false;
                    }
                }
                return true;
            }
        }

        cancelLoad(url: string | string[]): void {
            if (typeof url === "string") {
                Laya.loader.cancelLoadByUrl(url);
            } else {
                Laya.loader.cancelLoadByUrls(url);
            }
        }

        clearRes(url: string, forceDispose: boolean = false): void {
            Laya.loader.clearRes(url, forceDispose);
        }

        // =============================================================================
        private _records: Object = {};

        private addRecord(url: string | string[], complete: Handler): LoadRecord {
            for (let key in this._records) {
                if (this._records[key].equalsUrl(url)) {
                    this._records[key].addComplete(complete);
                    return null;
                }
            }

            let record: LoadRecord = pool.getLoadRecord();
            record.url = url;
            record.addComplete(complete);
            this._records[record.id] = record;
            return record;
        }

        private delRecord(record: LoadRecord): void {
            delete this._records[record.id];
            record.recover();
        }
    }
}
module sear {
    export const loadex: sear.loader.LoaderManager = new sear.loader.LoaderManager();
}