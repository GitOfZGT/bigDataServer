
function zFlipChild($timeout) {
    "ngInject";
    return {
        restrict: 'A',
        require:'^?zFlipOver',
        link(scope, el, attr,parCtrl) {
            if(scope.$index==0){
                $timeout(function(){
                    el.children().click();
                });
            }
            if(scope.$last){
                parCtrl.setpositions();
            }
        }
    }
}
export default {
    name: 'zFlipChild',
    fn: zFlipChild
};