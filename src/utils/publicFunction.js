let formatDate = function(date){
    date=new Date(date);
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
};
let defaultCascaderArr = function(id,mapData){
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
};
//树状json转单层
let treeToJson = function(tree){
    //console.log(tree);
    let arJsonData = tree;
    let arJson = [];    //格式化后数据
    function refining(arJsonData,arJson) {//将嵌套的JSON对象遍历出来，转为二维数组
        for (let i = 0; i < arJsonData.length; i++) {
            arJson.push({department_id:arJsonData[i].value,department_name:arJsonData[i].label,
                association_pid:arJsonData[i].association_pid,association_is_department:arJsonData[i].association_is_department});
            if(arJsonData[i].children){
                refining(arJsonData[i].children,arJson);
            }
        }
    }
    refining(arJsonData,arJson);
    //console.log(arJson)
    return arJson;
};

export { formatDate ,defaultCascaderArr ,treeToJson }
