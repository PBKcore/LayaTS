var test;
(function (test) {
    /**
     *
     *
     * @author pbk
     */
    var TestFile = /** @class */ (function () {
        function TestFile() {
            sear.startupWeb();
            sear.stage.on(sear.Event.KEY_DOWN, this, this.KeyHandler);
            sear.stage.on(sear.Event.CLICK, this, this.Open);
        }
        TestFile.prototype.Open = function () {
            sear.filex.openBrowse(sear.filex.read_text, this, this.showResult);
        };
        TestFile.prototype.KeyHandler = function (event) {
            if (event.keyCode == 81) {
                sear.filex.openBrowse(sear.filex.read_text, this, this.showResult);
            }
            else if (event.keyCode == 87) {
                var str = uitool.config.createTemplate("game.ui", "ChanPanel", "panel", "player :string;", "this.player = \"pbk\";");
                sear.filex.save("ChatPanel.ts", str, sear.filex.type_ts);
            }
            else if (event.keyCode == 69) {
            }
        };
        TestFile.prototype.showResult = function (file, str) {
            sear.log(str);
            sear.filex.saveFile(file, "就这样吧");
        };
        return TestFile;
    }());
    test.TestFile = TestFile;
})(test || (test = {}));
//# sourceMappingURL=TestFile.js.map