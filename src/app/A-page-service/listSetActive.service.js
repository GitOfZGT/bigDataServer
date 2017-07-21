//control-backupStrategy.view.html
function setActive($stateParams){
    "ngInject";
    
   return function ($event,thisCtrl){
        var el = $event.currentTarget;
            var elStyle = el.getBoundingClientRect();
            var $par=angular.element(el).parent().parent().parent();
            thisCtrl.pointLeft = elStyle.left + elStyle.width / 2 - $par[0].getBoundingClientRect().left+ 'px';
            $par.find('.active-stragegy').removeClass('active-stragegy');
            angular.element(el).addClass('active-stragegy');
            // $event.stopPropagation();
    }
}
export default {name:'setActive',fn:setActive,method:'factory'};

