


/*编码token值*/
function encodeToken(token) {
  if (token == undefined || token == null) return "";

  var tmp = "";
  for (var i = 0; i < token.length; i++) {
    if (token[i] == "+") {
      tmp += "%2B";
    }
    else if (token[i] == " ") {
      tmp += "%20";
    }
    else if (token[i] == "/") {
      tmp += "%2F";
    }
    else if (token[i] == "?") {
      tmp += "%3F";
    }
    else if (token[i] == "%") {
      tmp += "%25";
    }
    else if (token[i] == "#") {
      tmp += "%23";
    }
    else if (token[i] == "&") {
      tmp += "%26";
    }
    else if (token[i] == "=") {
      tmp += "%3D";
    } else {
      tmp += token[i];
    }
  }
  return tmp;
}

function returnFloat(value) {
  if (value == null) return "0.00";
  var value = Math.round(parseFloat(value) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
}
//功能：将浮点数四舍五入，取小数点后2位
export function toDecimal(x) {
  var f = parseFloat(x);

  if (isNaN(f)) {
    return;
  }
  f = Math.round(x * 100) / 100;
  return f;
}

function isNotFloat(theFloat) {
  //判断是否为浮点数
  if (theFloat == null) return true;
  var len = theFloat.length;
  var dotNum = 0;
  if (len == 0)
    return true;
  for (var i = 0; i < len; i++) {
    var oneNum = theFloat.substring(i, i + 1);
    if (oneNum == ".")
      dotNum++;
    if (((oneNum < "0" || oneNum > "9") && oneNum != ".") || dotNum > 1)
      return true;
  }
  if (len > 1 && theFloat.substring(0, 1) == "0") {
    if (theFloat.substring(1, 2) != ".")
      return true;
  }
  return false;
}

function isEmail(email) {
  var srt = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
  if (!srt.test(email)) {
    //不合法时
    return false;
  }
  else {
    //合法时
    return true;
  }
}

export function isNull(key) {
  if (key == undefined || key === "" || key === "null" || key === "NULL") return true;

  return false;
}

/*********************************************************************
 * 随机生成颜色, 例如:#ff00ff
 * 编写人：郑宁林
 * *******************************************************************/
function getRandomColor() {
  return '#' +
    (function (color) {
      return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
      && (color.length == 6) ? color : arguments.callee(color);
    })('');
}

/*********************************************************************
 * 判断字符串strDate是否为一个正确的日期格式：
 * yyyy-MM-dd
 * 编写人：郑宁林
 * *******************************************************************/
function isDate(strDate) {
  if (strDate == undefined || strDate == "" || strDate == null || strDate.length != 10) return false;

  var strDataValue = strDate.split("-");
  if (strDataValue.length != 3) return false;

  var i;
  i = parseFloat(strDataValue[0]);
  if (i <= 0 || i > 9999) { /*年*/
    return false;
  }
  i = parseFloat(strDataValue[1]);
  if (i <= 0 || i > 12) { /*月*/
    return false;
  }
  i = parseFloat(strDataValue[2]);
  if (i <= 0 || i > 31) { /*日*/
    return false;
  }
  return true;
}

/**
 * 对数组进行排序
 *
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
export function sortBy(index) {
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



