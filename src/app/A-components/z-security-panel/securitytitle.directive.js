import templateUrl from './template.view.html';
// import './index.scss';
function zSecurityTitle() {
    "ngInject";
    return {
        restrict: "AE",
        template:' <div class="security-title cursor-pointer" ng-click="extanded()"><i ng-class="isExtanded?\'fa-chevron-circle-down\':\'fa-chevron-circle-right\'" class="fa text-info"></i><div class="clearfix" ng-transclude></div></div>',
        replace: true,
        transclude:true,
        link(scope, el, attr) {
    //   
        }
    }

}
export default {
    name:'zSecurityTitle',
    fn:zSecurityTitle
};