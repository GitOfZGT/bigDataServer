import templateUrl from './template.view.html';
import './index.scss';
//微调控件
function zSpinner() {
    "ngInject";
    return {
        restrict: "AE",
        templateUrl,
        replace: true,
        scope: {
            spinnerModel: '=?spinnerModel',//双向数据绑定
            spinnerScale: '@spinnerScale',//微调刻度
            maxValue: '@maxValue',//微调最大值
            spinnerChange: '&'//微调值change事件
        },
        link(scope, el, attr) {
            var spinnerScale = scope.spinnerScale ? parseInt(scope.spinnerScale, 10) : 1, maxValue = 0, yu;
            if(!scope.spinnerModel){
                scope.spinnerModel = spinnerScale;
            }else{
                scope.spinnerModel=parseInt(scope.spinnerModel,10);
            }
            
            if (scope.maxValue && (maxValue = parseInt(scope.maxValue, 10), yu = maxValue % spinnerScale, yu > 0)) {

                maxValue -= yu;

            }
            scope.onchange = (value) => {
                (scope.spinnerChange || angular.noop)({ $value: value });
            }
            scope.up = () => {
                if (!(maxValue && scope.spinnerModel >= maxValue)) {

                    scope.spinnerModel += spinnerScale;
                    scope.onchange(scope.spinnerModel);
                }
            }
            scope.down = () => {
                if (scope.spinnerModel > spinnerScale)
                    scope.spinnerModel -= spinnerScale;
                scope.onchange(scope.spinnerModel);
            }
            
            scope.spinnerFocus = () => {
                el.data('oldvalue',scope.spinnerModel);
            }
            scope.spinnerBlur = () => {
                if (maxValue && scope.spinnerModel > maxValue) {

                    scope.spinnerModel = maxValue;
                } else if ((yu = scope.spinnerModel % spinnerScale) > 0) {
                    scope.spinnerModel -= yu;
                }
                if(el.data('oldvalue')!=scope.spinnerModel){
                     scope.onchange(scope.spinnerModel);
                }
            }
        }
    }

}
export default {
    name: 'zSpinner',
    fn: zSpinner
};