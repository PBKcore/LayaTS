module uitool.file {

    /**
     * 文件相关控制（打开、保存、解析、生成）
     * 
     * @author pbk
     */
    export class FileCtrl {
        private _file: File = null;

        constructor() {
        }

        open(): void {
            sear.filex.openBrowse(sear.filex.read_text, this, this.openFile);
        }

        private openFile(file: File, data: string): void {
            this._file = file;
            this.parseUIData(data);
        }

        save(): void {
            if (!record.isChange()) {
                mainUI.setPrompt("保存失败：UI无修改");
                return;
            }
            let content: string = this.createUIData();
            if (!content) {
                mainUI.setPrompt("保存失败：无保存数据");
                return;
            }
            if (this._file) {
                sear.filex.saveFile(this._file, content);
            } else {
                if (!panelCtrl.fileName) {
                    mainUI.setPrompt("保存失败：请先为文件命名");
                    return;
                }
                sear.filex.save(panelCtrl.fileName + ".ts", content, sear.filex.type_ts);
            }
            record.saveIndex();
        }

        // ==================================================================================
        /** 解析面板数据*/
        protected parseUIData(data: string): void {

        }

        // ==================================================================================
        /** 生成当前面板数据*/
        protected createUIData(): string {


            return null;
        }

        /**
        * 生成TypeScript ui文件
        * @param root 模块路径
        * @param name 类名
        * @param parent 父类名
        * @param key 属性定义
        * @param value 属性赋值
        */
        protected createTemplate(root: string, name: string, parent: string, key: string, value: string): string {
            return `module ${root} {
    export class ${name} extends ${parent} {
        ${key}
        constructor() {
            super();
            ${value}
        }
    }
}`;
        }
    }
}