var uitool;
(function (uitool) {
    /**
     * 文件相关控制（打开、保存、解析、生成）
     *
     * @author pbk
     */
    var FileCtrl = /** @class */ (function () {
        function FileCtrl() {
            this._file = null;
        }
        FileCtrl.prototype.open = function () {
            sear.filex.openBrowse(sear.filex.read_text, this, this.openFile);
        };
        FileCtrl.prototype.openFile = function (file, data) {
            this._file = file;
            this.parseUIData(data);
        };
        FileCtrl.prototype.save = function () {
            if (!uitool.record.isChange()) {
                uitool.mainUI.SetPrompt("保存失败：UI无修改");
                return;
            }
            var content = this.createUIData();
            if (!content) {
                uitool.mainUI.SetPrompt("保存失败：无保存数据");
                return;
            }
            if (this._file) {
                sear.filex.saveFile(this._file, content);
            }
            else {
                if (!uitool.kvCtrl.fileName) {
                    uitool.mainUI.SetPrompt("保存失败：请先为文件命名");
                    return;
                }
                sear.filex.save(uitool.kvCtrl.fileName + ".ts", content, sear.filex.type_ts);
            }
        };
        // ==================================================================================
        /** 解析面板数据*/
        FileCtrl.prototype.parseUIData = function (data) {
        };
        // ==================================================================================
        /** 生成当前面板数据*/
        FileCtrl.prototype.createUIData = function () {
            return null;
        };
        /**
        * 生成TypeScript ui文件
        * @param root 模块路径
        * @param name 类名
        * @param parent 父类名
        * @param key 属性定义
        * @param value 属性赋值
        */
        FileCtrl.prototype.createTemplate = function (root, name, parent, key, value) {
            return "module " + root + " {\n    export class " + name + " extends " + parent + " {\n        " + key + "\n        constructor() {\n            super();\n            " + value + "\n        }\n    }\n}";
        };
        return FileCtrl;
    }());
    uitool.FileCtrl = FileCtrl;
})(uitool || (uitool = {}));
//# sourceMappingURL=FileCtrl.js.map