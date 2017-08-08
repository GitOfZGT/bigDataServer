class applyFor{
    constructor($rootScope,zAlert,communication){
        'ngInject'
       this._rootScope=$rootScope;
       this._zAlert=zAlert;
       this._communication=communication;
    }
    applyAlert(item){
        this._zAlert.open({
            title:'<span>确定向</span><span class="text-danger margin-left-5 margin-right-5">'+item.region+'-'+item.branch+'</span><span>申请使用</span><span class="text-danger margin-left-5 margin-right-5">'+item.appname+'</span>',
            action:'确定',
            isHtml:true,
            onAction:()=>{
                this._communication.saveApplyForMsg(item);
            }
        })
    }
}

export default {
    name:'applyFor',
    fn:applyFor,
    method:'service'
}