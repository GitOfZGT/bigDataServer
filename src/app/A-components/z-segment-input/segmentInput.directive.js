import templateUrl from './template.view.html';
import './index.scss';
function zSegmentInput() {
    "ngInject";
    return {
        restrict: "AE",
        templateUrl,
        replace: true,
        scope: {
            segmentModel: "=?",
            segmentBlur:"&"
        },
        link(scope, el, attr) {
    //    console.log(scope.segmentModel+1);
            scope.value1 = '';
            scope.value2 = '';
            scope.value3 = '';
            scope.value4 = '';
            var skip1,
                skip2,
                skip3,
                skip4;
            scope.$watch(function () { return scope.value1 }, function (newv) {
                if(!skip1){
                    skip1=true;
                    return;
                }

                if (newv == '' && scope.value3 == "" && scope.value2 == ""&& scope.value4 == "")
                    scope.segmentModel = '';
                else
                    scope.segmentModel = newv + "." + scope.value2 + "." + scope.value3+ "." + scope.value4;
                // console.log(scope.segmentModel+2);
            });
            scope.$watch(function () { return scope.value2 }, function (newv) {
                if(!skip2){
                    skip2=true;
                    return;
                }
                if (newv == '' && scope.value1 == "" && scope.value3 == ""&& scope.value4 == "")
                    scope.segmentModel = '';
                else
                    scope.segmentModel = scope.value1 + "." + newv + "." + scope.value3+ "." + scope.value4;
                // console.log(scope.segmentModel+3);
            });
            scope.$watch(function () { return scope.value3 }, function (newv) {
                if(!skip3){
                    skip3=true;
                    return;
                }
                if (newv == '' && scope.value1 == "" && scope.value2 == ""&& scope.value4 == "")
                    scope.segmentModel = '';
                else
                    scope.segmentModel = scope.value1 + "." + scope.value2 + "." + newv+ "." + scope.value4;
                // console.log(scope.segmentModel+4);
            });
            scope.$watch(function () { return scope.value4 }, function (newv) {
                if(!skip4){
                    skip4=true;
                    return;
                }
                if (newv == '' && scope.value1 == "" && scope.value2 == ""&& scope.value3 == "")
                    scope.segmentModel = '';
                else
                    scope.segmentModel = scope.value1 + "." + scope.value2+ "." + scope.value3 + "." + newv;
                // console.log(scope.segmentModel+4);
            });
            scope.$watch(function () { return scope.segmentModel; }, function (newv) {
                // console.log(newv+5);
                if (!newv) {
                    scope.value1 = '';
                    scope.value2 = '';
                    scope.value3 = '';
                    scope.value4= '';
                   
                } else {
                    var v=scope.segmentModel.split('.');
                    scope.value1 = v[0];
                    scope.value2 = v[1];
                    scope.value3 = v[2];
                    scope.value4 = v[3];
                }
            });

             scope.inputblur=function(thisvalue){
                (scope.segmentBlur||angular.noop)({$values:scope.segmentModel,$thisvalue:thisvalue});
            }
        }
    }

}
export default {
    name:'zSegmentInput',
    fn:zSegmentInput
};