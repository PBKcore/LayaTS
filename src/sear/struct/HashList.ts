module sear.struct {

    /**
     * 
     * 
     * @author pbk
     */
    export class HashList<T> {
        private _hash: Object = null;
        private _values: T[] = null;

        constructor() {
            this.clear();
        }

        clear(): void {
            this._hash = {};
            this._values = [];
        }

        add(key: string | number, value: T): T {
            if (key == null) {
                error("[HashList Add] Cannot put a value with undefined or null key!");
                return undefined;
            }
            else if (value == undefined) {
                return this.del(key);
            }
            else {
                let ret: T = this._hash[key];
                if (ret != undefined) {
                    this._values[this._values.indexOf(ret)] = value;
                } else {
                    this._values.push(value);
                }
                this._hash[key] = value;
                return ret;
            }
        }

        del(key: string | number): T {
            let ret: T = this._hash[key];
            if (ret != undefined) {
                delete this._hash[key];
                this._values.splice(this._values.indexOf(ret), 1);
            }
            return ret;
        }

        get(key: string | number): T {
            return this._hash[key];
        }

        contains(key: string | number): boolean {
            return this._hash[key] != undefined;
        }

        clone(): HashList<T> {
            let ret: HashList<T> = new HashList<T>();
            for (let key in this._hash) {
                ret._hash[key] = this._hash[key];
            }
            ret._values = this._values.concat();

            return ret;
        }

        get values(): T[] {
            return this._values;
        }

        get length(): number {
            return this._values.length;
        }
    }
}