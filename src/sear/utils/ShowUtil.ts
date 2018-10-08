module sear.utils {
    import Point = sear.maths.Point;

    /**
     * 显示工具（针对Sprite和Node的接口）
     * 
     * @author pbk
     */
    export class ShowUtil {

        static getSprite(url: string, width: number = 0, height: number = 0,
            cacheAs: string = "none", completeCaller: any = null, completeMethod: Function = null): Sprite {
            let sprite: Sprite = new Sprite();
            sprite.width = width;
            sprite.height = height;
            sprite.cacheAs = cacheAs;
            sprite.loadImage(url, 0, 0, width, height, !completeMethod ? null : Laya.Handler.create(completeCaller, completeMethod, null, true));
            return sprite;
        }

        /**
         * 克隆Sprite（仅基本描述信息）
         * @param og 
         * @param ret 
         */
        static cloneSprite(og: Sprite, ret: Sprite): Sprite {
            ret || (ret = new Sprite());
            ret.width = og.width;
            ret.height = og.height;
            ret.x = og.x;
            ret.y = og.y;
            ret.scaleX = og.scaleX;
            ret.scaleY = og.scaleY;
            ret.rotation = og.rotation;
            ret.visible = og.visible;
            ret.cacheAs = og.cacheAs;
            ret.staticCache = og.staticCache;
            return ret;
        }

        static cloneComponent(og: Component, ret: Component): Component {
            ret || (ret = new Component());
            ShowUtil.cloneSprite(og, ret);
            ret.tag = og.tag;
            ret.toolTip = og.toolTip;
            return ret;
        }

        // ==================================================================================
        static toTop(node: Node): void {
            if (!node || !node.parent) {
                return;
            }
            let idx: number = node.parent.numChildren - 1;
            if (node.parent.getChildIndex(node) != idx) {
                node.parent.setChildIndex(node, idx);
            }
        }

        static toBottom(node: Node): void {
            if (!node || !node.parent) {
                return;
            }
            if (node.parent.getChildIndex(node) != 0) {
                node.setChildIndex(node, 0);
            }
        }

        /**
         * 获取指定对象到父对象的相对位置（注意：返回是临时变量，勿存储使用）
         * @param target 
         * @param parent 默认时舞台根容器。若不存在层级关系，则返回默认容器结果
         */
        static relativePos(target: Sprite, parent: Node = null): Point {
            parent || (parent = sear.stage);
            let ret: Point = Point.TEMP;
            while (target != null && target != parent) {
                ret.x += target.x;
                ret.y += target.y;
                target = <Sprite>target.parent;
            }
            return ret;
        }
    }
}