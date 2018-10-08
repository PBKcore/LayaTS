module sear.pool {
    import Handler = sear.struct.Handler;
    import Timer = sear.frame.Timer;
    import SoundData = sear.sound.SoundData;
    import Sound = sear.sound.Sound;
    import LoadRecord = sear.loader.LoadRecord;
    import TextureFrame = sear.animation.TextureFrame;
    import Bytes = sear.struct.Bytes;

    let pHandler: Pool<Handler> = null;
    function getPHandler(): Pool<Handler> {
        return pHandler || (pHandler = new Pool<Handler>(Handler, 50));
    }
    export function getHandler(): Handler {
        return getPHandler().pop();
    }
    export function recHandler(handler: Handler): void {
        getPHandler().push(handler);
    }

    let pTimer: Pool<Timer> = null;
    function getPTimer(): Pool<Timer> {
        return pTimer || (pTimer = new Pool<Timer>(Timer, 50));
    }
    export function getTimer(): Timer {
        return getPTimer().pop();
    }
    export function recTimer(timer: Timer): void {
        getPTimer().push(timer);
    }

    let pSoundData: Pool<SoundData> = null;
    function getPSoundData(): Pool<SoundData> {
        return pSoundData || (pSoundData = new Pool<SoundData>(SoundData, 20));
    }
    export function getSoundData(): SoundData {
        return getPSoundData().pop();
    }
    export function recSoundData(soundData: SoundData): void {
        getPSoundData().push(soundData);
    }

    let pSound: Pool<Sound> = null;
    function getPSound(): Pool<Sound> {
        return pSound || (pSound = new Pool<Sound>(Sound, 20));
    }
    export function getSound(): Sound {
        return getPSound().pop();
    }
    export function recSound(sound: Sound): void {
        getPSound().push(sound);
    }

    let pLoadRecord: Pool<LoadRecord> = null;
    function getPLoadRecord(): Pool<LoadRecord> {
        return pLoadRecord || (pLoadRecord = new Pool<LoadRecord>(LoadRecord, 20));
    }
    export function getLoadRecord(): LoadRecord {
        return getPLoadRecord().pop();
    }
    export function recLoadRecord(loadRecord: LoadRecord): void {
        getPLoadRecord().push(loadRecord);
    }

    let pTextureFrame: Pool<TextureFrame> = null;
    function getPTextureFrame(): Pool<TextureFrame> {
        return pTextureFrame || (pTextureFrame = new Pool<TextureFrame>(TextureFrame, 20));
    }
    export function getTextureFrame(): TextureFrame {
        return getPTextureFrame().pop();
    }
    export function recTextureFrame(textureFrame: TextureFrame): void {
        getPTextureFrame().push(textureFrame);
    }

    let pByte: Pool<Bytes> = null;
    function getPByte(): Pool<Bytes> {
        return pByte || (pByte = new Pool<Bytes>(Bytes, 10));
    }
    export function getByte(): Bytes {
        return getPByte().pop();
    }
    export function recByte(byte: Bytes): void {
        getPByte().push(byte);
    }
}