module sear.utils {
    import IFilter = laya.filters.IFilter;
    import ColorFilter = laya.filters.ColorFilter;

    /**
     * 
     * 
     * @author pbk
     */
    export class FilterUtil {

        static addFilter(target: Sprite, filter: IFilter): void {
            if (!target || !filter) {
                return;
            }
            let filters: IFilter[] = target.filters;
            if (!filters) {
                filters = [filter];
            } else {
                if (filters.indexOf(filter) != -1) {
                    return;
                }
                filters.push(filter);
            }
            target.filters = filters;
        }

        static delFilter(target: Sprite, filter: IFilter): void {
            if (!target || !filter || !target.filters) {
                return;
            }
            let idx: number = target.filters.indexOf(filter);
            if (idx != -1) {
                let filters: IFilter[] = target.filters;
                filters.splice(idx, 1);
                target.filters = filters;
            }
        }

        private static _highLight: ColorFilter = null;
        /** 高亮滤镜*/
        static getHightLight(): ColorFilter {
            if (!FilterUtil._highLight) {
                FilterUtil._highLight = new ColorFilter([
                    1.6, 0, 0, 0, 0,
                    0, 1.6, 0, 0, 0,
                    0, 0, 1.6, 0, 0,
                    0, 0, 0, 1, 0
                ]);
            }
            return FilterUtil._highLight;
        }

        /** 灰色滤镜*/
        static getGrayFilter(): ColorFilter {
            return laya.ui.UIUtils["grayFilter"];
        }
    }
}