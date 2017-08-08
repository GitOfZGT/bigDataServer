class Alert{
    constructor(alert,$modalInstance){
        'ngInject'
        this._modalInstance=$modalInstance;
        this.title=alert.title;
        this.isHtml=alert.isHtml;
        this.action=alert.action;
    }
    ok(){
        this._modalInstance.close();
    }
    cancel(){
        this._modalInstance.dismiss();
    }
}

export default Alert;