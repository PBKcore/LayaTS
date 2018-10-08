var sear;
(function (sear) {
    var tools;
    (function (tools) {
        var Sprite = sear.Sprite;
        var DisplayUtil = sear.utils.ShowUtil;
        /**
         * 绑定对象的相对位置
         *
         * @author pbk
         */
        var BindPosition = /** @class */ (function () {
            /**
             *
             * @param target 默认绑定鼠标
             * @param offx 相对于target偏移X坐标
             * @param offy 相对于target偏移Y坐标
             */
            function BindPosition(target, offx, offy) {
                if (target === void 0) { target = null; }
                if (offx === void 0) { offx = 0; }
                if (offy === void 0) { offy = 0; }
                this._offx = 0;
                this._offy = 0;
                this._binds = [];
                this._target = target;
                this._offx = offx;
                this._offy = offy;
            }
            BindPosition.prototype.destory = function () {
                this.stopTimer();
                this._target = null;
                this._binds.length = 0;
                this._binds = null;
            };
            BindPosition.prototype.bind = function (obj) {
                if (!obj) {
                    return;
                }
                if (obj instanceof Sprite) {
                    this._binds.push(obj);
                }
                else {
                    this._binds.concat(obj);
                }
                if (!this._timer) {
                    this._timer = sear.setFrameLoop(this, this.syncPos);
                }
            };
            BindPosition.prototype.unload = function (obj) {
                if (!obj) {
                    return;
                }
                if (obj instanceof Sprite) {
                    sear.arrayDelete(this._binds, obj);
                }
                else {
                    sear.arrayDeletes(this._binds, obj);
                }
                if (this._binds.length == 0) {
                    this.stopTimer();
                }
            };
            BindPosition.prototype.unloadAll = function () {
                this._binds.length = 0;
                this.stopTimer();
            };
            BindPosition.prototype.syncPos = function () {
                var pos;
                if (this._target) {
                    pos = DisplayUtil.relativePos(this._target);
                    this._tarX = pos.x;
                    this._tarY = pos.y;
                }
                else {
                    this._tarX = sear.stage.mouseX;
                    this._tarY = sear.stage.mouseY;
                }
                for (var _i = 0, _a = this._binds; _i < _a.length; _i++) {
                    var cell = _a[_i];
                    pos = DisplayUtil.relativePos(cell);
                    this._relY = pos.y; // 避免x设置时使用临时Point出错
                    cell.x += (this._tarX + this._offx - pos.x);
                    cell.y += (this._tarY + this._offy - this._relY);
                }
            };
            BindPosition.prototype.stopTimer = function () {
                if (this._timer) {
                    this._timer.stop();
                    this._timer = null;
                }
            };
            return BindPosition;
        }());
        tools.BindPosition = BindPosition;
    })(tools = sear.tools || (sear.tools = {}));
})(sear || (sear = {}));
//# sourceMappingURL=BindPosition.js.map