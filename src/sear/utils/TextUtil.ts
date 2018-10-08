module sear.utils {

    /**
     * 
     * 
     * @author pbk
     */
    export class TextUtil {
        static spanHead: string = "<span";
        static spanEnd: string = "</span>";
        static spaceNbsp: string = "&nbsp;";
        static spaceReg: RegExp = /\s/g;
        static lineBr: string = "<br/>";
        static lineReg: RegExp = /\n|\r|<br\/>|<br>/i;
        static htmlReg: RegExp = /<.*?>/g;

        /** 生成html文本*/
        static createHtml(str: string, color: string, size: number = 18, bold: boolean = false, key: string = null, font: string = null): string {
            if (!str) {
                return "";
            }

            let head: string = TextUtil.spanHead + " style='color:" + color + ";font:";
            if (size > 0) {
                head += size + "px " + font;
            } else {
                head += font;
            }
            if (bold) {
                head += " bold";
            }
            head += "'";
            if (key != null) {
                head += " herf='" + key + "'";
            }
            head += ">";

            if (TextUtil.isHtml(str)) {
                let htmlStr: string = "";
                let sIdx: number = 0;
                let eIdx: number = 0;
                while (true) {
                    eIdx = str.indexOf(TextUtil.spanHead, sIdx);// <span下标
                    if (eIdx != -1) {// 有html头
                        if (eIdx > sIdx) {
                            // html之前有普通文本
                            htmlStr += TextUtil.createHtmlAux(str.substring(sIdx, eIdx), head);
                        }
                        sIdx = str.indexOf(TextUtil.spanEnd, eIdx);// </span>下标
                        if (sIdx != -1) {
                            sIdx += 7;
                            htmlStr += str.substring(eIdx, sIdx);
                        } else {
                            // 传入文件格式错误，无尾部标识；尝试给尾部补加个
                            htmlStr += str.substring(eIdx) + TextUtil.spanEnd;
                            break;
                        }
                    } else {
                        // 未发现html头部，默认为普通文本
                        htmlStr += TextUtil.createHtmlAux(str.substring(sIdx), head);
                    }
                }
                return htmlStr;
            } else {
                return TextUtil.createHtmlAux(str, head);
            }
        }

        private static createHtmlAux(str: string, head: string): string {
            str = str.replace(TextUtil.spaceReg, TextUtil.spaceNbsp);

            let lines: string[] = str.split(TextUtil.lineReg);
            let htmlStr: string = "";
            let isFrist: boolean = true;
            for (let lineStr of lines) {
                if (isFrist) {
                    isFrist = false;
                } else {
                    htmlStr += TextUtil.lineBr;
                }
                if (!lineStr || lineStr == "") {
                    continue;
                }
                htmlStr += head + lineStr + TextUtil.spanEnd;
            }
            return htmlStr;
        }

        static isHtml(str: string): boolean {
            return TextUtil.htmlReg.test(str);
        }

        /** 移除HTML标签*/
        static removeHtmlTag(str: string): string {
            if (!str) {
                return str;
            }
            str = str.replace(TextUtil.htmlReg, "");
            str = str.replace(/&nbsp;/g, " ");
            return str;
        }

        /**
         * 替换文本标记{1}{2}{3}..
         * @param str 
         * @param params 
         */
        static replaceMark(str: string, params: string[]): string {
            if (!str) {
                return str;
            }
            if (!params) {
                return str;
            }

            let isHtml: boolean = TextUtil.isHtml(str);
            let len: number = params.length;
            let param: string;
            let keyStr: string;
            let idxKey: number;
            let idxSpan: number;
            let idxSpanEnd: number;
            for (let i: number = 0; i < len; ++i) {
                keyStr = "{" + i + "}";
                param = params[i];
                if (isHtml) {
                    if (TextUtil.isHtml(param)) {// span不能嵌套
                        idxKey = str.indexOf(keyStr);
                        if (idxKey != -1) {
                            idxSpan = str.lastIndexOf(TextUtil.spanHead, idxKey);
                            if (idxSpan != -1) {
                                idxSpanEnd = str.lastIndexOf(TextUtil.spanEnd, idxKey);
                                if (idxSpanEnd < idxSpan) {
                                    idxSpanEnd = str.indexOf(">", idxSpan);
                                    if (idxSpanEnd != -1) {
                                        param = TextUtil.spanEnd + param;// 前面加个结束
                                        param = param + str.substring(idxSpan, idxSpanEnd + 1);// 后面加个开头
                                    }
                                }
                            }
                        }
                    } else {
                        if (typeof param === "string") {
                            param = param.replace(TextUtil.spaceReg, TextUtil.spaceNbsp);
                        }
                    }
                }
                str = str.replace(keyStr, param);
            }
        }
    }
}