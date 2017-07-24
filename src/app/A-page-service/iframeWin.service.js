class iframeWin{
    constructor($rootScope){
        'ngInject'
       this._rootScope=$rootScope;
    }
    open(item){
        let iframe=document.querySelector('#iframeWin');
        var thisCtrl=this;
        this._rootScope.iframeLoading=true;
        iframe.onload=()=>{
            
            thisCtrl._rootScope.iframeLoading=false;
        }
        iframe.src=item.url;
        this._rootScope.showIframeWin=true;
        angular.element(document.body).addClass('main-iframe');
    }
    close(){
         document.querySelector('#iframeWin').src='';
        this._rootScope.showIframeWin=false;
        angular.element(document.body).removeClass('main-iframe');
    }
}

export default {
    name:'iframeWin',
    fn:iframeWin,
    method:'service'
}