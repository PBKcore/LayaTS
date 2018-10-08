var sear;
(function (sear) {
    var pool;
    (function (pool) {
        /**
         * 对象池
         *
         * @author pbk
         */
        var Pool = /** @class */ (function () {
            function Pool(nodeClass, max) {
                this._nodeClass = nodeClass;
                this._maxCount = max;
                this._list = [];
            }
            /** 压入对象*/
            Pool.prototype.push = function (node) {
                if (node == null) {
                    sear.error("[ObjectPool Push] node is null");
                    return;
                }
                if (node.destroyed) {
                    sear.error("[ObjectPool Push] node was destroyed");
                    return;
                }
                if (this._list.indexOf(node) != -1) {
                    return;
                }
                if (this._list.length < this._maxCount) {
                    node.clear();
                    this._list.push(node); // 存储对象
                }
                else {
                    node.destroy(); // 对象池已满，拒绝并销毁对象
                }
            };
            /** 取出对象*/
            Pool.prototype.pop = function () {
                if (this._list.length > 0) {
                    return this._list.pop();
                }
                else {
                    return new this._nodeClass();
                }
            };
            /** 清理对象池数据*/
            Pool.prototype.clear = function () {
                for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                    var node = _a[_i];
                    node.destroy();
                }
                this._list.length = 0;
            };
            Object.defineProperty(Pool.prototype, "maxCount", {
                /** 对象池最大存储数*/
                set: function (value) {
                    this._maxCount = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Pool.prototype, "count", {
                /** 对象池当前存储数*/
                get: function () {
                    return this._list.length;
                },
                enumerable: true,
                configurable: true
            });
            return Pool;
        }());
        pool.Pool = Pool;
    })(pool = sear.pool || (sear.pool = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Pool.js.map