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
var test;
(function (test) {
    /**
     *
     *
     * @author pbk
     */
    var TestB = /** @class */ (function (_super) {
        __extends(TestB, _super);
        function TestB() {
            return _super.call(this) || this;
        }
        TestB.prototype.tw = function () {
            return 2;
        };
        TestB.prototype.test = function () {
            sear.log(this.w);
            sear.log(this.tw());
            sear.log(_super.prototype.tw.call(this));
        };
        Object.defineProperty(TestB.prototype, "w", {
            get: function () {
                return Laya.superGet(test.TestA, this, "w") + 1;
            },
            set: function (value) {
                Laya.superSet(test.TestA, this, "w", value);
            },
            enumerable: true,
            configurable: true
        });
        return TestB;
    }(test.TestA));
    test.TestB = TestB;
})(test || (test = {}));
//# sourceMappingURL=TestB.js.map