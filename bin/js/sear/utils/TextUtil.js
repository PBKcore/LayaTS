var sear;
(function (sear) {
    var utils;
    (function (utils) {
        /**
         *
         *
         * @author pbk
         */
        var TextUtil = /** @class */ (function () {
            function TextUtil() {
            }
            /** 生成html文本*/
            TextUtil.createHtml = function (str, color, size, bold, key, font) {
                if (size === void 0) { size = 18; }
                if (bold === void 0) { bold = false; }
                if (key === void 0) { key = null; }
                if (font === void 0) { font = null; }
                if (!str) {
                    return "";
                }
                var head = TextUtil.spanHead + " style='color:" + color + ";font:";
                if (size > 0) {
                    head += size + "px " + font;
                }
                else {
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
                    var htmlStr = "";
                    var sIdx = 0;
                    var eIdx = 0;
                    while (true) {
                        eIdx = str.indexOf(TextUtil.spanHead, sIdx); // <span下标
                        if (eIdx != -1) { // 有html头
                            if (eIdx > sIdx) {
                                // html之前有普通文本
                                htmlStr += TextUtil.createHtmlAux(str.substring(sIdx, eIdx), head);
                            }
                            sIdx = str.indexOf(TextUtil.spanEnd, eIdx); // </span>下标
                            if (sIdx != -1) {
                                sIdx += 7;
                                htmlStr += str.substring(eIdx, sIdx);
                            }
                            else {
                                // 传入文件格式错误，无尾部标识；尝试给尾部补加个
                                htmlStr += str.substring(eIdx) + TextUtil.spanEnd;
                                break;
                            }
                        }
                        else {
                            // 未发现html头部，默认为普通文本
                            htmlStr += TextUtil.createHtmlAux(str.substring(sIdx), head);
                        }
                    }
                    return htmlStr;
                }
                else {
                    return TextUtil.createHtmlAux(str, head);
                }
            };
            TextUtil.createHtmlAux = function (str, head) {
                str = str.replace(TextUtil.spaceReg, TextUtil.spaceNbsp);
                var lines = str.split(TextUtil.lineReg);
                var htmlStr = "";
                var isFrist = true;
                for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                    var lineStr = lines_1[_i];
                    if (isFrist) {
                        isFrist = false;
                    }
                    else {
                        htmlStr += TextUtil.lineBr;
                    }
                    if (!lineStr || lineStr == "") {
                        continue;
                    }
                    htmlStr += head + lineStr + TextUtil.spanEnd;
                }
                return htmlStr;
            };
            TextUtil.isHtml = function (str) {
                return TextUtil.htmlReg.test(str);
            };
            /** 移除HTML标签*/
            TextUtil.removeHtmlTag = function (str) {
                if (!str) {
                    return str;
                }
                str = str.replace(TextUtil.htmlReg, "");
                str = str.replace(/&nbsp;/g, " ");
                return str;
            };
            /**
             * 替换文本标记{1}{2}{3}..
             * @param str
             * @param params
             */
            TextUtil.replaceMark = function (str, params) {
                if (!str) {
                    return str;
                }
                if (!params) {
                    return str;
                }
                var isHtml = TextUtil.isHtml(str);
                var len = params.length;
                var param;
                var keyStr;
                var idxKey;
                var idxSpan;
                var idxSpanEnd;
                for (var i = 0; i < len; ++i) {
                    keyStr = "{" + i + "}";
                    param = params[i];
                    if (isHtml) {
                        if (TextUtil.isHtml(param)) { // span不能嵌套
                            idxKey = str.indexOf(keyStr);
                            if (idxKey != -1) {
                                idxSpan = str.lastIndexOf(TextUtil.spanHead, idxKey);
                                if (idxSpan != -1) {
                                    idxSpanEnd = str.lastIndexOf(TextUtil.spanEnd, idxKey);
                                    if (idxSpanEnd < idxSpan) {
                                        idxSpanEnd = str.indexOf(">", idxSpan);
                                        if (idxSpanEnd != -1) {
                                            param = TextUtil.spanEnd + param; // 前面加个结束
                                            param = param + str.substring(idxSpan, idxSpanEnd + 1); // 后面加个开头
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if (typeof param === "string") {
                                param = param.replace(TextUtil.spaceReg, TextUtil.spaceNbsp);
                            }
                        }
                    }
                    str = str.replace(keyStr, param);
                }
            };
            TextUtil.spanHead = "<span";
            TextUtil.spanEnd = "</span>";
            TextUtil.spaceNbsp = "&nbsp;";
            TextUtil.spaceReg = /\s/g;
            TextUtil.lineBr = "<br/>";
            TextUtil.lineReg = /\n|\r|<br\/>|<br>/i;
            TextUtil.htmlReg = /<.*?>/g;
            return TextUtil;
        }());
        utils.TextUtil = TextUtil;
    })(utils = sear.utils || (sear.utils = {}));
})(sear || (sear = {}));
//# sourceMappingURL=TextUtil.js.map