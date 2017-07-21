import './index.scss';
//看control-backupStrategy.view.html
function zFlipOver($compile) {
    "ngInject";
    return {
        restrict: 'A',
        scope: {
            clickTag:'@'
        },
        controller($scope){
            "ngInject";
            this.setpositions=()=>{
                var lw = 20, el=this.el,
                pl = 15,
                _paddingclass = 'padding-left-' + pl;
            var $ul = el.find('.z-flip-wrap');
            var count = $ul.css('z-index');
            var $li = el.find('.z-flip-el').addClass(_paddingclass);
            var _width = el.width();
            var _pages = Math.ceil($li.length / count);
            if ($li.length > count) {
                var _context = $compile('<div ng-click="downOne()" class="z-flip-left" style="z-index:' + count + 1 + ';width:' + lw + 'px;"><i class="fa fa-angle-double-left" style="width:'+lw+'px;"></i></div><div ng-click="upOne()" class="z-flip-right" style="z-index:' + count + 1 + ';width:' + lw + 'px;"><i class="fa fa-angle-double-right" style="width:'+lw+'px;"></i></div>')($scope);
                el.append(_context);
                _width = _width - (lw + pl) * 2;
                $ul.css({ left: (lw + pl) });
            }
            var _a_page = 1;
            $scope.upOne = () => {
                if (_a_page < _pages) {
                    var _left = parseInt($ul.css('left'));
                    _left = _left - _width - pl;
                    $ul.velocity({ left: _left }, 700, 'easeOutQuad');
                    _a_page++;
                }

            }
            $scope.downOne = () => {
                if (_a_page > 1) {
                    var _left = parseInt($ul.css('left'));
                    _left = _left + _width + pl;
                    $ul.velocity({ left: _left }, 700, 'easeOutQuad');
                    _a_page--;
                }

            }
            $li.eq(0).removeClass(_paddingclass);
            $li.css({ width: _width / count });
            }
            $scope.getEl=(el)=>{
                this.el=el;
            }
        },
        compile(scope,attrl){
            return{
                pre(scope, el, attr){
                    console.log(el);
                },
                post(scope, el, attr){
                    console.log(el);
                    scope.getEl(el);
                }
            }
        }
    }
}
export default {
    name: 'zFlipOver',
    fn: zFlipOver
};