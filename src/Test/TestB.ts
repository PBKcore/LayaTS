module test {

    /**
     * 
     * 
     * @author pbk
     */
    export class TestB extends TestA {
        constructor() {
            super();
        }

        tw(): number {
            return 2;
        }

        test():void{
            sear.log(this.w);
            sear.log(this.tw());
            sear.log(super.tw());
        }

        get w(): number {
            return Laya.superGet(TestA, this, "w") + 1;
        }
        set w(value: number) {
            Laya.superSet(TestA, this, "w", value);
        }
    }
}