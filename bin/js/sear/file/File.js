var sear;
(function (sear) {
    var file;
    (function (file_1) {
        // LocalStorage可以保存到本地
        /**
         *
         *
         * @author pbk
         */
        var File = /** @class */ (function () {
            function File() {
            }
            /** 打开浏览框*/
            File.prototype.openBrowse = function () {
                // let fd = new ActiveXObject("MSComDlg.CommonDialog");
                // fd.Filter = "*.xml";
                // fd.FilterIndex = 2;
                // fd.MaxFileSize = 128;
                // fd.ShowSave();
                // var fso = new ActiveXObject("Scripting.FileSystemObject");
                if (!this._input) {
                    this._input = Sear.Browser.createElement("input");
                    this._input.type = "file";
                    this._input.style.cssText = "display:none;";
                    this._input.onchange = this.onchange;
                    Sear.Browser.window.document.body.appendChild(this._input);
                }
                var event = new MouseEvent("click", { bubbles: true, cancelable: false, view: window });
                this._input.dispatchEvent(event);
            };
            File.prototype.onchange = function (event) {
                // let files: File[] = event.currentTarget["files"];
                // Sear.log(URL.createObjectURL(files[0]));
                // Sear.log("end");
            };
            /** 加载本地文件*/
            File.prototype.loadFile = function (file) {
                // let fileRead :FileReader = new FileReader();
                // fileRead.readAsDataURL(null);
                // fileRead.onload = null;
                // fileRead.onerror = null;
            };
            /** 保存本地文件*/
            File.prototype.saveFile = function () {
            };
            return File;
        }());
        file_1.File = File;
    })(file = sear.file || (sear.file = {}));
})(sear || (sear = {}));
//# sourceMappingURL=File.js.map