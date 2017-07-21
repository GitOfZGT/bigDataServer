//取得json数据中包含某个字段的某值 的数据
function noField(){
    return function(arrays,field,value){
        return arrays.filter(function(item,index){
            if(item[field]===value){
                return true;
            }
        })
    }
}
export default {name:'noField',fn:noField}