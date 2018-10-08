module sear.net {
    import EventDispatcher = sear.event.EventDispatcher;
    import Handler = sear.struct.Handler;
    import Bytes = sear.struct.Bytes;

    /**
     * 
     * 
     * @author pbk
     */
    export class Socket extends EventDispatcher {
        private _socket: Laya.Socket;

        private _ip: string;
        private _port: number;
        private _connected: boolean = false;

        /** 接收消息回调函数*/
        recvHandelr: Handler = null;

        constructor() {
            super();
        }

        connect(ip: string, port: number): void {
            this._ip = ip;
            this._port = port;
            this._socket || (this._socket = new Laya.Socket());
            this._socket.disableInput = true;

            this._socket.on(Event.OPEN, this, this.onSocketOpen);
            this._socket.on(Event.CLOSE, this, this.onSocketClose);
            this._socket.on(Event.MESSAGE, this, this.onSocketMessage);
            this._socket.on(Event.ERROR, this, this.onSocketError);

            log("socket connect ip:" + ip + " port:" + port);
            this._connected = false;
            this._socket.connect(ip, port);
        }

        close(): void {
            if (!this.connected) {
                return;
            }
            log("socket close ip:" + this._ip + " port:" + this._port);
            this._socket.close();
        }

        private onSocketOpen(): void {
            this._connected = true;
            log("socket connect success");
            this.event(Event.OPEN);
        }

        private onSocketClose(): void {
            this._connected = false;
            log("socket connect close");
            this.event(Event.CLOSE);
        }

        private onSocketError(): void {
            this._connected = false;
            log("socket connect error");
            this.event(Event.ERROR);
        }

        /** 接收数据*/
        private onSocketMessage(data: any): void {
            if (!this.recvHandelr) {
                return;
            }
            if (data instanceof ArrayBuffer) {
                let bytes: Bytes = pool.getByte();
                bytes.writeArrayBuffer(data);
                this.recvHandelr.runWith(bytes);
                bytes.recover();
            }
        }

        /** 发送数据消息*/
        sendByte(bytes: Bytes): void {
            if (!this.connected || !bytes) {
                return;
            }

            let sendBytes: Bytes = pool.getByte();
            sendBytes.writeInt32(bytes.length);// 写入消息长度
            sendBytes.writeBytes(bytes);// 写入消息

            this._socket.send(sendBytes.buffer);
            this._socket.flush();

            sendBytes.recover();
        }

        get ip(): string {
            return this._ip;
        }
        get port(): number {
            return this._port;
        }
        get connected(): boolean {
            return this._connected;
        }
    }
}