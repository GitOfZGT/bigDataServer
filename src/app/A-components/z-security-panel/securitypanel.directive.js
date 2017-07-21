import templateUrl from './template.view.html';
import './index.scss';
function zSecurityPanel() {
    "ngInject";
    return {
        restrict: "AE",
        template:'<div class="security-panel margin-bottom-15" ng-transclude></div>',
        replace: true,
        transclude:true,
        link(scope, el, attr) {
        scope.extanded=()=>{
            scope.isExtanded=scope.isExtanded?false:true;
        }
        }
    }

}
export default {
    name:'zSecurityPanel',
    fn:zSecurityPanel
};