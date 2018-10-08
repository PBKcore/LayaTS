var sear;
(function (sear) {
    var ui;
    (function (ui) {
        /**
         * 布局
         *
         * @author pbk
         */
        var Layout = /** @class */ (function () {
            function Layout(x, y, width, height) {
                this._x = 0;
                this._y = 0;
                this._width = 0;
                this._height = 0;
                this._align = Layout.ALIGN_LEFT;
                this._valign = Layout.VALIGN_TOP;
                this._isHorz = true;
                this._dx = 0;
                this._dy = 0;
                this._childs = [];
                this._destroyed = false;
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            }
            Layout.prototype.clear = function () {
                this._x = 0;
                this._y = 0;
                this._width = 0;
                this._height = 0;
                this._align = Layout.ALIGN_LEFT;
                this._valign = Layout.VALIGN_TOP;
                this._isHorz = true;
                this._dx = 0;
                this._dy = 0;
                this._childs.length = 0;
            };
            Layout.prototype.destroy = function () {
                this._childs = null;
                this._destroyed = true;
            };
            Layout.prototype.updateLayout = function () {
                if (this._childs.length == 0) {
                    return;
                }
                if (this.isHorz) { // 横向排列
                    this.layoutH();
                }
                else { // 纵向排列
                    this.layoutV();
                }
            };
            Layout.prototype.layoutH = function () {
                var len = this._childs.length;
                var tx;
                var ty = this.y;
                var right = this.x + this.width;
                var child;
                var maxH; // 组最大高度
                // ------------------- 横向布局
                if (this.align == Layout.ALIGN_LEFT) { // 左对齐
                    tx = this.x;
                    maxH = 0;
                    for (var i = 0; i < len; ++i) {
                        child = this._childs[i];
                        if (tx + child.width > right && child.width <= this.width) {
                            tx = this.x;
                            ty += (maxH + this.dy);
                            maxH = 0;
                        }
                        child.x = tx;
                        child.y = ty;
                        tx += (child.width + this.dx);
                        if (child.height > maxH) {
                            maxH = child.height;
                        }
                    }
                }
                else if (this.align == Layout.ALIGN_RIGHT) { // 右对齐
                    tx = right;
                    maxH = 0;
                    for (var i = len - 1; i >= 0; --i) {
                        child = this._childs[i];
                        if (tx - child.width < this.x && child.width <= this.width) {
                            tx = right;
                            ty -= (maxH + this.dy);
                            maxH = 0;
                        }
                        child.x = tx - child.width;
                        child.y = ty;
                        tx -= (child.width - this.dx);
                        if (child.height > maxH) {
                            maxH = child.height;
                        }
                    }
                    var offH = this.y - ty;
                    ty += offH * 2;
                }
                else { // 居中对齐
                    tx = this.x;
                    maxH = 0;
                    var si = 0;
                    for (var i = 0; i < len; ++i) {
                        child = this._childs[i];
                        if (tx + child.width > right && child.width <= this.width) {
                            this.layoutCenter(si, i - 1);
                            si = i;
                            tx = this.x;
                            ty += (maxH + this.dy);
                            maxH = 0;
                        }
                        child.x = tx;
                        child.y = ty;
                        tx += (child.width + this.dx);
                        if (child.height > maxH) {
                            maxH = child.height;
                        }
                    }
                    this.layoutCenter(si, len - 1);
                }
                // ------------------- 纵向布局
                if (this.valign == Layout.VALIGN_BOTTOM) {
                    ty = ty + maxH - this.y;
                    ty = this.height - ty;
                }
                else if (this.valign == Layout.VALIGN_MIDDLE) {
                    ty = ty + maxH - this.y;
                    ty = (this.height - ty) * 0.5;
                }
                else {
                    ty = 0;
                }
                ty += (offH || 0);
                if (ty != 0) {
                    for (var i = 0; i < len; ++i) {
                        this._childs[i].y += ty;
                    }
                }
            };
            Layout.prototype.layoutCenter = function (si, ei) {
                var offx = (this.width - (this._childs[ei].x + this._childs[ei].width - this._childs[si].x)) * 0.5;
                while (si <= ei) {
                    this._childs[si].x += offx;
                    si += 1;
                }
            };
            // ==========================================================================================
            Layout.prototype.layoutV = function () {
                var len = this._childs.length;
                var tx = this.x;
                var ty;
                var bottom = this.y + this.height;
                var child;
                var maxW; // 组最大宽度
                // ------------------- 纵向布局
                if (this.valign == Layout.VALIGN_TOP) { // 上对齐
                    ty = this.y;
                    maxW = 0;
                    for (var i = 0; i < len; ++i) {
                        child = this._childs[i];
                        if (ty + child.height > bottom && child.height <= this.height) {
                            ty = this.y;
                            tx += (maxW + this.dx);
                            maxW = 0;
                        }
                        child.x = tx;
                        child.y = ty;
                        ty += (child.height + this.dy);
                        if (child.width > maxW) {
                            maxW = child.width;
                        }
                    }
                }
                else if (this.valign == Layout.VALIGN_BOTTOM) { // 下对齐
                    ty = bottom;
                    maxW = 0;
                    for (var i = len - 1; i >= 0; --i) {
                        child = this._childs[i];
                        if (ty - child.height < this.y && child.height <= this.height) {
                            ty = bottom;
                            tx -= (maxW + this.dx);
                            maxW = 0;
                        }
                        child.x = tx;
                        child.y = ty - child.height;
                        ty -= (child.height - this.dy);
                        if (child.width > maxW) {
                            maxW = child.width;
                        }
                    }
                    var offW = this.x - tx;
                    tx += offW * 2;
                }
                else { // 居中对齐
                    ty = this.y;
                    maxW = 0;
                    var si = 0;
                    for (var i = 0; i < len; ++i) {
                        child = this._childs[i];
                        if (ty + child.height > bottom && child.height <= this.height) {
                            this.layoutMiddle(si, i - 1);
                            si = i;
                            ty = this.y;
                            tx += (maxW + this.dx);
                            maxW = 0;
                        }
                        child.x = tx;
                        child.y = ty;
                        ty += (child.height + this.dy);
                        if (child.width > maxW) {
                            maxW = child.width;
                        }
                    }
                    this.layoutMiddle(si, len - 1);
                }
                // ------------------- 横向布局
                if (this.align == Layout.ALIGN_RIGHT) {
                    tx = tx + maxW - this.x;
                    tx = this.width - tx;
                }
                else if (this.align == Layout.ALIGN_CENTER) {
                    tx = tx + maxW - this.x;
                    tx = (this.width - tx) * 0.5;
                }
                else {
                    tx = 0;
                }
                tx += (offW || 0);
                if (tx != 0) {
                    for (var i = 0; i < len; ++i) {
                        this._childs[i].x += tx;
                    }
                }
            };
            Layout.prototype.layoutMiddle = function (si, ei) {
                var offy = (this.height - (this._childs[ei].y + this._childs[ei].height - this._childs[si].y)) * 0.5;
                while (si <= ei) {
                    this._childs[si].y += offy;
                    si += 1;
                }
            };
            // ==========================================================================================
            Layout.prototype.addChild = function (child) {
                if (!child || this.destroyed || this._childs.indexOf(child) != -1) {
                    return;
                }
                this._childs.push(child);
                sear.callLater(this, this.updateLayout);
            };
            Layout.prototype.addChildAt = function (child, index) {
                if (!child || this.destroyed) {
                    return;
                }
                var idx = this._childs.indexOf(child);
                if (idx != -1) {
                    index = index < 0 ? 0 : (index >= this._childs.length ? this._childs.length : index);
                    if (index == idx) {
                        return;
                    }
                    this._childs.splice(idx, 1);
                    this._childs.splice(index, 0, child);
                }
                else {
                    index = index < 0 ? 0 : (index > this._childs.length ? this._childs.length : index);
                    this._childs.splice(index, 0, child);
                }
                sear.callLater(this, this.updateLayout);
            };
            Layout.prototype.delChild = function (child) {
                if (!child || this.destroyed) {
                    return;
                }
                var idx = this._childs.indexOf(child);
                if (idx == -1) {
                    return;
                }
                this._childs.splice(idx, 1);
                sear.callLater(this, this.updateLayout);
            };
            Layout.prototype.setChildIndex = function (child, index) {
                if (!child || this.destroyed) {
                    return;
                }
                var idx = this._childs.indexOf(child);
                if (idx == -1) {
                    return;
                }
                index = index < 0 ? 0 : (index >= this._childs.length ? this._childs.length : index);
                if (index == idx) {
                    return;
                }
                this._childs.splice(idx, 1);
                this._childs.splice(index, 0, child);
                sear.callLater(this, this.updateLayout);
            };
            Layout.prototype.getChildIndex = function (child) {
                if (!child || this.destroyed) {
                    return -1;
                }
                return this._childs.indexOf(child);
            };
            Layout.prototype.getChildAt = function (index) {
                if (this.destroyed || index < 0 || index >= this._childs.length) {
                    return;
                }
                return this._childs[index];
            };
            Object.defineProperty(Layout.prototype, "destroyed", {
                get: function () {
                    return this._destroyed;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layout.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (value) {
                    if (this._x != value) {
                        this._x = value;
                        sear.callLater(this, this.updateLayout);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layout.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (value) {
                    if (this._y != value) {
                        this._y = value;
                        sear.callLater(this, this.updateLayout);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layout.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    if (this._width != value) {
                        this._width = value;
                        sear.callLater(this, this.updateLayout);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layout.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    if (this._height != value) {
                        this._height = value;
                        sear.callLater(this, this.updateLayout);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layout.prototype, "align", {
                /** 横向布局*/
                get: function () {
                    return this._align;
                },
                set: function (value) {
                    if (this._align != value) {
                        this._align = value;
                        sear.callLater(this, this.updateLayout);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layout.prototype, "valign", {
                /** 纵向布局*/
                get: function () {
                    return this._valign;
                },
                set: function (value) {
                    if (this._valign != value) {
                        this._valign = value;
                        sear.callLater(this, this.updateLayout);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layout.prototype, "isHorz", {
                /** 是否横向排列；否则纵向*/
                get: function () {
                    return this._isHorz;
                },
                set: function (value) {
                    if (this._isHorz != value) {
                        this._isHorz = value;
                        sear.callLater(this, this.updateLayout);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layout.prototype, "dx", {
                /** 横向排列间距*/
                get: function () {
                    return this._dx;
                },
                set: function (value) {
                    if (this._dx != value) {
                        this._dx = value;
                        sear.callLater(this, this.updateLayout);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layout.prototype, "dy", {
                /** 纵向排列间距*/
                get: function () {
                    return this._dy;
                },
                set: function (value) {
                    if (this._dy != value) {
                        this._dy = value;
                        sear.callLater(this, this.updateLayout);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layout.prototype, "childs", {
                get: function () {
                    return this._childs;
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
        ui.Layout = Layout;
    })(ui = sear.ui || (sear.ui = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Layout.js.map