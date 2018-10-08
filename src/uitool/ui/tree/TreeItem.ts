module uitool.ui.tree {
    import Sprite = sear.Sprite;
    import Label = sear.ui.Label;
    import Event = sear.Event;
    import BindPosition = sear.tools.BindPosition;
    import Layout = sear.ui.Layout;

    let dragCtrl: ComponentCtrl = null;
    let bindPos: BindPosition = null;
    let bindFrame: Label = null;

    function startDrag(ctrl: ComponentCtrl): void {
        if (dragCtrl != ctrl) {
            if (!bindFrame) {
                bindFrame = sysui.getLabel(ctrl.treeItemWidth, ctrl.treeItemHeight);
                bindFrame.align = Layout.ALIGN_CENTER;
                bindFrame.valign = Layout.VALIGN_MIDDLE;
                bindFrame.borderColor = "#ff0000";
            }
            if (!bindFrame.parent) {
                sear.stage.addChild(bindFrame);
            }
            bindFrame.text = ctrl.name;

            bindPos || (bindPos = new BindPosition());
            bindPos.bind(bindFrame);
        }
    }

    function stopDrag(): void {
        if (bindPos) {
            bindPos.unloadAll();
        }
        if (bindFrame) {
            bindFrame.removeSelf();
        }
    }

    /**
     * 树状图显示项
     * 
     * @author pbk
     */
    export class TreeItem extends Sprite {
        private _labName: Label;

        private _ctrl: ComponentCtrl;

        constructor(ctrl: ComponentCtrl) {
            super();

            this._ctrl = ctrl;

            this.height = 20;

            this._labName = sysui.getLabel(50, this.height);
            this._labName.x = 0;
            this._labName.y = 0;
            this.addChild(this._labName);

            this.on(Event.CLICK, this, this.onClick);
            this.on(Event.MOUSE_DOWN, this, this.onDown);
            this.on(Event.MOUSE_UP, this, this.onUp);
            this.on(Event.DOUBLE_CLICK, this, this.onDoubleClick);
            this.on(Event.MOUSE_OVER, this, this.onOver);
            this.on(Event.MOUSE_OUT, this, this.onOut);
            this.on(Event.MOUSE_MOVE, this, this.onMove);

            this.updateShow();
        }

        destroy(destroyChild: boolean = true): void {
            this._ctrl = null;

            super.destroy(destroyChild);
        }

        // ================================================================================== 树状分支显示控件
        updateShow(): void {
            let name: string = this._ctrl.name;
            if (!this._ctrl.isOpen && this._ctrl.childCount > 0) {
                name += ("(" + this._ctrl.childCount + ")");
            }
            this._labName.name = name;

            this.graphics.clear();
            let color: string;
            if (this._isOver) {
                color = "#949494";
            } else if (this._ctrl.selected) {
                color = "#f6cb38";
            } else {
                color = "#ffffff";
            }
            this.width = Math.max(this._labName.textWidth + 2, 50);
            this.graphics.drawRect(0, 0, this.width, this.height, color);

            if (this._moveType == 1) {
                this.graphics.drawLine(0, 0, this.width, 0, "#000000");
            } else if (this._moveType == 2) {
                this.graphics.drawLine(0, this.height, this.width, this.height, "#000000");
            }
        }

        // ==================================================================================
        // 选中当前组件
        private onClick(): void {
            selectCtrl.select(this._ctrl, false)
        }

        // 选中并开关子节点
        private onDoubleClick(): void {
            this._ctrl.isOpen = !this._ctrl.isOpen;
            selectCtrl.select(this._ctrl, true);
        }

        // -----------------------------------------------
        private _bindPos: BindPosition;

        // 拖动
        private _isDown: boolean = false;
        private onDown(): void {
            this._isDown = true;
            sear.stage.on(Event.MOUSE_UP, this, this.onUpStage);
        }

        private onUpStage(): void {
            sear.stage.off(Event.MOUSE_UP, this, this.onUpStage);
            stopDrag();
            this._isDown = false;
        }

        // 放下
        private onUp(): void {
            if (dragCtrl != this._ctrl) {
                record.recordNew();
                if (this._moveType == 1) {
                    // 上一层
                    this._ctrl.addChildAt(dragCtrl, this._ctrl.index - 1);
                } else if (this._moveType == 2) {
                    // 下一层
                    this._ctrl.addChildAt(dragCtrl, this._ctrl.index + 1);
                } else {
                    // 子对象
                    this._ctrl.addChild(dragCtrl);
                }
            }

            stopDrag();
            this._isDown = false;
        }

        // -----------------------------------------------
        private _isOver: boolean = false;
        private onOver(): void {
            this._isOver = true;
        }

        private onOut(): void {
            this._isOver = false;
            this.moveType = 0;
        }

        private onMove(e: Event): void {
            if (this._isOver) {
                let mY: number = e.currentTarget.mouseY;
                if (mY < 5) {
                    this.moveType = 1;
                } else if (mY > this.height - 5) {
                    this.moveType = 2;
                } else {
                    this.moveType = 0;
                }
            }
            if (this._isDown) {
                startDrag(this._ctrl);
            }
        }

        private _moveType: number = 0;// 0中；1上；2下
        private set moveType(value: number) {
            if (this._moveType == value) {
                return;
            }
            this._moveType = value;
            this.updateShow();
        }
    }
}