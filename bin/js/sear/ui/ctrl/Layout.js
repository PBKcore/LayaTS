var sear;
(function (sear) {
    var ui;
    (function (ui) {
        var ctrl;
        (function (ctrl) {
            /**
             * 布局
             *
             * @author pbk
             */
            var Layout = /** @class */ (function () {
                function Layout(target) {
                    /** 横向对齐方式*/
                    this.align = Layout.ALIGN_LEFT;
                    /** 纵向对齐方式*/
                    this.valign = Layout.VALIGN_TOP;
                    /** 横向偏移坐标*/
                    this.offx = 0;
                    /** 纵向偏移坐标*/
                    this.offy = 0;
                    this.target = target;
                }
                Object.defineProperty(Layout.prototype, "type", {
                    get: function () {
                        if (this.align == Layout.ALIGN_LEFT) {
                            if (this.valign == Layout.VALIGN_TOP) {
                                return 0;
                            }
                            else if (this.valign == Layout.VALIGN_MIDDLE) {
                                return 1;
                            }
                            else if (this.valign == Layout.VALIGN_BOTTOM) {
                                return 2;
                            }
                        }
                        else if (this.align == Layout.ALIGN_CENTER) {
                            if (this.valign == Layout.VALIGN_TOP) {
                                return 3;
                            }
                            else if (this.valign == Layout.VALIGN_MIDDLE) {
                                return 4;
                            }
                            else if (this.valign == Layout.VALIGN_BOTTOM) {
                                return 5;
                            }
                        }
                        else if (this.align == Layout.ALIGN_RIGHT) {
                            if (this.valign == Layout.VALIGN_TOP) {
                                return 6;
                            }
                            else if (this.valign == Layout.VALIGN_MIDDLE) {
                                return 7;
                            }
                            else if (this.valign == Layout.VALIGN_BOTTOM) {
                                return 8;
                            }
                        }
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Layout.prototype, "x", {
                    get: function () {
                        return this.target.x;
                    },
                    set: function (value) {
                        this.target.x = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Layout.prototype, "y", {
                    get: function () {
                        return this.target.y;
                    },
                    set: function (value) {
                        this.target.y = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Layout.prototype, "width", {
                    get: function () {
                        return this.target.width;
                    },
                    set: function (value) {
                        this.target.width = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Layout.prototype, "height", {
                    get: function () {
                        return this.target.height;
                    },
                    set: function (value) {
                        this.target.height = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Layout.ALIGN_LEFT = "left";
                Layout.ALIGN_CENTER = "center";
                Layout.ALIGN_RIGHT = "right";
                Layout.VALIGN_TOP = "top";
                Layout.VALIGN_MIDDLE = "middle";
                Layout.VALIGN_BOTTOM = "bottom";
                return Layout;
            }());
            ctrl.Layout = Layout;
        })(ctrl = ui.ctrl || (ui.ctrl = {}));
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Layout.js.map