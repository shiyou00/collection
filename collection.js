/**
 * 筛选数据函数
 * @param list 待筛选的数据列表
 * @param keyword 输入的关键词
 * @param fields 要筛选的字段
 * @param callback 回调处理函数
 * @returns {*}
 */
function filter(
    list,
    keyword,
    fields,
    callback
){
    let filteredList;
    if (keyword) {
        const lowerCaseKeyword = keyword.toLowerCase();
        filteredList = list.filter((item, index) => {
            if (callback) {
                callback(item, index);
            }

            return fields.some(field =>
                item[field].toLowerCase().includes(lowerCaseKeyword)
            );
        });
    } else {
        list.forEach((item, index) => {
            if (callback) {
                callback(item, index);
            }
        });
        filteredList = list;
    }
    return filteredList;
}

/**
 * 返回当前页的数据
 * @param list
 * @param page
 * @param pageSize
 * @returns {*}
 */
function paging(list, page, pageSize) {
    const pageStart = (page - 1) * pageSize;
    return list.slice(pageStart, pageStart + pageSize);
}

/**
 * 兼容各个浏览器绑定事件
 * @type {{addHandler: EventUtil.addHandler, removeHandler: EventUtil.removeHandler}}
 */
var EventUtil = {

    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    getEvent: function(event){
        return event ? event : window.event;
    },

    getTarget: function(event){
        return event.target || event.srcElement;
    },

    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};

/**
 * 日期格式化
 * @param fmt
 * @returns {*}
 */
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "H+" : this.getHours(),                   //24小时制
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //12小时制
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    // 正则匹配y
    if(/(y+)/.test(fmt)) {
        // RegExp.$1 = yyyy
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    // 分别取用正则去匹配和替换月日时分秒
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};