module uitool.config {
    /**
     * 组件的配置数据
     * 
     * @author pbk
     */
    export class ComData {
        private _class: new () => any;
        private _className: string;

        private _keys: ComKey[] = [];

        constructor(comClass: any) {
            this._class = comClass;
            this._className = sear.getClassName(comClass);

            this.addKey("name", ComKey.string, "变量名");
            this.addKey("x", ComKey.number, "x坐标");
            this.addKey("y", ComKey.number, "y坐标");
            this.addKey("width", ComKey.number, "宽度");
            this.addKey("height", ComKey.number, "高度");
            this.addKey("tag", ComKey.string, "携带数据");
            this.addKey("toolTip", ComKey.string, "鼠标tips");
        }

        addKey(key: string, type: number, alias: string): void {
            this._keys.push(new ComKey(key, type, alias));
        }

        get name(): string {
            return this._className;
        }
        get uiClass(): new () => any {
            return this._class;
        }
        get keys(): ComKey[] {
            return this._keys;
        }
    }
}