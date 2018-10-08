var test;
(function (test) {
    /**
     *
     *
     * @author pbk
     */
    var TestAnimation = /** @class */ (function () {
        function TestAnimation() {
        }
        TestAnimation.prototype.start = function () {
            sear.startupWeb();
            var urlHead = "res/animation/walk/";
            this.urls = [
                urlHead + 20010 + ".png",
                urlHead + 20020 + ".png",
                urlHead + 20030 + ".png",
                urlHead + 20040 + ".png",
                urlHead + 20050 + ".png",
                urlHead + 20060 + ".png"
            ];
            sear.loadex.load(this.urls, sear.loader.LoadType.image, sear.struct.Handler.create(this, this.complete));
        };
        TestAnimation.prototype.complete = function (result) {
            if (!result) {
                sear.log("load error");
                return;
            }
            var texs = [];
            for (var _i = 0, _a = this.urls; _i < _a.length; _i++) {
                var url = _a[_i];
                var frame = sear.pool.getTextureFrame();
                frame.addTexture(sear.loadex.getRes(url), 0, 0);
                texs.push(frame);
            }
            var anim = new sear.animation.Animation();
            anim.frames = texs;
            anim.x = 0;
            anim.y = 0;
            sear.stage.addChild(anim);
            anim.play();
            sear.soundex.playSound("res/sound/footsteps_stone.wav", 0);
        };
        return TestAnimation;
    }());
    test.TestAnimation = TestAnimation;
})(test || (test = {}));
//# sourceMappingURL=TestAnimation.js.map