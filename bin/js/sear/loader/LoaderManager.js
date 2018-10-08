var sear;
(function (sear) {
    var loader;
    (function (loader) {
        var Handler = sear.struct.Handler;
        var LoadType;
        (function (LoadType) {
            LoadType[LoadType["text"] = 0] = "text";
            LoadType[LoadType["json"] = 1] = "json";
            LoadType[LoadType["xml"] = 2] = "xml";
            LoadType[LoadType["buffer"] = 3] = "buffer";
            LoadType[LoadType["image"] = 4] = "image";
            LoadType[LoadType["sound"] = 5] = "sound";
            LoadType[LoadType["atlas"] = 6] = "atlas";
            LoadType[LoadType["font"] = 7] = "font";
            LoadType[LoadType["ttf"] = 8] = "ttf";
            LoadType[LoadType["plf"] = 9] = "plf"; // preLoadedMap
        })(LoadType = loader.LoadType || (loader.LoadType = {}));
        /**
         *
         *
         * @author pbk
         */
        var LoaderManager = /** @class */ (function () {
            function LoaderManager() {
                // =============================================================================
                this._records = {};
            }
            /**
             * 加载图片
             * @param url 资源路径
             * @param caller 加载完成执行域
             * @param method 加载完成回调函数
             */
            LoaderManager.prototype.loadImage = function (url, caller, method, args) {
                if (args === void 0) { args = null; }
                this.load(url, LoadType.image, Handler.create(caller, method, args, true));
            };
            /**
             * 加载图片集
             * @param urls
             * @param complete 加载成功返回Texture列表，加载失败返回null
             */
            LoaderManager.prototype.loadImages = function (urls, complete) {
                this.load(urls, LoadType.image, Handler.create(this, this.loadImagesComplete, [urls, complete], true));
            };
            LoaderManager.prototype.loadImagesComplete = function (urls, complete, result) {
                if (!complete) {
                    return;
                }
                if (result) {
                    var texs = [];
                    for (var _i = 0, urls_1 = urls; _i < urls_1.length; _i++) {
                        var url = urls_1[_i];
                        var tex = this.getRes(url);
                        if (!tex) {
                            complete.runWith(null);
                            return;
                        }
                        texs.push(tex);
                    }
                    complete.runWith(texs);
                }
                else {
                    complete.runWith(null);
                }
            };
            // =============================================================================
            LoaderManager.prototype.load = function (url, type, complete, cache, ignoreCache, priority, group, progressCaller, progressMethod) {
                if (cache === void 0) { cache = true; }
                if (ignoreCache === void 0) { ignoreCache = false; }
                if (priority === void 0) { priority = 1; }
                if (group === void 0) { group = null; }
                if (progressCaller === void 0) { progressCaller = null; }
                if (progressMethod === void 0) { progressMethod = null; }
                if (!url) {
                    return;
                }
                var record = this.addRecord(url, complete);
                if (!record) {
                    return;
                }
                Laya.loader.load(url, Laya.Handler.create(this, this.loadComplete, [record]), progressMethod ? Laya.Handler.create(progressCaller, progressMethod) : null, LoadType[type], priority, cache, group, ignoreCache);
            };
            LoaderManager.prototype.loadComplete = function (record, data) {
                record.runWith(data);
                this.delRecord(record);
            };
            // =============================================================================
            LoaderManager.prototype.getRes = function (url) {
                return Laya.loader.getRes(url);
            };
            LoaderManager.prototype.hasRes = function (url) {
                if (!url) {
                    return false;
                }
                if (typeof url === "string") {
                    return this.getRes(url);
                }
                else {
                    for (var _i = 0, url_1 = url; _i < url_1.length; _i++) {
                        var sub = url_1[_i];
                        if (!this.getRes(sub)) {
                            return false;
                        }
                    }
                    return true;
                }
            };
            LoaderManager.prototype.cancelLoad = function (url) {
                if (typeof url === "string") {
                    Laya.loader.cancelLoadByUrl(url);
                }
                else {
                    Laya.loader.cancelLoadByUrls(url);
                }
            };
            LoaderManager.prototype.clearRes = function (url, forceDispose) {
                if (forceDispose === void 0) { forceDispose = false; }
                Laya.loader.clearRes(url, forceDispose);
            };
            LoaderManager.prototype.addRecord = function (url, complete) {
                for (var key in this._records) {
                    if (this._records[key].equalsUrl(url)) {
                        this._records[key].addComplete(complete);
                        return null;
                    }
                }
                var record = sear.pool.getLoadRecord();
                record.url = url;
                record.addComplete(complete);
                this._records[record.id] = record;
                return record;
            };
            LoaderManager.prototype.delRecord = function (record) {
                delete this._records[record.id];
                record.recover();
            };
            return LoaderManager;
        }());
        loader.LoaderManager = LoaderManager;
    })(loader = sear.loader || (sear.loader = {}));
})(sear || (sear = {}));
(function (sear) {
    sear.loadex = new sear.loader.LoaderManager();
})(sear || (sear = {}));
//# sourceMappingURL=LoaderManager.js.map