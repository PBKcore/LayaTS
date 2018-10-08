module sear.struct {

    /**
     * 
     * 
     * @author pbk
     */
    export class HashMap<T> {
        private _hash: Object = null;
        private _length: number = 0;

        constructor() {
            this.clear();
        }

        clear(): void {
            this._hash = {};
            this._length = 0;
        }

        add(key: string | number, value: T): T {
            if (key == null) {
                error("[HashMap Add] Cannot put a value with undefined or null key!");
                return undefined;
            }
            else if (value == undefined) {
                return this.del(key);
            }
            else {
                let ret: T = this._hash[key];
                if (ret != undefined) {
                    this._length += 1;
                }
                this._hash[key] = value;
                return ret;
            }
        }

        del(key: string | number): T {
            let ret: T = this._hash[key];
            if (ret == undefined) {
                return null;
            }

            delete this._hash[key];
            this._length -= 1;
            return ret;
        }

        get(key: string | number): T {
            return this._hash[key];
        }

        contains(key: string | number): boolean {
            return this._hash[key] != undefined;
        }

        clone(): HashMap<T> {
            let ret: HashMap<T> = new HashMap<T>();
            for (let key in this._hash) {
                ret._hash[key] = this._hash[key];
            }

            return ret;
        }

        get length(): number {
            return this._length;
        }
    }
}