import templateUrl from './template.view.html';
import './index.scss';
function zPoint() {
    "ngInject";
    return {
        restrict: "AE",
        templateUrl,
        replace: true,
        scope: {
           left:'='
        },
        link(scope, el, attr) {
       
          
        }
    }

}
export default {
    name:'zPoint',
    fn:zPoint
};