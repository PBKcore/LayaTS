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
    var net;
    (function (net) {
        var EventDispatcher = sear.event.EventDispatcher;
        /**
         *
         *
         * @author pbk
         */
        var Socket = /** @class */ (function (_super) {
            __extends(Socket, _super);
            function Socket() {
                var _this = _super.call(this) || this;
                _this._connected = false;
                /** 接收消息回调函数*/
                _this.recvHandelr = null;
                return _this;
            }
            Socket.prototype.connect = function (ip, port) {
                this._ip = ip;
                this._port = port;
                this._socket || (this._socket = new Laya.Socket());
                this._socket.disableInput = true;
                this._socket.on(sear.Event.OPEN, this, this.onSocketOpen);
                this._socket.on(sear.Event.CLOSE, this, this.onSocketClose);
                this._socket.on(sear.Event.MESSAGE, this, this.onSocketMessage);
                this._socket.on(sear.Event.ERROR, this, this.onSocketError);
                sear.log("socket connect ip:" + ip + " port:" + port);
                this._connected = false;
                this._socket.connect(ip, port);
            };
            Socket.prototype.close = function () {
                if (!this.connected) {
                    return;
                }
                sear.log("socket close ip:" + this._ip + " port:" + this._port);
                this._socket.close();
            };
            Socket.prototype.onSocketOpen = function () {
                this._connected = true;
                sear.log("socket connect success");
                this.event(sear.Event.OPEN);
            };
            Socket.prototype.onSocketClose = function () {
                this._connected = false;
                sear.log("socket connect close");
                this.event(sear.Event.CLOSE);
            };
            Socket.prototype.onSocketError = function () {
                this._connected = false;
                sear.log("socket connect error");
                this.event(sear.Event.ERROR);
            };
            /** 接收数据*/
            Socket.prototype.onSocketMessage = function (data) {
                if (!this.recvHandelr) {
                    return;
                }
                if (data instanceof ArrayBuffer) {
                    var bytes = sear.pool.getByte();
                    bytes.writeArrayBuffer(data);
                    this.recvHandelr.runWith(bytes);
                    bytes.recover();
                }
            };
            /** 发送数据消息*/
            Socket.prototype.sendByte = function (bytes) {
                if (!this.connected || !bytes) {
                    return;
                }
                var sendBytes = sear.pool.getByte();
                sendBytes.writeInt32(bytes.length); // 写入消息长度
                sendBytes.writeBytes(bytes); // 写入消息
                this._socket.send(sendBytes.buffer);
                this._socket.flush();
                sendBytes.recover();
            };
            Object.defineProperty(Socket.prototype, "ip", {
                get: function () {
                    return this._ip;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Socket.prototype, "port", {
                get: function () {
                    return this._port;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Socket.prototype, "connected", {
                get: function () {
                    return this._connected;
                },
                enumerable: true,
                configurable: true
            });
            return Socket;
        }(EventDispatcher));
        net.Socket = Socket;
    })(net = sear.net || (sear.net = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Socket.js.map