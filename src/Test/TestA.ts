module test {

    /**
     * 
     * 
     * @author pbk
     */
    export class TestA {
        protected _w: number = 0;

        constructor() {
            // Laya.getset(false, this, "w", this.w, this.w)

        }

        tw(): number {
            return 1;
        }

        get t():number{
            return this.tw();
        }

        get w(): number {
            return this._w;
        }
        set w(value: number) {
            this._w = value;
        }
    }
}