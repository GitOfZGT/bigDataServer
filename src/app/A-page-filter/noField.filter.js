//过滤掉json数据中包含某个字段的某值 的数据
function hasField(){
    return function(arrays,field,value){
        return arrays.filter(function(item,index){
            if(item[field]!==value){
                return true;
            }
        })
    }
}
export default {name:'hasField',fn:hasField}