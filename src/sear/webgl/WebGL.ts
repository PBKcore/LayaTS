module sear.webgl {

    /**
     * 
     * 
     * @author pbk
     */
    export class WebGL {
        static enable(): boolean {
            if (laya.webgl.WebGL.enable()) {
                laya.resource.HTMLImage.create = function (src: string, def: any = null): laya.resource.HTMLImage {
                    return new laya.webgl.resource.WebGLImage(src, def, laya.webgl.WebGLContext.RGBA, false);
                }
                return true;
            }
            return false;
        }
    }
}