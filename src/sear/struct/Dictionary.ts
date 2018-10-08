module sear.struct {

    /**
     * 字典，键值不限制类型
     * 
     * @author pbk
     */
    export class Dictionary<T> {
        private _keys: any[];
        private _values: T[];

        constructor() {
            this._keys = [];
            this._values = [];
        }

        clear(): void {
            this._keys.length = 0;
            this._values.length = 0;
        }

        add(key: any, value: T): T {
            let index: number = this.indexOf(key);
            if (index >= 0) {
                let ret: T = this._values[index];

                this._values[index] = value;
                return ret;
            }

            this._keys.push(key);
            this._values.push(value);
            return null;
        }

        del(key: any): T {
            let index: number = this.indexOf(key);
            if (index >= 0) {
                let ret: T = this._values[index];

                this._keys.splice(index, 1);
                this._values.splice(index, 1);
                return ret;
            }
            return null;
        }

        get(key: any): T {
            let index: number = this.indexOf(key);
            return index < 0 ? null : this._values[index];
        }

        contains(key: any): boolean {
            return this.indexOf(key) >= 0;
        }

        /** 获取指定对象的键名索引*/
        private indexOf(key: any): number {
            let index: number = this._keys.indexOf(key);
            if (index >= 0) {
                return index;
            }

            if (typeof key == "string") {
                key = Number(key);
            }
            else if (typeof key == "number") {
                key = key.toString();
            }
            else {
                return index;
            }

            return this._keys.indexOf(key);
        }

        clone(): Dictionary<T> {
            let ret: Dictionary<T> = new Dictionary<T>();
            ret._keys = this._keys.concat();
            ret._values = this._values.concat();

            return ret;
        }

        get keys(): any[] {
            return this._keys;
        }

        get values(): T[] {
            return this._values;
        }

        get length(): number {
            return this._keys.length;
        }
    }
}