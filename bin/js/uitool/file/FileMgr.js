var uitool;
(function (uitool) {
    var file;
    (function (file_1) {
        /**
         *
         *
         * @author pbk
         */
        var FileMgr = /** @class */ (function () {
            function FileMgr() {
                this._file = null;
            }
            FileMgr.prototype.open = function () {
                sear.filex.openBrowse(sear.filex.read_text, this, this.openFile);
            };
            FileMgr.prototype.openFile = function (file, data) {
                this._file = file;
                uitool.ui.uiMgr.parseUIData(data);
            };
            FileMgr.prototype.save = function () {
                if (!uitool.record.isChange()) {
                    uitool.mainUI.SetPrompt("保存失败：UI无修改");
                    return;
                }
                var content = uitool.ui.uiMgr.createUIData();
                if (!content) {
                    uitool.mainUI.SetPrompt("保存失败：无保存数据");
                    return;
                }
                if (this._file) {
                    sear.filex.saveFile(this._file, content);
                }
                else {
                    if (!uitool.ui.uiMgr.fileName) {
                        uitool.mainUI.SetPrompt("保存失败：请先为文件命名");
                        return;
                    }
                    sear.filex.save(uitool.ui.uiMgr.fileName + ".ts", content, sear.filex.type_ts);
                }
            };
            return FileMgr;
        }());
        file_1.fileMgr = new FileMgr();
    })(file = uitool.file || (uitool.file = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=FileMgr.js.map