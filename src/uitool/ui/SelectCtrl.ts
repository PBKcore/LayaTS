module uitool.ui {
    import ComData = config.ComData;


    /**
     * 选中组件相关控制
     * 
     * @author pbk
     */
    export class SelectCtrl {
        private _selectList: ComponentCtrl[] = [];

        constructor() {
        }

        select(item: ComponentCtrl, only: boolean): void {
            if (!item) {
                return;
            }
            if (only) {
                this.cancel();
            } else {
                if (this._selectList.indexOf(item) != -1) {
                    return;// 重复
                }
            }
            this._selectList.push(item);
            item.selected = true;
            this.updateKeyCtrl();
        }

        unselect(item: ComponentCtrl): void {
            if (!item) {
                return;
            }
            if (!sear.arrayDelete(this._selectList, item)) {
                return;
            }
            item.selected = false;
            this.updateKeyCtrl();
        }

        /** 取消所有选择*/
        cancel(): void {
            for (let item of this._selectList) {
                item.selected = false;
            }
            this._selectList.length = 0;
            this.updateKeyCtrl();
        }

        get isSelect(): boolean {
            return this._selectList.length > 0;
        }
        get onlyOne(): boolean {
            return this._selectList.length == 1;
        }
        get targetCtrl(): ComponentCtrl {
            return this.isSelect ? this._selectList[0] : null;
        }

        // ==================================================================================
        private updateKeyCtrl(): void {
            if (this.onlyOne) {
                keyCtrl.setComCtrl(this.targetCtrl);
            } else {
                keyCtrl.setComCtrl(null);
            }
        }

        // ==================================================================================
        /** 添加组件*/
        addComponent(data: ComData): void {
            record.recordNew();
            let item: ComponentCtrl = new ComponentCtrl(data);
            panelCtrl.treeCtrl.addNode(item, this.targetCtrl);
            this.select(item, true);
        }

        // ==================================================================================
        /** 删除组件*/
        delete(): void {
            if (!this.isSelect) {
                return;
            }
            record.recordNew();
            for (let item of this._selectList) {
                item.removeSelf();
            }
            this.cancel();
        }

        // ==================================================================================
        private _saveComCtrl: ComponentCtrl[] = [];

        /** 剪切组件*/
        cut(): void {
            if (!this.isSelect) {
                return;
            }
            this._saveComCtrl.length = 0;
            for (let item of this._selectList) {
                if (this.hasSelectParent(item)) {
                    continue;
                }
                item.removeSelf();
                this._saveComCtrl.push(item);
            }
        }

        private hasSelectParent(child: ComponentCtrl): boolean {
            for (let item of this._selectList) {
                if (this.isParent(child, item)) {
                    return false;
                }
            }
            return true;
        }

        private isParent(child: ComponentCtrl, parent: ComponentCtrl): boolean {
            if (!child || !parent) {
                return false;
            }
            while (child) {
                if (child.parent == parent) {
                    return true;
                }
                child = child.parent;
            }
            return false;
        }

        /** 复制组件*/
        copy(): void {
            if (!this.isSelect) {
                return;
            }
            this._saveComCtrl.length = 0;
            for (let item of this._selectList) {
                this._saveComCtrl.push(item.clone());
            }
        }

        /** 粘贴组件*/
        paste(): void {
            if (this._saveComCtrl.length == 0) {
                return;
            }
            record.recordNew();

            this._saveComCtrl.sort();
            for (let item of this._saveComCtrl) {
                panelCtrl.treeCtrl.addNode(item, this.targetCtrl);
            }
        }

        // ==================================================================================
        /** 组件层级前移*/
        toTop(): void {
            if (!this.onlyOne) {
                mainUI.setPrompt("仅能操作单个组件");
                return;
            }
            record.recordNew();
            this.targetCtrl.toTop();
        }

        /** 组件层次后移*/
        toBottom(): void {
            if (!this.onlyOne) {
                mainUI.setPrompt("仅能操作单个组件");
                return;
            }
            record.recordNew();
            this.targetCtrl.toBottom();
        }

        // ==================================================================================
        toAlign(align: string): void {

        }

        toValign(valign: string): void {

        }

        toOriginalSize(): void {

        }

        // ==================================================================================
        moveUp(): void {
        }

        moveDown(): void {

        }

        moveLeft(): void {

        }

        moveRight(): void {

        }

        // ==================================================================================
        dragStart(ctrl: ComponentCtrl): void {

        }

        dragEnd(ctrl: ComponentCtrl): void {

        }
    }
}