module uitool.ui.comkey {
    import ComKey = config.ComKey;
    import Event = sear.Event;

    /**
     * 组件属性值控制
     * 
     * @author pbk
     */
    export class KeyItemCtrl {
        // 属性配置
        private _config: ComKey;
        // 组件控件
        private _comCtrl: ComponentCtrl;
        // 组件属性显示对象
        private _comKey: KeyItem;

        constructor(config: ComKey, comCtrl: ComponentCtrl) {
            this._config = config;
            this._comCtrl = comCtrl;

            this._comKey = new KeyItem();
            this._comKey.on(Event.BLUR, this, this.onBlur);
        }

        destroy(): void {

        }

        /**
         * 设置数值的唯一接口
         * @param value 数值
         * @param isRecord 是否记录操作
         * @param force 强制赋值 
         */
        setValue(value: any, isRecord: boolean = true, force: boolean = false): void {
            value = this.formatValue(value);
            if (!force && this.keyValue == value) {
                return;
            }
            if (isRecord) {
                record.recordOrder(record.CHANGE, this._comCtrl, [this.key, this.keyValue, value]);
            }

            this.keyValue = value;

            if (this.key == "name") {
                this._comCtrl.treeItem.updateShow();
            }

            this.updateShow();
        }

        // 格式化数值
        private formatValue(value: any): any {

        }

        updateShow(): void {

        }

        get key(): string {
            return this._config.key;
        }
        private get keyValue(): any {
            return this._comCtrl.uiIns[this.key];
        }
        private set keyValue(value: any) {
            this._comCtrl.uiIns[this.key] = value;
        }

        private onBlur(): void {

        }
    }
}