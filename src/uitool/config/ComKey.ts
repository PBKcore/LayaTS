module uitool.config {

    /**
     * 组件可控属性类型
     * 
     * @author pbk
     */
    export class ComKey {
        static number: number = 1;
        static string: number = 2;
        static boolean: number = 3;

        private _key: string;
        private _type: number;
        private _alias: string;

        constructor(key: string, type: number, alias: string) {
            this._key = key;
            this._type = type;
            this._alias = alias;
        }

        /** 属性键值*/
        get key(): string {
            return this._key;
        }
        /** 值类型*/
        get type(): number {
            return this._type;
        }
        /** 别名*/
        get alias(): string {
            return this._alias;
        }
    }
}