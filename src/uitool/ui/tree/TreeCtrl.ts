module uitool.ui.tree {

    /**
     * 组件节点树控制（增删查改）
     * 
     * @author pbk
     */
    export class TreeCtrl {
        constructor() {
        }

        clean(): void {
            if (this._headNode) {
                this.delHead(this._headNode);
            }
        }

        // ================================================================================== 显示列表
        private _headNode: ComponentCtrl;

        /**
         * 添加一个新组件，添加一个节点，会判空
         * @param itemCtrl 
         * @param treeCtrl 
         */
        addNode(itemCtrl: ComponentCtrl, treeCtrl: ComponentCtrl): void {
            if (this._headNode) {
                if (treeCtrl) {
                    treeCtrl.addChild(itemCtrl);
                } else {
                    this._headNode.addChild(itemCtrl);
                }
            } else {
                this.addHead(itemCtrl);
            }
        }

        addHead(head: ComponentCtrl, isRecord: boolean = true): void {
            if (this._headNode) {
                sear.error("Tree Head node add reapt!");
                return;
            }
            if (isRecord) {
                record.recordOrder(record.ADD, this._headNode, [null, 0, null, 0]);
            }

            this._headNode = head;
            mainUI.layerShow.addChild(head.uiIns);
            this.updateShowLater();
        }

        delHead(head: ComponentCtrl, isRecord: boolean = true): void {
            if (!this._headNode) {
                sear.error("Tree Head node delete null!");
                return;
            } else if (this._headNode != head) {
                sear.error("Tree Head node delete different!");
                return;
            }
            if (isRecord) {
                record.recordOrder(record.DELETE, this._headNode, [null, 0]);
            }

            this._headNode.uiIns.removeSelf();
            this._headNode = null;
            this.updateShowLater();
            selectCtrl.cancel();
        }

        updateShowLater(): void {
            sear.callLater(this, this.updateShow);
        }

        private updateShow(): void {
            this.scroll.removeAllChilds(false);
            this.showNode(this._headNode, 0, 0);
        }

        private showNode(node: ComponentCtrl, offY: number, layer: number): number {
            if (node) {
                node.treeItem.x = layer * 20;
                node.treeItem.y = offY;
                offY += node.treeItemHeight;
                this.scroll.addChild(node.treeItem);

                layer += 1;
                for (let child of node.childs) {
                    offY = this.showNode(child, offY, layer);
                }
            }
            return offY;
        }

        /** 滚动容器*/
        get scroll(): sear.ui.ScrollPanel {
            return mainUI.scrollTree;
        }

        // ==================================================================================
        /** 根据名字查找组件*/
        find(name: string): ComponentCtrl {
            return this.findNode(this._headNode, name);;
        }

        private findNode(node: ComponentCtrl, name: string): ComponentCtrl {
            if (!node) {
                return null;
            }
            if (node.name == name) {
                return node;
            }
            for (let child of node.childs) {
                child = this.findNode(child, name);
                if (child) {
                    return child;
                }
            }
            return null;
        }
    }
}