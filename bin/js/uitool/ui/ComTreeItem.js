var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        var Label = sear.ui.Label;
        /**
         *
         *
         * @author pbk
         */
        var ComTreeItem = /** @class */ (function () {
            function ComTreeItem() {
                this._isOpen = false;
                this.label = new Label();
                this.label.on(sear.Event.CLICK, this, this.onClick);
                this.label.on(sear.Event.DOUBLE_CLICK, this, this.onDoubleClick);
                this.label.on(sear.Event.MOUSE_OVER, this, this.onOver);
                this.label.on(sear.Event.MOUSE_OUT, this, this.onOut);
            }
            ComTreeItem.prototype.onClick = function () {
            };
            ComTreeItem.prototype.onDoubleClick = function () {
            };
            ComTreeItem.prototype.onOver = function () {
            };
            ComTreeItem.prototype.onOut = function () {
            };
            Object.defineProperty(ComTreeItem.prototype, "isOpen", {
                get: function () {
                    return this._isOpen;
                },
                set: function (value) {
                    if (this._isOpen != value) {
                        this._isOpen = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            return ComTreeItem;
        }());
        ui.ComTreeItem = ComTreeItem;
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=ComTreeItem.js.map