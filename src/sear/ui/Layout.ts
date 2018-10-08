module sear.ui {

    /**
     * 布局
     * 
     * @author pbk
     */
    export class Layout {
        static ALIGN_LEFT: string = "left";
        static ALIGN_CENTER: string = "center";
        static ALIGN_RIGHT: string = "right";
        static VALIGN_TOP: string = "top";
        static VALIGN_MIDDLE: string = "middle";
        static VALIGN_BOTTOM: string = "bottom";

        protected _x: number = 0;
        protected _y: number = 0;
        protected _width: number = 0;
        protected _height: number = 0;
        protected _align: string = Layout.ALIGN_LEFT;
        protected _valign: string = Layout.VALIGN_TOP;
        protected _isHorz: boolean = true;
        protected _dx: number = 0;
        protected _dy: number = 0;

        private _childs: Sprite[] = [];

        protected _destroyed: boolean = false;

        constructor(x: number, y: number, width: number, height: number) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        clear(): void {
            this._x = 0;
            this._y = 0;
            this._width = 0;
            this._height = 0;
            this._align = Layout.ALIGN_LEFT;
            this._valign = Layout.VALIGN_TOP;
            this._isHorz = true;
            this._dx = 0;
            this._dy = 0;
            this._childs.length = 0;
        }

        destroy(): void {
            this._childs = null;
            this._destroyed = true;
        }

        updateLayout(): void {
            if (this._childs.length == 0) {
                return;
            }
            if (this.isHorz) {// 横向排列
                this.layoutH();
            } else {// 纵向排列
                this.layoutV();
            }
        }

        private layoutH(): void {
            let len: number = this._childs.length;
            let tx: number;
            let ty: number = this.y;
            let right: number = this.x + this.width;
            let child: Sprite;
            let maxH: number;// 组最大高度

            // ------------------- 横向布局
            if (this.align == Layout.ALIGN_LEFT) {// 左对齐
                tx = this.x;
                maxH = 0;
                for (let i: number = 0; i < len; ++i) {
                    child = this._childs[i];
                    if (tx + child.width > right && child.width <= this.width) {
                        tx = this.x;
                        ty += (maxH + this.dy);
                        maxH = 0;
                    }

                    child.x = tx;
                    child.y = ty;

                    tx += (child.width + this.dx);
                    if (child.height > maxH) { maxH = child.height; }
                }
            } else if (this.align == Layout.ALIGN_RIGHT) {// 右对齐
                tx = right;
                maxH = 0;
                for (let i: number = len - 1; i >= 0; --i) {
                    child = this._childs[i];
                    if (tx - child.width < this.x && child.width <= this.width) {
                        tx = right;
                        ty -= (maxH + this.dy);
                        maxH = 0;
                    }

                    child.x = tx - child.width;
                    child.y = ty;

                    tx -= (child.width - this.dx);
                    if (child.height > maxH) { maxH = child.height; }
                }
                var offH: number = this.y - ty;
                ty += offH * 2;
            } else {// 居中对齐
                tx = this.x;
                maxH = 0;
                let si: number = 0;
                for (let i: number = 0; i < len; ++i) {
                    child = this._childs[i];
                    if (tx + child.width > right && child.width <= this.width) {
                        this.layoutCenter(si, i - 1);
                        si = i;

                        tx = this.x;
                        ty += (maxH + this.dy);
                        maxH = 0;
                    }

                    child.x = tx;
                    child.y = ty;

                    tx += (child.width + this.dx);
                    if (child.height > maxH) { maxH = child.height; }
                }

                this.layoutCenter(si, len - 1);
            }

            // ------------------- 纵向布局
            if (this.valign == Layout.VALIGN_BOTTOM) {
                ty = ty + maxH - this.y;
                ty = this.height - ty;
            } else if (this.valign == Layout.VALIGN_MIDDLE) {
                ty = ty + maxH - this.y;
                ty = (this.height - ty) * 0.5;
            } else {
                ty = 0;
            }
            ty += (offH || 0);
            if (ty != 0) {
                for (let i: number = 0; i < len; ++i) {
                    this._childs[i].y += ty;
                }
            }
        }

        private layoutCenter(si: number, ei: number): void {
            let offx: number = (this.width - (this._childs[ei].x + this._childs[ei].width - this._childs[si].x)) * 0.5;
            while (si <= ei) {
                this._childs[si].x += offx;
                si += 1;
            }
        }

        // ==========================================================================================
        private layoutV(): void {
            let len: number = this._childs.length;
            let tx: number = this.x;
            let ty: number;
            let bottom: number = this.y + this.height;
            let child: Sprite;
            let maxW: number;// 组最大宽度

            // ------------------- 纵向布局
            if (this.valign == Layout.VALIGN_TOP) {// 上对齐
                ty = this.y;
                maxW = 0;
                for (let i: number = 0; i < len; ++i) {
                    child = this._childs[i];
                    if (ty + child.height > bottom && child.height <= this.height) {
                        ty = this.y;
                        tx += (maxW + this.dx);
                        maxW = 0;
                    }

                    child.x = tx;
                    child.y = ty;

                    ty += (child.height + this.dy);
                    if (child.width > maxW) { maxW = child.width; }
                }
            } else if (this.valign == Layout.VALIGN_BOTTOM) {// 下对齐
                ty = bottom;
                maxW = 0;
                for (let i: number = len - 1; i >= 0; --i) {
                    child = this._childs[i];
                    if (ty - child.height < this.y && child.height <= this.height) {
                        ty = bottom;
                        tx -= (maxW + this.dx);
                        maxW = 0;
                    }

                    child.x = tx;
                    child.y = ty - child.height;

                    ty -= (child.height - this.dy);
                    if (child.width > maxW) { maxW = child.width; }
                }
                var offW: number = this.x - tx;
                tx += offW * 2;
            } else {// 居中对齐
                ty = this.y;
                maxW = 0;
                let si: number = 0;
                for (let i: number = 0; i < len; ++i) {
                    child = this._childs[i];
                    if (ty + child.height > bottom && child.height <= this.height) {
                        this.layoutMiddle(si, i - 1);
                        si = i;

                        ty = this.y;
                        tx += (maxW + this.dx);
                        maxW = 0;
                    }

                    child.x = tx;
                    child.y = ty;

                    ty += (child.height + this.dy);
                    if (child.width > maxW) { maxW = child.width; }
                }

                this.layoutMiddle(si, len - 1);
            }

            // ------------------- 横向布局
            if (this.align == Layout.ALIGN_RIGHT) {
                tx = tx + maxW - this.x;
                tx = this.width - tx;
            } else if (this.align == Layout.ALIGN_CENTER) {
                tx = tx + maxW - this.x;
                tx = (this.width - tx) * 0.5;
            } else {
                tx = 0;
            }
            tx += (offW || 0);
            if (tx != 0) {
                for (let i: number = 0; i < len; ++i) {
                    this._childs[i].x += tx;
                }
            }
        }

        private layoutMiddle(si: number, ei: number): void {
            let offy: number = (this.height - (this._childs[ei].y + this._childs[ei].height - this._childs[si].y)) * 0.5;
            while (si <= ei) {
                this._childs[si].y += offy;
                si += 1;
            }
        }

        // ==========================================================================================
        addChild(child: Sprite): void {
            if (!child || this.destroyed || this._childs.indexOf(child) != -1) {
                return;
            }
            this._childs.push(child);
            callLater(this, this.updateLayout);
        }

        addChildAt(child: Sprite, index: number): void {
            if (!child || this.destroyed) {
                return;
            }
            let idx: number = this._childs.indexOf(child);
            if (idx != -1) {
                index = index < 0 ? 0 : (index >= this._childs.length ? this._childs.length : index);
                if (index == idx) {
                    return;
                }
                this._childs.splice(idx, 1);
                this._childs.splice(index, 0, child);
            } else {
                index = index < 0 ? 0 : (index > this._childs.length ? this._childs.length : index);
                this._childs.splice(index, 0, child);
            }
            callLater(this, this.updateLayout);
        }

        delChild(child: Sprite): void {
            if (!child || this.destroyed) {
                return;
            }
            let idx: number = this._childs.indexOf(child);
            if (idx == -1) {
                return;
            }
            this._childs.splice(idx, 1);
            callLater(this, this.updateLayout);
        }

        setChildIndex(child: Sprite, index: number): void {
            if (!child || this.destroyed) {
                return;
            }
            let idx: number = this._childs.indexOf(child);
            if (idx == -1) {
                return;
            }
            index = index < 0 ? 0 : (index >= this._childs.length ? this._childs.length : index);
            if (index == idx) {
                return;
            }
            this._childs.splice(idx, 1);
            this._childs.splice(index, 0, child);
            callLater(this, this.updateLayout);
        }

        getChildIndex(child: Sprite): number {
            if (!child || this.destroyed) {
                return -1;
            }
            return this._childs.indexOf(child);
        }

        getChildAt(index: number): Sprite {
            if (this.destroyed || index < 0 || index >= this._childs.length) {
                return;
            }
            return this._childs[index];
        }

        get destroyed(): boolean {
            return this._destroyed;
        }
        get x(): number {
            return this._x;
        }
        set x(value: number) {
            if (this._x != value) {
                this._x = value;
                callLater(this, this.updateLayout);
            }
        }
        get y(): number {
            return this._y;
        }
        set y(value: number) {
            if (this._y != value) {
                this._y = value;
                callLater(this, this.updateLayout);
            }
        }
        get width(): number {
            return this._width;
        }
        set width(value: number) {
            if (this._width != value) {
                this._width = value;
                callLater(this, this.updateLayout);
            }
        }
        get height(): number {
            return this._height;
        }
        set height(value: number) {
            if (this._height != value) {
                this._height = value;
                callLater(this, this.updateLayout);
            }
        }
        /** 横向布局*/
        get align(): string {
            return this._align;
        }
        set align(value: string) {
            if (this._align != value) {
                this._align = value;
                callLater(this, this.updateLayout);
            }
        }
        /** 纵向布局*/
        get valign(): string {
            return this._valign;
        }
        set valign(value: string) {
            if (this._valign != value) {
                this._valign = value;
                callLater(this, this.updateLayout);
            }
        }
        /** 是否横向排列；否则纵向*/
        get isHorz(): boolean {
            return this._isHorz;
        }
        set isHorz(value: boolean) {
            if (this._isHorz != value) {
                this._isHorz = value;
                callLater(this, this.updateLayout);
            }
        }
        /** 横向排列间距*/
        get dx(): number {
            return this._dx;
        }
        set dx(value: number) {
            if (this._dx != value) {
                this._dx = value;
                callLater(this, this.updateLayout);
            }
        }
        /** 纵向排列间距*/
        get dy(): number {
            return this._dy;
        }
        set dy(value: number) {
            if (this._dy != value) {
                this._dy = value;
                callLater(this, this.updateLayout);
            }
        }
        get childs(): Sprite[] {
            return this._childs;
        }
    }
}