var sear;
(function (sear) {
    var debug;
    (function (debug) {
        function Log(message) {
            console.log(message);
        }
        debug.Log = Log;
        function Error(message) {
            console.error(message);
        }
        debug.Error = Error;
    })(debug = sear.debug || (sear.debug = {}));
})(sear || (sear = {}));
//# sourceMappingURL=Debug.js.map