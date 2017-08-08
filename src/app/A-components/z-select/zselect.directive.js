import templateUrl from './template.view.html';
import './index.scss';
//select控件
function zSelect($timeout, easingMap) {
    "ngInject";
    return {
        restrict: "AE",
        templateUrl,
        replace: true,
        scope: {
            selectListData: '=', //数据模板：[{name:"全部",value:"1"},{name:"状态1",value:"2"}]
            selectModel: '=', //value存在等到的是value,否者是name
            selectCallback: '&' //选中后的事件
        },
        link(scope, el, attr) {
            scope.type = attr.type; //目前可设置"type-1"
            scope.placeholder = attr.placeholder; //当要设置placeholder时，在数据结构中添加一个空值：{name:""}
            if (scope.selectListData&&scope.selectListData.length>0) {
                if (scope.selectModel) {
                    var hasItem = scope.selectListData.find(function(item, index, arr) {
                        return item.name == scope.selectModel || item.value == scope.selectModel;
                    });
                    if (hasItem) {
                        scope.selectName = hasItem.name;
                        scope.selectValue = hasItem.value;
                    }

                } else {
                    scope.selectName = scope.selectListData[0].name;
                }
            }
            scope.$watch(()=>scope.selectModel,(o,n)=>{
                    $timeout(()=>{
                         scope.selectName = scope.selectModel;
                    })
                    
            })
            if (scope.selectListData.length>0&&scope.selectListData[0].name == '') {
                scope.selectListData.unshift();
            }
            scope.openSelect = () => {
                if (el.hasClass('focus')) {
                    el.removeClass('focus');
                } else {
                    el.find('input').focus();
                }
            }
            scope.focus = (event) => {

                el.addClass('focus');
                var $list = el.find('.z-select-list');
                var pos = el[0].getBoundingClientRect();
                var domH = document.documentElement.clientHeight;
                var yh = domH - pos.top - el.height();
                if (yh > domH / 2) {
                    $list.css({ 'max-height': yh });
                }else{
                    $list.css({ 'max-height':domH / 2 });
                }
                // if (yh < $list.outerHeight()) {

                //     $list.css({ bottom: el.height() });
                // } else {
                //     $list.css({ bottom: 'auto' });
                // }
                var mt = $list.css('margin-top');
                $list.css({ 'margin-top': parseInt(mt) - 10, opacity: 0 }).velocity({ 'margin-top': mt, opacity: 1 }, 150, easingMap.easeOutCubic);
                event.stopPropagation();
            }
            scope.blur = () => {
                scope.timer = $timeout(() => {
                    el.removeClass('focus');
                }, 100)

                event.stopPropagation();
            }
            scope.opendown = scope.selctdown = (event) => {
                $timeout(() => {
                    $timeout.cancel(scope.timer);
                });
                event.stopPropagation();
            }
            scope.selected = (item, event) => {

                scope.selectName = item.name;
                scope.selectValue = item.value;
                if (angular.isDefined(item.value)) {
                    scope.selectModel = item.value;
                } else {
                    scope.selectModel = item.name;
                }
                (scope.selectCallback || angular.noop)();
                el.removeClass('focus');
                if (event)
                    event.stopPropagation();
            }

        }
    }

}
export default {
    name: 'zSelect',
    fn: zSelect
};