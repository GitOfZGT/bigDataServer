import templateUrl from './template.view.html';
function zBtnGroup() {
    "ngInject";
    return {
        restrict: "AE",
        templateUrl,
        replace: true,
        scope: {
            listData: "=?listData",
            type: "=?type",//样式primary ,info,success等
            clickEnd: "&",
            btnClass:'@'
        },
        link(scope, el, attr) {
            if(!scope.btnClass){
                scope.btnClass='';
            }
            scope.btnChoose = (itemThis) => {
                scope.listData.forEach(item => {
                    item.active = false;
                });
                itemThis.active = true;
            }
            scope.workcallback = (item) => {
                scope.btnChoose(item);
                (scope.clickEnd || angular.noop)({
                    $item: item
                });
            }
        }
    }

}
export default {
    name: 'zBtnGroup',
    fn: zBtnGroup
};