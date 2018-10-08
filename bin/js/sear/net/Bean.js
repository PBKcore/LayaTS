var sear;
(function (sear) {
    var net;
    (function (net) {
        /**
         *
         *
         * @author pbk
         */
        var Bean = /** @class */ (function () {
            function Bean() {
            }
            /** 将Bean的数据写入byte中*/
            Bean.prototype.write = function (byte) {
                this._bytes = byte;
                return this.writing();
            };
            /** 将byte的数据读入Bean中*/
            Bean.prototype.read = function (byte) {
                this._bytes = byte;
                return this.reading();
            };
            /** 【继承】写入具体数据*/
            Bean.prototype.writing = function () {
                return true;
            };
            /** 【继承】读取具体数据*/
            Bean.prototype.reading = function () {
                return false;
            };
            Bean.prototype.writeByte = function (value) {
                this._bytes.writeByte(value);
            };
            Bean.prototype.readByte = function () {
                return this._bytes.getByte();
            };
            Bean.prototype.writeBool = function (value) {
                this.writeByte(value ? 1 : 0);
            };
            Bean.prototype.readBool = function () {
                return this.readByte() != 0;
            };
            Bean.prototype.writeInt16 = function (value) {
                this._bytes.writeInt16(value);
            };
            Bean.prototype.readInt16 = function () {
                return this._bytes.getInt16();
            };
            Bean.prototype.writeInt32 = function (value) {
                this._bytes.writeInt32(value);
            };
            Bean.prototype.readInt32 = function () {
                return this._bytes.getInt32();
            };
            Bean.prototype.writeUint8 = function (value) {
                this._bytes.writeUint8(value);
            };
            Bean.prototype.readUint8 = function () {
                return this._bytes.getUint8();
            };
            Bean.prototype.writeUint16 = function (value) {
                this._bytes.writeUint16(value);
            };
            Bean.prototype.readUint16 = function () {
                return this._bytes.getUint16();
            };
            Bean.prototype.writeUint32 = function (value) {
                this._bytes.writeUint32(value);
            };
            Bean.prototype.readUint32 = function () {
                return this._bytes.getUint32();
            };
            Bean.prototype.writeFloat32 = function (value) {
                this._bytes.writeFloat32(value);
            };
            Bean.prototype.readFloat32 = function () {
                return this._bytes.getFloat32();
            };
            Bean.prototype.writeFloat64 = function (value) {
                this._bytes.writeFloat64(value);
            };
            Bean.prototype.readFloat64 = function () {
                return this._bytes.getFloat64();
            };
            Bean.prototype.writeString = function (value) {
                this._bytes.writeUTFString(value);
            };
            Bean.prototype.readString = function () {
                return this._bytes.getUTFString();
            };
            Bean.prototype.writeBean = function (value) {
                value.write(this._bytes);
            };
            Bean.prototype.readBean = function (beanClass) {
                var bean = new beanClass();
                bean.write(this._bytes);
                return bean;
            };
            Object.defineProperty(Bean.prototype, "size", {
                get: function () {
                    return this._bytes ? this._bytes.length : 0;
                },
                enumerable: true,
                configurable: true
            });
            return Bean;
        }());
        net.Bean = Bean;
    })(net = sear.net || (sear.net = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Bean.js.map