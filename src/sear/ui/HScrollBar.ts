module sear.ui {
    import Rectangle = sear.maths.Rectangle;

    /**
     * [组件]
     * 
     * @author pbk
     */
    export class HScrollBar extends VScrollBar {
        constructor() {
            super();
        }

        clone(ret: HScrollBar = null): HScrollBar {
            ret || (ret = new HScrollBar());
            super.clone(ret);
            return ret;
        }

        initialize(): void {
            super.initialize();
            this.slider.isVertical = false;
        }
    }
}