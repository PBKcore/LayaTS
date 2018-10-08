module sear.maths {

    /**
     * 八方向
     * 
     * @author pbk
     */
    export class Direction8 {
        static NONE: number = -1;
        static UP: number = 0;
        static RIGHT_UP: number = 1;
        static RIGHT: number = 2;
        static RIGHT_DOWN: number = 3;
        static DOWN: number = 4;
        static LEFT_DOWN: number = 5;
        static LEFT: number = 6;
        static LEFT_UP: number = 7;
        static MAXNUM: number = 8;

        private _value: number = 0;

        constructor(value: number) {
            this.value = value;
        }

        /** 计算两点的方向*/
        calcXY(startX: number, startY: number, endX: number, endY: number): number {
            startX -= endX;
            startY -= endY;
            if (startX == 0) {
                return startY > 0 ? Direction8.UP : Direction8.DOWN;
            } else if (startY == 0) {
                return startX > 0 ? Direction8.LEFT : Direction8.RIGHT;
            } else {
                if (startX > 0) {
                    return startY > 0 ? Direction8.LEFT_UP : Direction8.LEFT_DOWN;
                } else {
                    return startY > 0 ? Direction8.RIGHT_UP : Direction8.RIGHT_DOWN;
                }
            }
        }

        /** 计算两点的方向*/
        calcPoint(startPos: Point, endPos: Point): number {
            return this.calcXY(startPos.x, startPos.y, endPos.x, endPos.y);
        }

        /** 方向值*/
        get value(): number {
            return this._value;
        }
        set value(value: number) {
            this._value = (value | 0) % Direction8.MAXNUM;
        }
        /** 随机方向*/
        get random(): number {
            return Math.random() * Direction8.MAXNUM;
        }
        /** 相反方向*/
        get opposite(): number {
            return (this.value + 4) % Direction8.MAXNUM;
        }
        /** 方向正向角度*/
        get angle(): number {
            switch (this.value) {
                case Direction8.UP: return 0;
                case Direction8.RIGHT_UP: return 45;
                case Direction8.RIGHT: return 90;
                case Direction8.RIGHT_DOWN: return 135;
                case Direction8.DOWN: return 180;
                case Direction8.LEFT_DOWN: return 225;
                case Direction8.LEFT: return 270;
                case Direction8.LEFT_UP: return 315;
                default: return 0;
            }
        }
        /** 方向的单位向量*/
        get normal(): Point {
            switch (this.value) {
                case Direction8.UP: return new Point(0, 1);
                case Direction8.RIGHT_UP: return new Point(1, 1);
                case Direction8.RIGHT: return new Point(1, 0);
                case Direction8.RIGHT_DOWN: return new Point(1, -1);
                case Direction8.DOWN: return new Point(0, -1);
                case Direction8.LEFT_DOWN: return new Point(-1, -1);
                case Direction8.LEFT: return new Point(-1, 0);
                case Direction8.LEFT_UP: return new Point(-1, 1);
                default: return new Point(0, 0);
            }
        }
    }
}