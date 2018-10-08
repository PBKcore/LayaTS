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
        var TreeItem = /** @class */ (function () {
            function TreeItem() {
                this._isOpen = false;
                this.label = new Label();
                this.label.on(sear.Event.CLICK, this, this.onClick);
                this.label.on(sear.Event.DOUBLE_CLICK, this, this.onDoubleClick);
                this.label.on(sear.Event.MOUSE_OVER, this, this.onOver);
                this.label.on(sear.Event.MOUSE_OUT, this, this.onOut);
            }
            TreeItem.prototype.onClick = function () {
            };
            TreeItem.prototype.onDoubleClick = function () {
            };
            TreeItem.prototype.onOver = function () {
            };
            TreeItem.prototype.onOut = function () {
            };
            Object.defineProperty(TreeItem.prototype, "isOpen", {
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
            return TreeItem;
        }());
        ui.TreeItem = TreeItem;
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=TreeItem.js.map