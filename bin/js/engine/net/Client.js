var engine;
(function (engine) {
    var net;
    (function (net) {
        var MessagePool = sear.net.MessagePool;
        var Socket = sear.net.Socket;
        var Handler = sear.struct.Handler;
        /**
         *
         *
         * @author pbk
         */
        var Client = /** @class */ (function () {
            function Client() {
                // ===============================================================
                this._msgNum = 0; // 发送的消息数
                this._remByteCnt = 0; // 剩余字节数
                // ===============================================================
                this._serverTime = 0;
                this._clientTime = 0;
                this._msgPool = new MessagePool();
                this._socket = new Socket();
                this._socket.recvHandelr = Handler.create(this, this.recv);
                this._bytesCache = sear.pool.getByte();
            }
            Client.ins = function () {
                Client._ins || (Client._ins = new Client());
                return Client._ins;
            };
            Object.defineProperty(Client.prototype, "msgPool", {
                get: function () {
                    return this._msgPool;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Client.prototype, "socket", {
                get: function () {
                    return this._socket;
                },
                enumerable: true,
                configurable: true
            });
            Client.prototype.send = function (message) {
                var bytes = sear.pool.getByte();
                bytes.writeInt32(this._msgNum); // 消息数，用于发消息监测
                bytes.writeInt32(message.id); // 消息ID
                bytes.writeInt32(this._msgNum == 0 ? 0 : this.timeCheck);
                message.write(bytes); // 序列化消息体
                bytes.pos = 0;
                var magic = ((~this._msgNum & bytes.length) | (this._msgNum & ~bytes.length));
                magic = ((~magic & (1 << 9)) | (magic & ~(1 << 9)));
                bytes.writeInt32(magic);
                this._socket.sendByte(bytes);
                bytes.recover();
                this._msgNum += 1;
            };
            Client.prototype.recv = function (bytes) {
                this._bytesCache.pos = this._remByteCnt;
                this._bytesCache.writeBytes(bytes);
                this._bytesCache.pos = 0;
                this._remByteCnt = this._bytesCache.bytesAvailable;
                while (true) {
                    if (this._remByteCnt < 4) { // 消息残缺 int都读不出来
                        var tBytes_1 = sear.pool.getByte();
                        tBytes_1.writeBytes(this._bytesCache, this._bytesCache.pos);
                        this._bytesCache.recover();
                        this._bytesCache = tBytes_1;
                        break;
                    }
                    var msgLen = bytes.getInt32(); // 读取：当前消息长度
                    //     ff  		   ffffff
                    // 是否压缩(0,1)     长度
                    var isCompress = ((msgLen >> 24) & 0xff);
                    msgLen = (msgLen & 0x00ffffff);
                    if (this._remByteCnt < msgLen + 4) { // 消息残缺
                        var tBytes_2 = sear.pool.getByte();
                        tBytes_2.writeBytes(this._bytesCache, this._bytesCache.pos - 4);
                        this._bytesCache.recover;
                        this._bytesCache = tBytes_2;
                        break;
                    }
                    var msgId = bytes.getInt32(); // 读取：消息ID
                    var message = this._msgPool.GetMessage(msgId); // 获取消息
                    var tBytes = sear.pool.getByte();
                    if (!message) {
                        var len = msgLen - 4;
                        if (len > 0) {
                            this._bytesCache.readBytes(tBytes, 0, len);
                        }
                        this._remByteCnt = this._bytesCache.bytesAvailable;
                        if (this._remByteCnt == 0) {
                            this._bytesCache.clear();
                        }
                        else {
                            continue;
                        }
                    }
                    // 反序列化消息
                    msgLen -= 4; // 减去消息长度int
                    try {
                        if (msgLen > 0) {
                            bytes.readBytes(tBytes, 0, msgLen);
                            if (isCompress == 1) {
                                tBytes.uncompress();
                            }
                        }
                        message.read(tBytes); // 向消息中写入数据
                    }
                    catch (error) {
                        sear.error("[MESSAGE]Read bytes id：" + message.id);
                        this._remByteCnt = this._bytesCache.bytesAvailable;
                        continue;
                    }
                    if (tBytes.bytesAvailable > 0) {
                        sear.error("[MESSAGE]bytesAvailable > 0" + " id:" + message.id + " msgLen:" + msgLen + " remain:" + tBytes.bytesAvailable);
                        this._remByteCnt = this._bytesCache.bytesAvailable;
                        continue;
                    }
                    tBytes.recover();
                    this._remByteCnt = this._bytesCache.bytesAvailable;
                    var handler = this._msgPool.GetHandler(msgId);
                    try {
                        handler.runWith(message);
                    }
                    catch (error) {
                        sear.error("[MESSAGE]Execute handler id:" + message.id);
                    }
                    if (this._remByteCnt == 0) { // 缓存为空
                        this._bytesCache.clear();
                        break;
                    }
                }
            };
            /** 设置服务器时间*/
            Client.prototype.setServerTime = function (time) {
                this._serverTime = time;
                this._clientTime = sear.frame.runTime;
            };
            Object.defineProperty(Client.prototype, "timeCheck", {
                get: function () {
                    return this._serverTime > 0 ? sear.frame.runTime - this._clientTime : 0;
                },
                enumerable: true,
                configurable: true
            });
            return Client;
        }());
        net.Client = Client;
    })(net = engine.net || (engine.net = {}));
})(engine || (engine = {}));
//# sourceMappingURL=Client.js.map