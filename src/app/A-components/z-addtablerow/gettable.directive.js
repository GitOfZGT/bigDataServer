
//table中点击当前行，展开详细内容
function getTable() {
    "ngInject";
    return {
        restrict: 'A',
        controller($scope){
            "ngInject";
            var thisCtrl=this;
            $scope.addEl=(el)=>{
                thisCtrl.el=el;
            }
        },
        compile(){
            return{
                pre(scope,el,attr){
                    
                },
                post(scope,el,attr){
                    scope.addEl(el);
                }
            }
        }
    }
}
export default {
    name: 'getTable',
    fn: getTable
};