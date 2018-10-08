var sear;
(function (sear) {
    var ui;
    (function (ui) {
        var ctrl;
        (function (ctrl) {
            /**
             * 九宫布局盒子
             *
             * @author pbk
             */
            var LayoutBox = /** @class */ (function () {
                function LayoutBox(container) {
                    this._layouts = {};
                    this._container = container;
                }
                LayoutBox.prototype.clear = function () {
                };
                LayoutBox.prototype.addChild = function (node, align, valign, offx, offy) {
                    this._container.addChild(node);
                    var layout = new ctrl.Layout(node);
                    layout.align = align;
                    layout.valign = valign;
                    layout.offx = offx;
                    layout.offy = offy;
                };
                LayoutBox.prototype.removeChild = function (node) {
                };
                LayoutBox.prototype.layout = function () {
                };
                return LayoutBox;
            }());
            ctrl.LayoutBox = LayoutBox;
        })(ctrl = ui.ctrl || (ui.ctrl = {}));
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=LayoutBox.js.map