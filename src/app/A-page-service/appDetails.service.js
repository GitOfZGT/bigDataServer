class appDetails{
    constructor($rootScope,zAlert,communication){
        'ngInject'
       this._rootScope=$rootScope;
       this._zAlert=zAlert;
       this._communication=communication;

       this.detailInfo={item:null};
       angular.element(document.body).on('click',this.close);
    }
    open(item){
        this.detailInfo.item=item;
        var dom=document.querySelector('#maInAside');
        dom.onclick=function(event){
            event.stopPropagation();
        }
        angular.element(dom).addClass('open');
    }
    close(){
        var dom=document.querySelector('#maInAside');
        angular.element(dom).removeClass('open');
    }
}

export default {
    name:'appDetails',
    fn:appDetails,
    method:'service'
}