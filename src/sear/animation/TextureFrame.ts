module sear.animation {
    import IPool = sear.pool.IPool;

    /**
     * 帧纹理信息
     * 对象池管理
     * 
     * 需修改，Texture自带偏移。等做动画编辑器时完善
     * 
     * @author pbk
     */
    export class TextureFrame implements IPool {
        private _textures: Texture[] = [];
        private _offxs: number[] = [];
        private _offys: number[] = [];
        width: number = 0;
        height: number = 0;

        constructor() {
        }

        addTexture(texture: Texture, offx: number, offy: number): void {
            this._textures.push(texture);
            this._offxs.push(offx);
            this._offys.push(offy);
        }

        clear(): void {
            this._textures = [];
            this._offxs = [];
            this._offys = [];
            this.width = 0;
            this.height = 0;
        }

        destroy(): void {
            this._textures = null;
            this._offxs = null;
            this._offys = null;
            this._destroyed = true;
        }

        private _destroyed: boolean = false;
        get destroyed(): boolean {
            return this._destroyed;
        }

        /** 回收进对象池*/
        recover(): void {
            pool.recTextureFrame(this);
        }

        get textures(): Texture[] {
            return this._textures;
        }

        get offxs(): number[] {
            return this._offxs;
        }

        get offys(): number[] {
            return this._offys;
        }

        get length(): number {
            return this._textures != null ? this._textures.length : 0;
        }

        get isFixSize(): boolean {
            return this.width > 0 && this.height > 0;
        }
    }
}