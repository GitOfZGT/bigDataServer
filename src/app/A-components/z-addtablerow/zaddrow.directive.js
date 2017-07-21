//table中点击当前行，展开详细内容
function zAddRow($compile) {
    "ngInject";
    return {
        restrict: 'A',
        require: '^^getTable',
        compile(scope, attr) {
            return {
                pre(scope, el, attr, pctrl) {

                },
                post(scope, el, attr, pctrl) {
                    var len = pctrl.el.find('thead>tr>th').length;
                    var contxt = $compile('<tr class="details"><td colspan="' + len + '" ng-include="\'' + attr.comtentUrl + '\'"></td></tr>')(scope);
                    scope.isopened = false;
                    el.on('click', function(event) {
                        if (scope.isopened) {

                            var $addtr = el.parent().parent().next();
                            if ($addtr.hasClass('details')) {
                                $addtr.addClass('hide');
                                scope.isopened = false;
                                scope.$apply('');
                            }

                        } else {
                            if (el.data('hasAdd')) {
                                el.parent().parent().next().removeClass('hide');
                            } else {
                                contxt.insertAfter(el.parent().parent());
                                el.data('hasAdd', 1);
                            }
                            scope.isopened = true;
                            scope.$apply('');
                        }
                        event.stopPropagation();
                    })
                }
            }
        }
        // link(scope, el, attr, pctrl) {


        // }
    }
}
export default {
    name: 'zAddRow',
    fn: zAddRow
};