import './index.scss';
//用于在某个元素打开自定义浮层（菜单等）
function zFloatingLayer($compile, $window, $timeout) {
    "ngInject";
    return {
        restrict: 'A',
        scope: {
            floatLayerOption: '=',//目前参数有template,templateUrl两者选其一，openEvent,默认是click,可以选择hover
            resolve: '='//数据或方法的双向通信
        },
        link(scope, el, attr) {
            var option = scope.floatLayerOption;
            if (!option) { return; }
            if (scope.resolve) {
                angular.forEach(scope.resolve, function (value, key) {
                    scope[key] = value;
                })
            }
            var template = option.template,
                templateUrl = option.templateUrl;
            if (template) {
                scope.hascompile = $compile('<div class="z-float-layer hide"><div class="z-float-layer-body">' + template + '</div></div>')(scope);
            } else if (templateUrl) {
                scope.hascompile = $compile('<div class="z-float-layer hide"><div class="z-float-layer-body" ng-include="\'' + templateUrl + '\'"></div></div>')(scope);
            }
            el.parent().append(scope.hascompile);

            if (!option.openEvent) {
                option.openEvent = 'click';
            }
            var $par = el.parent(), $layer = scope.hascompile;
            var showlayer = () => {
                $layer.removeClass('hide');
                var $layerbody = $layer.children();
                var left = el[0].offsetLeft, top = 0;

                $layerbody.css({ left: left });
                var pos = $layerbody[0].getBoundingClientRect(), ow = $layerbody[0].offsetWidth, oh = $layerbody[0].offsetHeight;
                if (pos.left + ow > document.documentElement.clientWidth) {
                    $layer.children().css({ left: left - ow });
                }
                if (pos.top + oh > document.documentElement.clientHeight) {
                    $layer.children().css({ top: top - oh - el[0].offsetHeight });
                }
            }
            var hidelayer = () => {
                $layer.addClass('hide');
            }

            if (option.openEvent == "hover") {
                var tim = null;
                el.on({
                    'mouseenter': function (event) {
                        $timeout.cancel(tim);
                        showlayer();
                    }, 'mouseleave': function (event) {
                        tim = $timeout(hidelayer, 300);
                    }
                });
                $layer.on({
                    'mouseenter': function (event) {
                        $timeout.cancel(tim);
                    }, 'mouseleave': hidelayer
                })
            }

            el.on(option.openEvent, function (event) {

                if ($layer.hasClass('hide')) {
                    showlayer();
                } else {
                    hidelayer();

                }
                event.stopPropagation();
            })


        }
    }
}
export default {
    name: 'zFloatingLayer',
    fn: zFloatingLayer
};