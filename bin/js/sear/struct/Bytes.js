var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var sear;
(function (sear) {
    var struct;
    (function (struct) {
        /**
         * 二进制数据
         * 对象池管理
         *
         * @author pbk
         */
        var Bytes = /** @class */ (function (_super) {
            __extends(Bytes, _super);
            function Bytes() {
                var _this = _super.call(this) || this;
                _this._destroyed = false;
                return _this;
            }
            Bytes.prototype.writeBytes = function (bytes, offset, length) {
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = 0; }
                bytes.pos = 0;
                this.writeArrayBuffer(bytes.getUint8Array(0, bytes.length), offset, length);
            };
            Bytes.prototype.readBytes = function (bytes, offset, length) {
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = 0; }
                if (offset < 0) {
                    offset = 0;
                }
                if (length <= 0) {
                    length = this.length - this.pos;
                }
                bytes.writeArrayBuffer(this.getUint8Array(this.pos + offset, length));
            };
            Bytes.prototype.getBytes = function (offset, length) {
                var byte = sear.pool.getByte();
                byte.writeArrayBuffer(this.getUint8Array(this.pos + offset, length));
                byte.pos = 0;
                return byte;
            };
            Bytes.prototype.uncompress = function () {
                // let inflate = new Zlib.Inflate(this._u8d_);
                // this._u8d_ = inflate.decompress();
                // this._d_ = new DataView(this._u8d_.buffer);
            };
            Bytes.prototype.compress = function () {
                // let deflate = new Zlib.Deflate(this._byteView_);
                // this._byteView_ = deflate.compress();
                // this._data_ = new DataView(this._byteView_.buffer);
            };
            Bytes.prototype.destroy = function () {
                this.clear();
                this._destroyed = true;
            };
            Object.defineProperty(Bytes.prototype, "destroyed", {
                get: function () {
                    return this._destroyed;
                },
                enumerable: true,
                configurable: true
            });
            /** 回收进对象池*/
            Bytes.prototype.recover = function () {
                sear.pool.recByte(this);
            };
            return Bytes;
        }(laya.utils.Byte));
        struct.Bytes = Bytes;
    })(struct = sear.struct || (sear.struct = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Bytes.js.map