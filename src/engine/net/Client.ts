module engine.net {
    import MessagePool = sear.net.MessagePool;
    import Message = sear.net.Message;
    import Socket = sear.net.Socket;
    import Handler = sear.struct.Handler;
    import Bytes = sear.struct.Bytes;

    /**
     * 
     * 
     * @author pbk
     */
    export class Client {
        static _ins: Client;
        static ins(): Client {
            Client._ins || (Client._ins = new Client());
            return Client._ins;
        }

        private _msgPool: MessagePool;
        private _socket: Socket;

        constructor() {
            this._msgPool = new MessagePool();
            this._socket = new Socket();
            this._socket.recvHandelr = Handler.create(this, this.recv);
            this._bytesCache = sear.pool.getByte();
        }

        get msgPool(): MessagePool {
            return this._msgPool;
        }
        get socket(): Socket {
            return this._socket;
        }

        // ===============================================================
        private _msgNum: number = 0;// 发送的消息数

        private _bytesCache: Bytes;// 缓存字节
        private _remByteCnt: number = 0;// 剩余字节数

        send(message: Message): void {
            let bytes: Bytes = sear.pool.getByte();
            bytes.writeInt32(this._msgNum);// 消息数，用于发消息监测
            bytes.writeInt32(message.id);// 消息ID
            bytes.writeInt32(this._msgNum == 0 ? 0 : this.timeCheck);

            message.write(bytes);// 序列化消息体

            bytes.pos = 0;
            let magic = ((~this._msgNum & bytes.length) | (this._msgNum & ~bytes.length));
            magic = ((~magic & (1 << 9)) | (magic & ~(1 << 9)));
            bytes.writeInt32(magic);

            this._socket.sendByte(bytes);

            bytes.recover();
            this._msgNum += 1;
        }

        recv(bytes: Bytes): void {
            this._bytesCache.pos = this._remByteCnt;
            this._bytesCache.writeBytes(bytes);
            this._bytesCache.pos = 0;
            this._remByteCnt = this._bytesCache.bytesAvailable;

            while (true) {
                if (this._remByteCnt < 4) {// 消息残缺 int都读不出来
                    let tBytes: Bytes = sear.pool.getByte();
                    tBytes.writeBytes(this._bytesCache, this._bytesCache.pos);
                    this._bytesCache.recover();
                    this._bytesCache = tBytes;
                    break;
                }

                let msgLen: number = bytes.getInt32();// 读取：当前消息长度
                //     ff  		   ffffff
                // 是否压缩(0,1)     长度
                let isCompress: number = ((msgLen >> 24) & 0xff);
                msgLen = (msgLen & 0x00ffffff);

                if (this._remByteCnt < msgLen + 4) {// 消息残缺
                    let tBytes: Bytes = sear.pool.getByte();
                    tBytes.writeBytes(this._bytesCache, this._bytesCache.pos - 4);
                    this._bytesCache.recover;
                    this._bytesCache = tBytes;
                    break;
                }

                let msgId: number = bytes.getInt32();// 读取：消息ID
                let message: Message = this._msgPool.GetMessage(msgId);// 获取消息

                let tBytes: Bytes = sear.pool.getByte();
                if (!message) {
                    let len: number = msgLen - 4;
                    if (len > 0) {
                        this._bytesCache.readBytes(tBytes, 0, len);
                    }
                    this._remByteCnt = this._bytesCache.bytesAvailable;
                    if (this._remByteCnt == 0) {
                        this._bytesCache.clear();
                    } else {
                        continue;
                    }
                }

                // 反序列化消息
                msgLen -= 4;// 减去消息长度int
                try {
                    if (msgLen > 0) {
                        bytes.readBytes(tBytes, 0, msgLen);
                        if (isCompress == 1) {
                            tBytes.uncompress();
                        }
                    }
                    message.read(tBytes);// 向消息中写入数据
                } catch (error) {
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
                let handler: Handler = this._msgPool.GetHandler(msgId);

                try {
                    handler.runWith(message);
                } catch (error) {
                    sear.error("[MESSAGE]Execute handler id:" + message.id);
                }

                if (this._remByteCnt == 0) {// 缓存为空
                    this._bytesCache.clear();
                    break;
                }
            }
        }

        // ===============================================================
        private _serverTime: number = 0;
        private _clientTime: number = 0;

        /** 设置服务器时间*/
        setServerTime(time: number): void {
            this._serverTime = time;
            this._clientTime = sear.frame.runTime;
        }

        get timeCheck(): number {
            return this._serverTime > 0 ? sear.frame.runTime - this._clientTime : 0;
        }
    }
}