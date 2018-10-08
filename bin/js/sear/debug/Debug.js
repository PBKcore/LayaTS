var sear;
(function (sear) {
    var debug;
    (function (debug) {
        function log(message) {
            console.log(message);
        }
        debug.log = log;
        function error(message) {
            console.error(message);
        }
        debug.error = error;
        function showDebugPanel() {
            Laya.DebugPanel.init();
        }
        debug.showDebugPanel = showDebugPanel;
        function showDebugTool() {
            Laya.DebugTool.init();
        }
        debug.showDebugTool = showDebugTool;
        /** 性能统计面板*/
        function showStates(show) {
            if (show) {
                Laya.Stat.show();
            }
            else {
                Laya.Stat.hide();
            }
        }
        debug.showStates = showStates;
    })(debug = sear.debug || (sear.debug = {}));
})(sear || (sear = {}));
(function (sear) {
    sear.log = sear.debug.log;
    sear.error = sear.debug.error;
})(sear || (sear = {}));
//# sourceMappingURL=Debug.js.map