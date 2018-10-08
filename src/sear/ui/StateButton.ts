module sear.ui {
    import EventDispatcher = sear.event.EventDispatcher;

    /**
     * 状态按钮
     * 未选择是up状态；选中时down状态
     * 
     * @author pbk
     */
    export class StateButton extends Button {
        dispatcher: EventDispatcher;
        group: number = null;

        constructor() {
            super();
        }

        clone(ret: StateButton = null): StateButton {
            ret || (ret = new StateButton());
            super.clone(ret);
            ret.group = this.group;
            ret.dispatcher = this.dispatcher;

            return ret;
        }

        destroy(destroyChild: boolean = true): void {
            if (!this.dispatcher) {
                this.dispatcher.destroy();
                this.dispatcher = null;
            }
            super.destroy(destroyChild);
        }

        set selected(value: boolean) {
            if (this._selected != value) {
                this._selected = value;
                this.state = this._selected ? 2 : 0;
                this.checkGroup();
            }
        }

        set selectedMute(value: boolean) {
            if (this._selected != value) {
                this._selected = value;
                this.state = this._selected ? 2 : 0;
            }
        }

        protected checkGroup(): void {
            if (!this.selected || !this.group || !this.parent) {
                this.event(Event.CHANGE);
                return;
            }
            for (let child of this.parent._childs) {
                if (child instanceof StateButton && child.group == this.group && child != this) {
                    child.selectedMute = false;
                }
            }
            if (this.dispatcher) {
                this.dispatcher.event(Event.CHANGE, this);
            }
        }
    }
}