class zNotification{
    constructor(uiNotification){
        'ngInject'
        this._uiNotification=uiNotification;
        this.options = {
            title: "",
            message: "",
            positionX: "right",
            positionY: "top",
            closeOnClick: true,
            onClose: undefined,
            delay: 3000
        };
    }
    success(msg){
        this.options.message=msg;
        this._uiNotification.success(this.options);
    }
    error(msg){
        this.options.message=msg;
        this._uiNotification.error(this.options);
    }
}

export default {
    name:'zNotification',
    fn:zNotification,
    method:'service'
}