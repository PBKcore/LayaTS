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
        /**
         *
         *
         * @author pbk
         */
        var Message = /** @class */ (function (_super) {
            __extends(Message, _super);
            function Message() {
                return _super.call(this) || this;
            }
            Object.defineProperty(Message.prototype, "id", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            return Message;
        }(net.Bean));
        net.Message = Message;
    })(net = sear.net || (sear.net = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Message.js.map