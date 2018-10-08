module sear.file {
    import Handler = sear.struct.Handler;

    /**
     * LocalStorage可以保存到本地
     * 
     * @author pbk
     */
    export class Filex {
        constructor() {
        }

        // ============================================================================
        // ================================================================ 读取文件
        read_buffer: number = 1;// ArrayBuffer
        read_byte: number = 2;
        read_text: number = 3;// string

        private _readHandler: Handler = null;
        private _readType: number;

        private _html_input;
        /**
         * 打开浏览框（在stage事件中才能触发）
         * @param readType 
         * @param caller 
         * @param method 回调参数(fiile,文件数据)
         */
        openBrowse(readType: number, caller: any, method: Function): void {
            if (this._fileReader && this._fileReader.readyState == 1) {
                return;
            }
            if (!method) {
                return;
            }
            this.clearHander();
            this._readHandler = Handler.create(caller, method, null, true);
            this._readType = readType;

            if (!this._html_input) {
                this._html_input = Browser.createElement("input");
                this._html_input.type = "file";
                this._html_input.onchange = this.onInputChange;
            }
            this._html_input.dispatchEvent(new MouseEvent("click"));// { bubbles: true, cancelable: false, view: window }
        }

        private clearHander(): void {
            if (this._readHandler) {
                this._readHandler.recover();
                this._readHandler = null;
            }
        }

        private onInputChange(event: Event): void {
            let files: File[] = event.currentTarget["files"];
            filex.readFile(files[0]);
        }

        private _fileReader: FileReader;
        /** 加载本地文件*/
        private readFile(file: File): void {
            if (!this._fileReader) {
                this._fileReader = new FileReader();
                this._fileReader.onload = this.onReadLoad;
                this._fileReader.onerror = this.onReadError;
                this._fileReader.onabort = this.onReadAbort;
            }
            this._readHandler.addArg(file);

            if (this._readType == this.read_text) {
                this._fileReader.readAsText(file);
            } else if (this._readType == this.read_byte) {
                this._fileReader.readAsBinaryString(file);
            } else {
                this._fileReader.readAsArrayBuffer(file);
            }
        }

        private onReadLoad(): void {
            if (!filex._readHandler) {
                return;
            }
            filex._readHandler.runWith(filex._fileReader.result);
            filex._readHandler = null;
        }

        private onReadError(): void {
            filex.clearHander();
        }

        private onReadAbort(): void {
            filex.clearHander();
        }

        // ============================================================================
        // ================================================================ 保存文件
        type_doc: string = "application/msword";
        type_bin: string = "application/octet-stream";// exe, so, dll
        type_pdf: string = "application/pdf";
        type_ai: string = "application/postscript";
        type_xls: string = "application/vnd.ms-excel";
        type_ppt: string = "application/vnd.ms-powerpoint";
        type_dir: string = "application/x-director";
        type_js: string = "application/x-javascript";
        type_ts: string = "application/x-typescript";
        type_swf: string = "application/x-shockwave-flash";
        type_xhtml: string = "application/xhtml+xml";// xht
        type_zip: string = "application/zip";
        type_css: string = "text/css";
        type_html: string = "text/html";// htm
        type_txt: string = "text/plain";
        // type_utf8: string = "text/plain;charset=utf-8";
        type_xml: string = "text/xml";// xsl
        type_mpeg: string = "video/mpeg";// mpg
        type_avi: string = "video/x-msvideo";
        type_movie: string = "video/x-sgi-movie";
        type_midi: string = "audio/midi";// mid
        type_mp3: string = "audio/mpeg";
        type_rm: string = "audio/x-pn-realaudio";
        type_rpm: string = "audio/x-pn-realaudio-plugin";
        type_wav: string = "audio/x-wav";
        type_bmp: string = "image/bmp";
        type_gif: string = "image/gif";
        type_jpeg: string = "image/jpeg";// jpg
        type_png: string = "image/png";

        private _html_a;
        /** 保存本地文件（默认保存在"下载"文件夹）*/
        save(fileName: string, content: any, type: string): void {
            let file: File = new File([content], fileName, { type: type });
            let url: string = URL.createObjectURL(file);
            this._html_a || (this._html_a = Browser.createElement("a"));
            this._html_a.href = url;
            this._html_a.download = file.name;
            this._html_a.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: false, view: window }));
            URL.revokeObjectURL(url);
        }

        saveFile(file: File, content: any): void {
            if (!file) {
                return;
            }
            this.save(file.name, content, file.type);
        }
    }
}
module sear {
    export const filex: sear.file.Filex = new sear.file.Filex();
}