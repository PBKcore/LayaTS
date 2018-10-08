var uitool;
(function (uitool) {
    /**
     * 组件属性键值控制
     *
     * @author pbk
     */
    var KVCtrl = /** @class */ (function () {
        function KVCtrl() {
        }
        KVCtrl.prototype.setComCell = function (cell) {
            this._cell = cell;
        };
        Object.defineProperty(KVCtrl.prototype, "fileName", {
            // =================================================================
            /** 文件名*/
            get: function () {
                return "";
            },
            enumerable: true,
            configurable: true
        });
        return KVCtrl;
    }());
    uitool.KVCtrl = KVCtrl;
})(uitool || (uitool = {}));
//# sourceMappingURL=KVCtrl.js.map