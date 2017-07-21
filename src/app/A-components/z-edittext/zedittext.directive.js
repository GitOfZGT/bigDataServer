import templateUrl from './template.view.html';
import './index.scss';
//微调控件
function zEditText() {
    "ngInject";
    return {
        restrict: "AE",
        templateUrl,
        replace: true,
        scope: {
          editModel:"=",
          saveCallback:'&'
        },
        link(scope, el, attr) {
       scope.edit=()=>{
           scope.oldvalue=scope.editModel;
           scope.editModeltext=scope.editModel;
           scope.isEdit=true;
       }
       scope.save=()=>{
           (scope.saveCallback||angular.noop)();
           scope.editModel=scope.editModeltext;
           scope.isEdit=false;
       }
       scope.close=()=>{
           scope.editModel=scope.oldvalue;
           scope.isEdit=false;
       }
        }
    }

}
export default {
    name: 'zEditText',
    fn: zEditText
};