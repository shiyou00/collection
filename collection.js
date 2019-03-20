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