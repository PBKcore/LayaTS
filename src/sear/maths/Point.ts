module sear.maths {

    /**
     * 二维坐标，x表示水平轴，y表示垂直轴
     * 
     * @author pbk
     */
    export class Point extends laya.maths.Point {
        /** 临时数据。（建议在单个执行单元中使用，避免递归和回调使用）*/
        static TEMP: Point = new Point();

        constructor(x: number = 0.0, y: number = 0.0) {
            super(x, y);
        }

        clone(): Point {
            let ret: Point = new Point();
            ret.x = this.x;
            ret.y = this.y;
            return ret;
        }

        /** 是否在(0, 0)点*/
        get isZero(): boolean {
            return this.x == 0 && this.y == 0;
        }

        /** 整形x坐标*/
        set xInt(value: number) {
            this.x = value | 0;
        }

        /** 整形y坐标*/
        set yInt(value: number) {
            this.y = value | 0;
        }
    }
}