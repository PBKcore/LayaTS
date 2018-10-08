var test;
(function (test) {
    /**
     *
     *
     * @author pbk
     */
    var TestA = /** @class */ (function () {
        function TestA() {
            // Laya.getset(false, this, "w", this.w, this.w)
            this._w = 0;
        }
        TestA.prototype.tw = function () {
            return 1;
        };
        Object.defineProperty(TestA.prototype, "t", {
            get: function () {
                return this.tw();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TestA.prototype, "w", {
            get: function () {
                return this._w;
            },
            set: function (value) {
                this._w = value;
            },
            enumerable: true,
            configurable: true
        });
        return TestA;
    }());
    test.TestA = TestA;
})(test || (test = {}));
//# sourceMappingURL=TestA.js.map