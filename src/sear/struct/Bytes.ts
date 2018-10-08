module sear.struct {
    import IPool = sear.pool.IPool;

    /**
     * 二进制数据
     * 对象池管理
     * 
     * @author pbk
     */
    export class Bytes extends laya.utils.Byte implements IPool {
        constructor() {
            super();
        }

        writeBytes(bytes: Bytes, offset: number = 0, length: number = 0): void {
            bytes.pos = 0;
            this.writeArrayBuffer(bytes.getUint8Array(0, bytes.length), offset, length);
        }

        readBytes(bytes: Bytes, offset: number = 0, length: number = 0): void {
            if (offset < 0) {
                offset = 0;
            }
            if (length <= 0) {
                length = this.length - this.pos;
            }
            bytes.writeArrayBuffer(this.getUint8Array(this.pos + offset, length));
        }

        getBytes(offset: number, length: number): Bytes {
            let byte: Bytes = pool.getByte();
            byte.writeArrayBuffer(this.getUint8Array(this.pos + offset, length));
            byte.pos = 0;
            return byte;
        }

        uncompress(): void {
            // let inflate = new Zlib.Inflate(this._u8d_);
            // this._u8d_ = inflate.decompress();
            // this._d_ = new DataView(this._u8d_.buffer);
        }

        compress(): void {
            // let deflate = new Zlib.Deflate(this._byteView_);
            // this._byteView_ = deflate.compress();
            // this._data_ = new DataView(this._byteView_.buffer);
        }

        destroy(): void {
            this.clear();
            this._destroyed = true;
        }

        private _destroyed: boolean = false;
        get destroyed(): boolean {
            return this._destroyed;
        }

        /** 回收进对象池*/
        recover(): void {
            pool.recByte(this);
        }
    }
}