/*
* param date:{ Date },日期
* param options:{ none | 'number'} none:2018-01-01 number:20180101
* return String
* */
export function formatDate (date,options){
    date=new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let monthString = month.toString();
    let dayString = day.toString();
    let result = '';
    if(monthString.length===1){
        monthString='0'+monthString;
    }
    if(dayString.length===1){
        dayString='0'+dayString;
    }
    switch (options){
        case 'number':result = `${year}${monthString}${dayString}`;
        break;
        default:result = `${year}-${monthString}-${dayString}`;
    }
    return result;
}
export function defaultCascaderArr (id,mapData){
    let result=[];
    function traverse(id){
        result.push(id);
        for (let val of mapData) {
            if (val['association_id'] === id && val['association_pid'] !== 0) {
                traverse(val['association_pid']);
            }
        }
    }
    traverse(id);
    return result;
}
//树状json转单层json
export function treeToJson (tree){
    //console.log(tree);
    let arJsonData = tree;
    let arJson = [];    //格式化后数据
    function refining(arJsonData,arJson) {//将嵌套的JSON对象遍历出来，转为二维数组
        for (let i = 0; i < arJsonData.length; i++) {
            arJson.push({association_id:arJsonData[i].association_id,association_name:arJsonData[i].association_name,
                association_pid:arJsonData[i].association_pid,association_is_department:arJsonData[i].association_is_department});
            if(arJsonData[i].children){
                refining(arJsonData[i].children,arJson);
            }
        }
    }
    refining(arJsonData,arJson);
    //console.log(arJson)
    return arJson;
}

/*
* 单层json转树状结构
* @param   {json}      json数据
* @param   {String}    id的字符串
* @param   {String}    父id的字符串
* @param   {String}    children的字符串
* @return  {Array}     数组
*/
export function formatJsonToTree (a, idStr, pidStr, chindrenStr) {
    let r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0,
        len = a.length;
    for (; i < len; i++) {
        hash[a[i][id]] = a[i];
    }
    for (; j < len; j++) {
        let aVal = a[j], hashVP = hash[aVal[pid]];
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
        } else {
            r.push(aVal);
        }
    }
    return r;
}

//data_name_str：数据中的姓名，expected_id_str:格式化后的ID字符串，expected_name_str：格式化后的姓名字符串(result,'association_id','association_pid','chindren','association_name','value','label')
export function workedFormatJsonToTree(data,data_id_str,data_pid_str,chindren_str,data_name_str,expected_id_str,expected_name_str) {
    let workedData = formatJsonToTree(data,data_id_str,data_pid_str,chindren_str);
    let tmpStr = JSON.stringify(workedData);
    tmpStr = tmpStr.replace(new RegExp(data_id_str,'g'), expected_id_str);
    tmpStr = tmpStr.replace(new RegExp(data_name_str,'g'), expected_name_str);
    workedData = JSON.parse(tmpStr);
    return workedData;
}

/*
@param {Number id} 父节点ID
@param {ObjectArray plainJson} 单层的json数据
@return {Array} 后代ID数组
2018/2/24 by bing
 */
export function searchSonIDArr (id,plainJson) {
    let arr = [];
    function recursion(id) {
        for(let val of plainJson){
            if(val.association_id===id){
                for(let value of plainJson){
                    if(value.association_pid===id){
                        arr.push(value.association_id);
                        recursion(value.association_id);
                    }
                }
            }
        }
    }
    recursion(id,plainJson);
    return arr;
}

export function test () {
    console.log(this);
}
