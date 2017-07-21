import './index.scss';
//可手动调节宽度的table
function zTableResize($timeout) {
    "ngInject";
    return {
        restrict: 'A',

        link(scope, el, attr) {
            $timeout(() => {
                var $th = el.find('thead>tr>th'),
                    count = [];
                var setWidths = (notadd) => {

                    var pw = el.parent().width();
                    el.css({ width: pw });


                    angular.forEach($th, (item, index) => {
                        var thw = $th.eq(index)[0].style.width;
                        if (thw) {
                            count.push(index);
                            pw = pw - parseInt(thw, 10);

                        }
                        if (notadd) {
                            return;
                        }
                        if (index != $th.length - 1) {
                            $th.eq(index).append('<div class="table-th-line"></div>');
                        }
                    });
                    var onew = pw / ($th.length - count.length);
                    angular.forEach($th, (item, index) => {
                        if (count.indexOf(index) > -1) { return; }
                        $th.eq(index).css({ width: onew });
                    });
                }
                setWidths();
              
                $th.on({
                    'mouseenter': function() {
                        var $thisth = angular.element(this).addClass('border-right');
                        var $trs = el.find('tbody>tr');
                        for (var i = 0; i < $trs.length; i++) {
                            $trs.eq(i).find('td').eq($th.index($thisth)).addClass('border-right');
                        }
                    },
                    'mouseleave': function() {
                        var $thisth = angular.element(this).removeClass('border-right');
                        var $trs = el.find('tbody>tr');
                        for (var i = 0; i < $trs.length; i++) {
                            $trs.eq(i).find('td').eq($th.index($thisth)).removeClass('border-right');
                        }

                    }
                });
                var oldx = 0,
                    $mouseth = null;
                var mousemoveFn = function(event) {
                    var offsetw = oldx - event.clientX;
                    el.css({ width: parseInt(el[0].style.width) - offsetw });
                    var neww = parseInt($mouseth[0].style.width) - offsetw
                    $mouseth.css({ width: neww });

                    oldx = event.clientX;
                }
                $th.on({
                    'mousedown': function(event) {
                        oldx = event.clientX;
                        var $this = angular.element(this);
                        $mouseth = $this.parent();
                        angular.element(document).on({
                            'mousemove': mousemoveFn
                        });
                    },
                    'mouseup': function(event) {
                        angular.element(document).off('mousemove', mousemoveFn);
                    }
                }, '.table-th-line');
                var mouseUpFn = function(event) {
                    angular.element(document).off('mousemove', mousemoveFn);
                }
                angular.element(document).off('mouseup', mouseUpFn).on({
                    'mouseup': mouseUpFn
                });
            })
        }
    }
}
export default {
    name: 'zTableResize',
    fn: zTableResize
};