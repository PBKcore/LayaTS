var sear;
(function (sear) {
    var event;
    (function (event_1) {
        var pool = null;
        function GetPool() {
            return pool || (pool = new sear.pool.Pool(Event, 50));
        }
        function PoolPop() {
            return GetPool().Pop();
        }
        event_1.PoolPop = PoolPop;
        function PoolPush(event) {
            GetPool().Push(event);
        }
        /**
         * 事件
         *
         * @author pbk
         */
        var Event = /** @class */ (function () {
            function Event() {
                this.isDispose = false;
            }
            Event.prototype.Clean = function () {
                this.type = null;
                this.data = null;
            };
            Event.prototype.Dispose = function () {
                this.Clean();
                this.isDispose = true;
            };
            /** 回收进对象池*/
            Event.prototype.Recover = function () {
                PoolPush(this);
            };
            return Event;
        }());
    })(event = sear.event || (sear.event = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Event.js.map