module uitool.ui {
    import Sprite = sear.Sprite;
    import Event = sear.Event;
    import ComData = config.ComData;
    import TreeItem = tree.TreeItem;
    import KeyItemCtrl = comkey.KeyItemCtrl;
    import UIBound = select.UIBound;
    import HashList = sear.struct.HashList;

    /**
     * 单个组件控制
     * 
     * @author pbk
     */
    export class ComponentCtrl {
        constructor(data: ComData, uiIns: any = null) {
            this._config = data;
            this.setUIInstance(uiIns);
            this.initParam();
            this.initTreeItem();
        }

        destroy(destroyChild: boolean = true): void {
            this._config = null;

            if (destroyChild) {
                for (let item of this._childs) {
                    item.destroy(destroyChild);
                }
            }
            this._parent = null;
            this._childs.length = 0;
            this._childs = null;

            this._uiIns.destroy(destroyChild);
            this._uiIns = null;

            this._treeItem.destroy(destroyChild);
            this._treeItem = null;

            for (let keyCtrl of this._paramMap.values) {
                keyCtrl.destroy();
            }
            this._paramMap.clear();
            this._paramMap = null;

            if (this._uiBound) {
                this._uiBound.destroy();
                this._uiBound = null;
            }
        }

        clone(): ComponentCtrl {
            let ret: ComponentCtrl = new ComponentCtrl(this.config, this._uiIns["clone"]());
            for (let child of this._childs) {
                ret.addChild(child.clone());
            }
            return ret;
        }

        // ============================================================ 配置数据
        // 组件数据
        private _config: ComData;

        get config(): ComData {
            return this._config;
        }

        // ============================================================ 面板显示组件
        // 组件实例
        private _uiIns: Sprite;

        private setUIInstance(uiIns: any = null): void {
            uiIns || (uiIns = new this._config.uiClass());
            this._uiIns = uiIns;
            this._uiIns.on(Event.DRAG_START, this, this.onDragStart);
            this._uiIns.on(Event.DRAG_END, this, this.onDragEnd);
        }

        /** 修改属性值*/
        setValue(key: string, value: any, isRecord: boolean = true, force: boolean = false): void {
            let keyItem: KeyItemCtrl = this.getParam(key);
            if (keyItem) {
                keyItem.setValue(value, isRecord, force);
            }
        }

        get uiIns(): Sprite {
            return this._uiIns;
        }
        /** 组件名字*/
        get name(): string {
            return this._uiIns.name;
        }

        private onDragStart(): void {
            selectCtrl.dragStart(this);
        }

        private onDragEnd(): void {
            selectCtrl.dragEnd(this);
        }

        // ----------------------------------------------- 选中框
        private _uiBound: UIBound;

        private updateBound(): void {
            if (this.selected) {
                this._uiBound || (this._uiBound = new UIBound(this));
                this._uiBound.updateShow();
                this._uiIns.addChild(this._uiBound);
            } else {
                if (this._uiBound) {
                    this._uiBound.removeSelf();
                }
            }
        }

        // ============================================================ 组件参数
        private _paramMap: HashList<KeyItemCtrl>;

        private initParam(): void {
            this._paramMap = new HashList<KeyItemCtrl>();

            for (let comKey of this._config.keys) {
                this._paramMap.add(comKey.key, new KeyItemCtrl(comKey, this));
            }
        }

        getParam(key: string): KeyItemCtrl {
            return this._paramMap.get(key);
        }
        get params(): KeyItemCtrl[] {
            return this._paramMap.values;
        }

        // ============================================================ 树状图组件项
        // ----------------------------------------------- 树状结构
        private _parent: ComponentCtrl = null;// 父节点
        private _childs: ComponentCtrl[] = [];// 子节点列表
        private _index: number = -1;

        addChild(child: ComponentCtrl, isRecord: boolean = true): void {
            this.addChildAt(child, this.childCount, isRecord);
        }

        addChildAt(child: ComponentCtrl, index: number, isRecord: boolean = true): void {
            if (!child) {
                return;
            }
            if (index < 0) { index = 0; }
            else if (index > this.childCount) { index = this.childCount; }

            let orders: any[] = [child.parent, child._index];
            if (child.parent) {
                // 有父对象
                if (child.parent === this) {
                    if (index == this.childCount) {// 添加到末尾
                        if (child._index + 1 == index) {
                            return;// 当前以及是最后一个
                        }
                        index = this.childCount - 1;
                    } else {
                        if (child._index == index) {
                            return;// 当前是统一位置
                        }
                    }
                    this._childs.splice(child._index, 1);
                } else {
                    child.parent._childs.splice(child._index, 1);
                }
                this._childs.splice(index, 0, child);
            } else {
                this._childs.push(child);
            }
            child.parent = this;
            this.updateChildIndex();

            if (isRecord) {
                orders.push(this, child._index);
                record.recordOrder(record.ADD, child, orders);
            }

            this._uiIns.addChildAt(child._uiIns, index);
            panelCtrl.treeCtrl.updateShowLater();
        }

        removeChild(child: ComponentCtrl, isRecord: boolean = true): void {
            if (!child || child.parent != this) {
                return;
            }
            if (isRecord) {
                record.recordOrder(record.DELETE, child, [this, child._index]);
            }
            this._childs.splice(child._index, 1);
            child.parent = null;
            this.updateChildIndex();

            this._uiIns.removeSelf();
            panelCtrl.treeCtrl.updateShowLater();
            selectCtrl.unselect(child);
        }

        removeSelf(): void {
            if (this._parent) {
                this._parent.removeChild(this);
            } else {
                panelCtrl.treeCtrl.delHead(this);
            }
        }

        private updateChildIndex(): void {
            for (let i: number = 0, len: number = this._childs.length; i < len; ++i) {
                this._childs[i]._index = i;
            }
        }

        /** 组件层级前移*/
        toTop(): void {
            if (!this._parent) {
                return;
            }
            this._parent.addChildAt(this, this._index - 1);
        }

        /** 组件层次后移*/
        toBottom(): void {
            if (!this._parent) {
                return;
            }
            this._parent.addChildAt(this, this._index + 1);
        }

        get parent(): ComponentCtrl {
            return this._parent;
        }
        set parent(value: ComponentCtrl) {
            this._parent = value;
        }
        get childs(): ComponentCtrl[] {
            return this._childs;
        }
        /** 子节点数*/
        get childCount(): number {
            return this._childs.length;
        }
        /** 节点列表位置*/
        get index(): number {
            return this._index;
        }

        // ----------------------------------------------- 显示组件项
        private _treeItem: TreeItem;

        private _selected: boolean = false;
        private _isOpen: boolean = false;

        private initTreeItem(): void {
            this._treeItem = new TreeItem(this);
        }

        get treeItem(): TreeItem {
            return this._treeItem;
        }
        get treeItemWidth(): number {
            return this._treeItem.width;
        }
        get treeItemHeight(): number {
            return this._treeItem.height;
        }
        /** 是否已选择该控件*/
        get selected(): boolean {
            return this._selected;
        }
        set selected(value: boolean) {
            if (this._selected == value) {
                return;
            }
            this._selected = value;
            this._treeItem.updateShow();
            this.updateBound();
        }
        /** 是否开启显示子控件*/
        get isOpen(): boolean {
            return this._isOpen;
        }
        set isOpen(value: boolean) {
            if (this._isOpen == value) {
                return;
            }
            this._isOpen = value;
        }
    }
}