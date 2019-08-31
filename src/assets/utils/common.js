"use strict";
exports.__esModule = true;
// $(function () {
//     checkCesLicense();
//     generateLogin();
//     if (typeof overrideHeadParam === 'function') {
//         overrideHeadParam();
//     }
// });
// var licenseTimer;
var axios_1 = require("./axios");
var api_1 = require("./api");
var antd_1 = require("antd");
function checkCesLicense() {
    axios_1["default"].post(api_1["default"].commons.checkCesLicense).then(function (res) {
        if (res.body) {
            window.location.href = res.data.body;
        }
    }, function () {
    });
}
exports.checkCesLicense = checkCesLicense;
/**
 * 显示错误信息【登录】
 */
function showErrorMsg(errorCode) {
    var err_msg;
    if (errorCode != '' && errorCode == 0) {
        err_msg = "验证码错误!!!";
    }
    else if (errorCode == 1) {
        err_msg = "用户名或密码错误!!!";
    }
    else {
        err_msg = '';
    }
    antd_1.message.error(err_msg);
}
exports.showErrorMsg = showErrorMsg;
function _extends(target) {
    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    //  return _extends.apply(this, arguments);
}
exports._extends = _extends;
// //回车登录
// function keyClick(e) {
//     if (!e)
//         e = window.event;
//     if ((e.keyCode || e.which) == 13) {
//         $('.login-btn').click();
//     }
// }
// //冒泡提示封装
// function showBubble(msg) {
//     $("#not_edit").remove();
//     $("body").append("<p class='not_edit' id='not_edit'>" + msg + "</p>");
//     setTimeout(function () {
//         $("#not_edit").remove();
//     }, 3000);
// }
/**
 * 图片加载错误时
 */
function showErrorImg(isResc) {
    if (isResc === true) {
        return require('../../assets/images/default_figure.jpg');
    }
    else {
        return require('../../assets/images/default_user.jpg');
    }
}
exports.showErrorImg = showErrorImg;
// /**
//  * 保存返回地址
//  */
// function savePreviousUrl(previousUrl, type) {
//     $.ajax({
//         type: 'POST',
//         url: getContextPath() + '/fore/live/savePreviousUrl',
//         data: {
//             url: previousUrl,
//             type: type
//         },
//         dataType: "json"
//     })
// }
// /**
//  * 如果页面上设置了跳转的页面  则跳转
//  * 否则默认重定向本页
//  */
// function checkRedirectUrl() {
//     var existInput = $(".preUrl");
//     if (existInput != undefined && existInput.length > 0) {
//         return;
//     } else {
//         saveCurrentUrl();
//     }
// }
// /* rbs 表情替换 ↓↓↓  */
// function replace_em(str) {
//     var strConvert = str.replace(/\/:([A-Z0-9]{2})\(([A-Z]+)\)/g, function (word) {
//             return '<img src="' + getBackCtx() + '/scripts/plugins/qqface/facepic/' + (word.substring(word.indexOf("("))).toLowerCase() + '.png" />';
//         }
//     );
//     return strConvert;
// }
function replace_img(str) {
    str = str.replace(/<img src="\/scripts\/plugins\/qqface\/facepic\/\(([a-z]*)\)\.png" id="\/:([A-Z0-9]{2})\(([A-Z]+)\)">/g, '/:$2($3)');
    str = str.replace(/<img src="http:\/\/\d+\.\d+\.\d+\.\d+\/scripts\/plugins\/qqface\/facepic\/\([a-z]*\)\.png" id="(\/:[A-Z0-9]{2}\([A-Z]+\))" style="font-family: PingFangSC-Regular, Tahoma, &quot;Microsoft Yahei&quot;, sans-serif;">/g, '$1'); //替换复制图片
    str = str.replace(/<img id="\/:([A-Z0-9]{2})\(([A-Z]+)\)" src="\/scripts\/plugins\/qqface\/facepic\/\(([a-z]*)\)\.png">/g, '/:E5($2)');
    str = str.replace(/<img width="30" height="30" id="\/:([A-Z0-9]{2})\(([A-Z]+)\)" src="\/scripts\/plugins\/qqface\/facepic\/\(([a-z]*)\)\.png">/g, '/:E5($2)');
    return str;
}
exports.replace_img = replace_img;
function replace_htmlTag(str) {
    var strC = str.replace("&", "&amp;").replace("\"", "&quot;")
        .replace("<", "&lt;").replace(">", "&gt;").replace("'", "&#39;");
    return strC;
}
exports.replace_htmlTag = replace_htmlTag;
function repalce_toHtml(str) {
    var strC = str.replace("&amp;", "&").replace("&quot;", "\"")
        .replace("&lt;", "<").replace("&gt;", ">").replace("&#39;", "'");
    return strC;
}
exports.repalce_toHtml = repalce_toHtml;
// /**
//  * 若提交登录表单时  没有设置preurl 会跳转/fore/personal/personalInfo/toCourse路径
//  * 详见loginsuccesshandler 189
//  * 只能设置一个该input  重复设置会被替换
//  * 保存当前url——跳转本页面 请使用saveCurrentUrl
//  * @param previousUrl 前台页面需设置/fore/ 后台页面设置/
//  */
// function saveUrl(previousUrl) {
//     var existInput = $("#loginform .preUrl");
//     if (existInput != undefined && existInput.length > 0) {
//         existInput.val(previousUrl);
//     } else {
//         $("#loginform .login-main").append('<input name="preUrl" class="preUrl" type="hidden" value="' + previousUrl + '">');
//     }
// }
// function saveCurrentUrl() {
//     var currentUrl = window.location.pathname + window.location.search;
//     saveUrl(currentUrl);
// }
// /**
//  * div滚动条
//  * 滚动至最下方
//  */
// function scrollToBottom(obj) {
//     $(obj).scrollTop($(obj)[0].scrollHeight);
// }
/**
 * div滚动条
 * 滚动至最上方
 */
function scrollToTop(elementId) {
    // if (elementId) {
    //     document.getElementById(elementId).scrollTop = 0;
    // }
}
exports.scrollToTop = scrollToTop;
// //弹出加载转圈等待
// function showLoadingImg() {
//     removeLoadingImg();
//     $('body').append('<div class="loading"><img  src="' + getContextPath() + '/images/download.gif"><p class="loading-progress relative"></p></div> ');
//     commonMask($('.loading'));
// }
// //取消加载转圈等待
// function removeLoadingImg() {
//     $('.loading').remove();
//     $('.mask').remove();
// }
// function cancelEvent(fun) {
//     (fun)();
// }
/**
 * 字符串转换为时间戳
 */
function getDateTimeStamp(dateStr) {
    return Date.parse(dateStr.replace(/-/gi, "/"));
}
exports.getDateTimeStamp = getDateTimeStamp;
/**
 * 将时间转换成
 * 时间字符串
 * 几天前
 * 几小时前
 * 几分钟前
 * 刚刚
 * @auther FredG
 * */
function getDateDiff(dateStr) {
    var publishTime = getDateTimeStamp(dateStr) / 1000, d_seconds, d_minutes, d_hours, d_days, timeNow = new Date().getTime() / 1000, d, date = new Date(publishTime * 1000), Y = date.getFullYear(), M = date.getMonth() + 1, D = date.getDate(), H = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
    //小于10的在前面补0
    if (M < 10) {
        M = '0' + M;
    }
    if (D < 10) {
        D = '0' + D;
    }
    if (H < 10) {
        H = '0' + H;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    d = timeNow - publishTime;
    d_days = d / 86400;
    d_hours = d / 3600;
    d_minutes = d / 60;
    d_seconds = d;
    if (d_days > 0 && d_days < 3) {
        return d_days + '天前';
    }
    else if (d_days <= 0 && d_hours > 0) {
        return d_hours + '小时前';
    }
    else if (d_hours <= 0 && d_minutes > 0) {
        return d_minutes + '分钟前';
    }
    else if (d_seconds < 60) {
        if (d_seconds <= 30) {
            return '刚刚';
        }
        else {
            return d_seconds + '秒前';
        }
    }
    else if (d_days >= 3 && d_days < 30) {
        return M + '-' + D + '&nbsp;' + H + ':' + m;
    }
    else if (d_days >= 30) {
        return Y + '-' + M + '-' + D + '&nbsp;' + H + ':' + m;
    }
    return '刚刚发表'; //鉴于服务器时间可能和本地时间的差异导致返回undefined
}
exports.getDateDiff = getDateDiff;
// String.prototype.startWith = function (str) {
//     var reg = new RegExp("^" + str);
//     return reg.test(this);
// }
// String.prototype.endWith = function (str) {
//     var reg = new RegExp(str + "$");
//     return reg.test(this);
// }
/**
 * js post提交封装 FredG
 * @param URL
 * @param PARAMS
 * @returns {Element}
 */
function createForm(url, params) {
    var tempForm = document.createElement("form");
    tempForm.action = url;
    tempForm.method = "post";
    tempForm.style.display = "none";
    for (var attr in params) {
        var tempParam = document.createElement('input');
        tempParam.name = attr;
        tempParam.value = params[attr];
        tempParam.type = 'hidden';
        tempForm.appendChild(tempParam);
    }
    document.body.appendChild(tempForm);
    //tempForm.submit();
    return tempForm;
}
exports.createForm = createForm;
// //产生分页
// function showPageUl(data, obj) {
//     if (data.rowCount > data.pageSize) {
//         $("#pageUl").remove();
//         var page = '<ul class="pagination clear" id="pageUl">' +
//             '</ul>';
//         obj.append(page);
//         initDatas(data);
//         gerneratePage(pageSize);  //生成页脚数据
//         gerneratePageCount(pageSize); //生成页数
//         pageClick();   //点击触发事件
//     } else {
//         $("#pageUl").remove();
//     }
// }
// //搜索
// function searchList(obj, ipt, data) {
//     //判断是否有匹配的值
//     if (true) {
//         $(".result-List").remove();
//         var resultList = "<ul class='result-List'>";
//         for (var i = 0; i < data.length; i++) {
//             var keywords = data[i].keywords;
//             resultList += '<li>' + keywords + '</li>';
//         }
//         resultList += '</ul>';
//         obj.append(resultList);
//         $(".result-List li").click(function () {
//             ipt.val($(this).html());
//             $(this).parent().remove();
//             var keywords = $.trim($("#search-content").val());
//             window.open(getContextPath() + "/home/search?keywords=" + keywords);
//         });
//         $(document).click(function () {
//             $(".result-List").remove();
//         })
//     }
// }
// //检查功能权限
// function checkSecurity(securityUrl) {
//     var flag = false;
//     var url = getContextPath() + "/security/checkSecurity";
//     $.ajax({
//         type: 'POST',
//         url: url,
//         async: false,
//         data: {
//             securityUrl: securityUrl
//         },
//         dataType: "Json",
//         success: function (data) {
//             flag = data;
//             if (!data && (typeof securityCallback === 'function')) {
//                 securityCallback();
//             }
//         }
//     });
//     return flag;
// }
// //点击向左向右翻页
// function clickPage(childNo, fatherNode, sonNode, prevNode, nextNode) {
//     var Li = sonNode;
//     var w = Li.length * Li.outerWidth(true);
//     fatherNode.css('width', w + 'px');
//     var childNodeNumber = childNo;
//     var childNodeWidth = fatherNode.find('li').eq(0).width() + parseFloat(fatherNode.find('li').eq(0).css('marginRight'));
//     var moveDistance = childNodeNumber * childNodeWidth;
//     var i = 0;
//     var maxI = Math.ceil(fatherNode.width() / moveDistance) - 1;
//     var minI = 0;
//     prevNode.click(function () {
//         if (i === minI) {
//             console.log('到最左头了');
//             return;
//         }
//         i--;
//         fatherNode.stop().animate({'left': -moveDistance * i}, 500, 'swing');
//     });
//     nextNode.click(function () {
//         if (i === maxI) {
//             console.log('到最右头了');
//             return;
//         }
//         i++;
//         fatherNode.stop().animate({'left': -moveDistance * i}, 500, 'swing');
//     });
// }
// function showStateOfTask(_this) {
//     var liveStartDate = new Date(_this.liveStartTime);
//     var liveEndDate = new Date(_this.liveEndTime);
//     var liveState = _this.liveState;
//     var taskSrc = _this.taskSrc;
//     var checkIntoClassResult = _this.checkIntoClassResult;
//     var now = new Date();
//     var res = {};
//     //有权限进入互动
//     if (liveState == 'LIVE' && checkIntoClassResult == 'INTO_INTERACT') {
//         res.classStyle = "live";
//         res.tabelName = "正在互动";
//         res.tableTitle = ""; //倒计时 xxx分钟后结束 日期
//         res.iconCss = 'icon-zhengzaizhibo';
//         //未到预设结束时间
//     }
//     //课中，进入直播
//     else if (liveState == 'LIVE') {
//         res.classStyle = "live";
//         res.tabelName = "正在直播";
//         res.tableTitle = ""; //倒计时 xxx分钟后结束 日期
//         res.iconCss = 'icon-zhengzaizhibo';
//         console.log(liveEndDate);
//         //未到预设结束时间
//     } else if (liveState == 'INIT') {
//         res.classStyle = "live-preview";
//         res.tabelName = "预告";
//         res.iconCss = 'icon-yugao1';
//         res.tableTitle = "";
//         var duration = liveStartDate.getTime() - now.getTime();
//         //未到预设开始时间
//         if (duration > 0) {
//             if (duration < 1000 * 60 * 1) {
//                 res.tableTitle = "马上开始";
//             } else if (duration < 1000 * 60 * 30) {
//                 res.tableTitle = parseInt(duration / (1000 * 60)) + "分钟后开始";
//             } else if (duration < 1000 * 60 * 60) {
//                 res.tableTitle = "半小时后开始";
//             } else if (duration < 1000 * 60 * 60 * 24) {
//                 res.tableTitle = parseInt(duration / (1000 * 60 * 60)) + "小时后开始";
//             } else {
//                 var year = liveStartDate.getFullYear();
//                 var month = liveStartDate.getMonth() + 1;
//                 var strDate = liveStartDate.getDate();
//                 if (month >= 1 && month <= 9) {
//                     month = "0" + month;
//                 }
//                 if (strDate >= 0 && strDate <= 9) {
//                     strDate = "0" + strDate;
//                 }
//                 res.tableTitle = year + '-' + month + '-' + strDate + "开始";
//             }
//         }
//     } else if (liveState == 'RECORD') {
//         res.classStyle = "on-demand";
//         res.tabelName = "点播";
//         res.iconCss = 'icon-yousanjiao';
//         res.tableTitle = "";
//         var videoDuration = _this.videoDuration;
//         if (videoDuration != undefined && videoDuration != null && videoDuration != 0) {
//             res.tableTitle = "时长 " + timeStamp_to_time(videoDuration);
//         } else {
//             res.tableTitle = '';
//         }
//     } else if (liveState == 'ABANDON') {
//         res.classStyle = "class-update";
//         res.tabelName = "无视频";
//         res.iconCss = 'icon-gengxin';
//         res.tableTitle = "";
//     } else {
//         res.classStyle = "class-update";
//         res.tabelName = "课时更新";
//         res.iconCss = 'icon-gengxin';
//         res.tableTitle = "";
//         if (liveState == 'UPLOAD') {
//             res.tableTitle = "上传中";
//         } else if (liveState == 'TRANSCODING') {
//             res.tableTitle = "转码中";
//         } else if (liveState == 'RECORDING') {
//             res.tableTitle = "录制中";
//         } else {
//             res.tableTitle = "更新状态中";
//         }
//     }
//     return res;
// }
exports.timeStamp_to_time = function (s) {
    var t;
    if (s > -1) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        if (hour < 10) {
            t = '0' + hour + ":";
        }
        else {
            t = hour + ":";
        }
        if (min < 10) {
            t += "0";
        }
        t += min + ":";
        if (sec < 10) {
            t += "0";
        }
        t += sec;
    }
    return t;
};
function strToDate(str) {
    if (str instanceof Date) {
        return str;
    }
    var regEx = new RegExp("\\-", "gi");
    // str = str.replace(regEx, "/");
    var milliseconds = Date.parse(str);
    var date = new Date();
    date.setTime(milliseconds);
    return date;
}
exports.strToDate = strToDate;
// 截取URL 字符串
function getQueryString() {
    var url = window.location.href;
    var num = url.indexOf("?");
    var str = url.substr(num + 1);
    var arr = str.split("&");
    var name = "";
    var value = "";
    var params;
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            params[name] = value;
        }
    }
    return params;
}
exports.getQueryString = getQueryString;
function Base64() {
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding
    var encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };
    // public method for decoding
    var decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    };
    // private method for UTF-8 encoding
    var _utf8_encode = function (str) {
        var string = str.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    // private method for UTF-8 decoding
    var _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = 0, c1 = 0, c2 = 0, c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
}
exports.Base64 = Base64;
/**
 * 截取url中指定字符串的值
 * @param str
 */
function query(str) {
    var result;
    var strindex = window.location.search.indexOf(str);
    if (strindex != -1) {
        if (window.location.search.slice(strindex).split("&").length > 1) {
            result = window.location.search.slice(strindex).split("&")[0].split("=")[1];
        }
        else {
            result = window.location.search.slice(strindex).split("=")[1];
        }
    }
    return result;
}
exports.query = query;
/**
 * 数组去重
 */
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!');
        return;
    }
    return Array.prototype.filter.call(arr, function (item, index) {
        return arr.indexOf(item) === index;
    });
}
exports.unique = unique;
/**
 * 过滤课程类型1
 * @param course
 * @returns {number}
 */
function setCourseType(course) {
    switch (course) {
        case 'COURSE_COMMON':
            return 0;
            break;
        case 'COURSE_MICRO':
            return 1;
            break;
        case 'COURSE_DELIVERY':
            return 2;
            break;
        case 'COURSE_INTERACT':
            return 3;
            break;
        default: throw new Error('Not matched');
    }
}
exports.setCourseType = setCourseType;
/**
 * 比较是否相等
 * @param x
 * @param y
 */
function equals(x, y) {
    var typeX = x instanceof Object;
    var typeY = y instanceof Object;
    if (!typeY || !typeX) {
        return x === y;
    }
    if (Object.keys(x).length !== Object.keys(y).length) {
        return false;
    }
    var newS = Object.keys(x);
    for (var i in newS) {
        var p = newS[i];
        var tyX = x[p] instanceof Object;
        var tyY = y[p] instanceof Object;
        if (tyX && tyY) {
            equals(x[p], y[p]);
        }
        else if (x[p] != y[p]) {
            return false;
        }
    }
    return true;
}
exports.equals = equals;
