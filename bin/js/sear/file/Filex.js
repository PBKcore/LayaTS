var sear;
(function (sear) {
    var file;
    (function (file_1) {
        var Handler = sear.struct.Handler;
        /**
         * LocalStorage可以保存到本地
         *
         * @author pbk
         */
        var Filex = /** @class */ (function () {
            function Filex() {
                // ============================================================================
                // ================================================================ 读取文件
                this.read_buffer = 1; // ArrayBuffer
                this.read_byte = 2;
                this.read_text = 3; // string
                this._readHandler = null;
                // ============================================================================
                // ================================================================ 保存文件
                this.type_doc = "application/msword";
                this.type_bin = "application/octet-stream"; // exe, so, dll
                this.type_pdf = "application/pdf";
                this.type_ai = "application/postscript";
                this.type_xls = "application/vnd.ms-excel";
                this.type_ppt = "application/vnd.ms-powerpoint";
                this.type_dir = "application/x-director";
                this.type_js = "application/x-javascript";
                this.type_ts = "application/x-typescript";
                this.type_swf = "application/x-shockwave-flash";
                this.type_xhtml = "application/xhtml+xml"; // xht
                this.type_zip = "application/zip";
                this.type_css = "text/css";
                this.type_html = "text/html"; // htm
                this.type_txt = "text/plain";
                // type_utf8: string = "text/plain;charset=utf-8";
                this.type_xml = "text/xml"; // xsl
                this.type_mpeg = "video/mpeg"; // mpg
                this.type_avi = "video/x-msvideo";
                this.type_movie = "video/x-sgi-movie";
                this.type_midi = "audio/midi"; // mid
                this.type_mp3 = "audio/mpeg";
                this.type_rm = "audio/x-pn-realaudio";
                this.type_rpm = "audio/x-pn-realaudio-plugin";
                this.type_wav = "audio/x-wav";
                this.type_bmp = "image/bmp";
                this.type_gif = "image/gif";
                this.type_jpeg = "image/jpeg"; // jpg
                this.type_png = "image/png";
            }
            /**
             * 打开浏览框（在stage事件中才能触发）
             * @param readType
             * @param caller
             * @param method 回调参数(fiile,文件数据)
             */
            Filex.prototype.openBrowse = function (readType, caller, method) {
                if (this._fileReader && this._fileReader.readyState == 1) {
                    return;
                }
                if (!method) {
                    return;
                }
                this.clearHander();
                this._readHandler = Handler.create(caller, method, null, true);
                this._readType = readType;
                if (!this._html_input) {
                    this._html_input = sear.Browser.createElement("input");
                    this._html_input.type = "file";
                    this._html_input.onchange = this.onInputChange;
                }
                this._html_input.dispatchEvent(new MouseEvent("click")); // { bubbles: true, cancelable: false, view: window }
            };
            Filex.prototype.clearHander = function () {
                if (this._readHandler) {
                    this._readHandler.recover();
                    this._readHandler = null;
                }
            };
            Filex.prototype.onInputChange = function (event) {
                var files = event.currentTarget["files"];
                sear.filex.readFile(files[0]);
            };
            /** 加载本地文件*/
            Filex.prototype.readFile = function (file) {
                if (!this._fileReader) {
                    this._fileReader = new FileReader();
                    this._fileReader.onload = this.onReadLoad;
                    this._fileReader.onerror = this.onReadError;
                    this._fileReader.onabort = this.onReadAbort;
                }
                this._readHandler.addArg(file);
                if (this._readType == this.read_text) {
                    this._fileReader.readAsText(file);
                }
                else if (this._readType == this.read_byte) {
                    this._fileReader.readAsBinaryString(file);
                }
                else {
                    this._fileReader.readAsArrayBuffer(file);
                }
            };
            Filex.prototype.onReadLoad = function () {
                if (!sear.filex._readHandler) {
                    return;
                }
                sear.filex._readHandler.runWith(sear.filex._fileReader.result);
                sear.filex._readHandler = null;
            };
            Filex.prototype.onReadError = function () {
                sear.filex.clearHander();
            };
            Filex.prototype.onReadAbort = function () {
                sear.filex.clearHander();
            };
            /** 保存本地文件（默认保存在"下载"文件夹）*/
            Filex.prototype.save = function (fileName, content, type) {
                var file = new File([content], fileName, { type: type });
                var url = URL.createObjectURL(file);
                this._html_a || (this._html_a = sear.Browser.createElement("a"));
                this._html_a.href = url;
                this._html_a.download = file.name;
                this._html_a.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: false, view: window }));
                URL.revokeObjectURL(url);
            };
            Filex.prototype.saveFile = function (file, content) {
                if (!file) {
                    return;
                }
                this.save(file.name, content, file.type);
            };
            return Filex;
        }());
        file_1.Filex = Filex;
    })(file = sear.file || (sear.file = {}));
})(sear || (sear = {}));
(function (sear) {
    sear.filex = new sear.file.Filex();
})(sear || (sear = {}));
//# sourceMappingURL=Filex.js.map