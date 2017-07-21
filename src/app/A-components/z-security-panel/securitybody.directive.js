import templateUrl from './template.view.html';
// import './index.scss';
function zSecurityBody() {
    "ngInject";
    return {
        restrict: "AE",
        template:'<div class="security-body expandDown" ng-show="isExtanded" ng-transclude></div>',
        replace: true,
        transclude:true,
        link(scope, el, attr) {
    //   
        }
    }

}
export default {
    name:'zSecurityBody',
    fn:zSecurityBody
};