var uitool;
(function (uitool) {
    var ui;
    (function (ui) {
        /**
         *
         *
         * @author pbk
         */
        var UIMgr = /** @class */ (function () {
            function UIMgr() {
            }
            // ==================================================================================
            /** 添加组件*/
            UIMgr.prototype.addComUI = function (data) {
            };
            // ==================================================================================
            /** 删除组件*/
            UIMgr.prototype.delComUI = function () {
            };
            // ==================================================================================
            /** 剪切组件*/
            UIMgr.prototype.cutComUI = function () {
            };
            /** 复制组件*/
            UIMgr.prototype.copyComUI = function () {
                sear.log("copy");
            };
            /** 粘贴组件*/
            UIMgr.prototype.pasteComUI = function () {
            };
            // ==================================================================================
            UIMgr.prototype.moveUp = function () {
            };
            UIMgr.prototype.moveDown = function () {
            };
            UIMgr.prototype.moveLeft = function () {
            };
            UIMgr.prototype.moveRight = function () {
            };
            // ==================================================================================
            /** 组件层级前移*/
            UIMgr.prototype.toTop = function () {
            };
            /** 组件层次后移*/
            UIMgr.prototype.toBottom = function () {
            };
            /** 根据名字查找组件*/
            UIMgr.prototype.find = function (name) {
            };
            // ==================================================================================
            /** 解析面板数据*/
            UIMgr.prototype.parseUIData = function (data) {
            };
            // ==================================================================================
            /** 生成当前面板数据*/
            UIMgr.prototype.createUIData = function () {
                return null;
            };
            Object.defineProperty(UIMgr.prototype, "fileName", {
                /** 文件名*/
                get: function () {
                    return "";
                },
                enumerable: true,
                configurable: true
            });
            return UIMgr;
        }());
        ui.uiMgr = new UIMgr();
    })(ui = uitool.ui || (uitool.ui = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=UIMgr.js.map