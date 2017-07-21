import templateUrl from './modal.view.html';
function zModal($uiModal){
    "ngInject";
    return function(controller,resolve,okCallback,cancelCallback,size){
         var modalInstance = $uiModal.open({
                templateUrl: templateUrl,
                controller: controller,
                controllerAs:'vm',
                size:size?size:'lg',
                resolve:resolve
            });
 
            modalInstance.result.then(okCallback).catch(cancelCallback);
    }
    
}
export default {name:'zModal',fn:zModal,method:'factory'} ;