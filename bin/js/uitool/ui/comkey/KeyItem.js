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
var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var comkey;
        (function (comkey) {
            var Sprite = sear.Sprite;
            /**
             * 组件的一条属性
             *
             * @author pbk
             */
            var KeyItem = /** @class */ (function (_super) {
                __extends(KeyItem, _super);
                function KeyItem() {
                    return _super.call(this) || this;
                }
                KeyItem.prototype.clear = function () {
                };
                return KeyItem;
            }(Sprite));
            comkey.KeyItem = KeyItem;
        })(comkey = ui.comkey || (ui.comkey = {}));
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=KeyItem.js.map