var sear;
(function (sear) {
    var pool;
    (function (pool) {
        var Handler = sear.struct.Handler;
        var Timer = sear.frame.Timer;
        var SoundData = sear.sound.SoundData;
        var Sound = sear.sound.Sound;
        var LoadRecord = sear.loader.LoadRecord;
        var TextureFrame = sear.animation.TextureFrame;
        var Bytes = sear.struct.Bytes;
        var pHandler = null;
        function getPHandler() {
            return pHandler || (pHandler = new pool.Pool(Handler, 50));
        }
        function getHandler() {
            return getPHandler().pop();
        }
        pool.getHandler = getHandler;
        function recHandler(handler) {
            getPHandler().push(handler);
        }
        pool.recHandler = recHandler;
        var pTimer = null;
        function getPTimer() {
            return pTimer || (pTimer = new pool.Pool(Timer, 50));
        }
        function getTimer() {
            return getPTimer().pop();
        }
        pool.getTimer = getTimer;
        function recTimer(timer) {
            getPTimer().push(timer);
        }
        pool.recTimer = recTimer;
        var pSoundData = null;
        function getPSoundData() {
            return pSoundData || (pSoundData = new pool.Pool(SoundData, 20));
        }
        function getSoundData() {
            return getPSoundData().pop();
        }
        pool.getSoundData = getSoundData;
        function recSoundData(soundData) {
            getPSoundData().push(soundData);
        }
        pool.recSoundData = recSoundData;
        var pSound = null;
        function getPSound() {
            return pSound || (pSound = new pool.Pool(Sound, 20));
        }
        function getSound() {
            return getPSound().pop();
        }
        pool.getSound = getSound;
        function recSound(sound) {
            getPSound().push(sound);
        }
        pool.recSound = recSound;
        var pLoadRecord = null;
        function getPLoadRecord() {
            return pLoadRecord || (pLoadRecord = new pool.Pool(LoadRecord, 20));
        }
        function getLoadRecord() {
            return getPLoadRecord().pop();
        }
        pool.getLoadRecord = getLoadRecord;
        function recLoadRecord(loadRecord) {
            getPLoadRecord().push(loadRecord);
        }
        pool.recLoadRecord = recLoadRecord;
        var pTextureFrame = null;
        function getPTextureFrame() {
            return pTextureFrame || (pTextureFrame = new pool.Pool(TextureFrame, 20));
        }
        function getTextureFrame() {
            return getPTextureFrame().pop();
        }
        pool.getTextureFrame = getTextureFrame;
        function recTextureFrame(textureFrame) {
            getPTextureFrame().push(textureFrame);
        }
        pool.recTextureFrame = recTextureFrame;
        var pByte = null;
        function getPByte() {
            return pByte || (pByte = new pool.Pool(Bytes, 10));
        }
        function getByte() {
            return getPByte().pop();
        }
        pool.getByte = getByte;
        function recByte(byte) {
            getPByte().push(byte);
        }
        pool.recByte = recByte;
    })(pool = sear.pool || (sear.pool = {}));
})(sear || (sear = {}));
//# sourceMappingURL=PoolPool.js.map