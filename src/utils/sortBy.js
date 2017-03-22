/**
 * 对数组进行排序
 */
var WEEKS = {
    '周一': 1, '星期一': 1,
    '周二': 2, '星期二': 2,
    '周三': 3, '星期三': 3,
    '周四': 4, '星期四': 4,
    '周五': 5, '星期五': 5,
    '周六': 6, '星期六': 6,
    '周日': 7, '星期日': 7, '星期天': 7
};
var WEEKS = {
    '周一': 1, '星期一': 1,
    '周二': 2, '星期二': 2,
    '周三': 3, '星期三': 3,
    '周四': 4, '星期四': 4,
    '周五': 5, '星期五': 5,
    '周六': 6, '星期六': 6,
    '周日': 7, '星期日': 7, '星期天': 7
};
var MONTHS = {
    '一月': 1, '1月': 1,
    '二月': 2, '2月': 2,
    '三月': 3, '3月': 3,
    '四月': 4, '4月': 4,
    '五月': 5, '5月': 5,
    '六月': 6, '6月': 6,
    '七月': 7, '7月': 7,
    '八月': 8, '8月': 8,
    '九月': 9, '9月': 9,
    '十月': 10, '10月': 10,
    '十一月': 11, '11月': 11,
    '十二月': 12, '12月': 12
};
function sortBy(index) {
    return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[index];
            b = p[index];
            if (a === b) {
                return 0;
            }

            if (WEEKS[a] && WEEKS[b]) {
                return WEEKS[a] < WEEKS[b] ? -1 : 1;
            }
            if (MONTHS[a] && MONTHS[b]) {
                return MONTHS[a] < MONTHS[b] ? -1 : 1;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            throw ("sort object error!");
        }
    }
}

module.exports = sortBy;
