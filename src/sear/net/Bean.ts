module sear.net {
    import Bytes = sear.struct.Bytes;
    
    /**
     * 
     * 
     * @author pbk
     */
    export class Bean {
        protected _bytes: Bytes;

        constructor() {
        }

        /** 将Bean的数据写入byte中*/
        write(byte: Bytes): boolean {
            this._bytes = byte;
            return this.writing();
        }

        /** 将byte的数据读入Bean中*/
        read(byte: Bytes): boolean {
            this._bytes = byte;
            return this.reading();
        }

        /** 【继承】写入具体数据*/
        writing(): boolean {
            return true;
        }

        /** 【继承】读取具体数据*/
        reading(): boolean {
            return false;
        }

        writeByte(value: number): void {
            this._bytes.writeByte(value);
        }
        readByte(): number {
            return this._bytes.getByte();
        }
        writeBool(value: boolean): void {
            this.writeByte(value ? 1 : 0);
        }
        readBool(): boolean {
            return this.readByte() != 0;
        }
        writeInt16(value: number): void {
            this._bytes.writeInt16(value);
        }
        readInt16(): number {
            return this._bytes.getInt16();
        }
        writeInt32(value: number): void {
            this._bytes.writeInt32(value);
        }
        readInt32(): number {
            return this._bytes.getInt32();
        }
        writeUint8(value: number): void {
            this._bytes.writeUint8(value);
        }
        readUint8(): number {
            return this._bytes.getUint8();
        }
        writeUint16(value: number): void {
            this._bytes.writeUint16(value);
        }
        readUint16(): number {
            return this._bytes.getUint16();
        }
        writeUint32(value: number): void {
            this._bytes.writeUint32(value);
        }
        readUint32(): number {
            return this._bytes.getUint32();
        }
        writeFloat32(value: number): void {
            this._bytes.writeFloat32(value);
        }
        readFloat32(): number {
            return this._bytes.getFloat32();
        }
        writeFloat64(value: number): void {
            this._bytes.writeFloat64(value);
        }
        readFloat64(): number {
            return this._bytes.getFloat64();
        }
        writeString(value: string): void {
            this._bytes.writeUTFString(value);
        }
        readString(): string {
            return this._bytes.getUTFString();
        }
        writeBean(value: Bean): void {
            value.write(this._bytes);
        }
        readBean(beanClass: any): Bean {
            let bean: Bean = new beanClass();
            bean.write(this._bytes);
            return bean;
        }

        get size(): number {
            return this._bytes ? this._bytes.length : 0;
        }
    }
}