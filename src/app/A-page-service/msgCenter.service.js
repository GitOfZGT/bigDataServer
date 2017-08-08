class msgCenter {
    constructor(zNotification,communication) {
        'ngInject'
        this._zNotification = zNotification;
        this._communication = communication;
    }
    getMsgs(){
        let msgs=[];
        let applyMsgs=this._communication.receiveApplyMsg();
        let feedbackMsg=this._communication.receivefeedbackMsg();
         msgs= msgs.concat(applyMsgs,feedbackMsg);
        return msgs;
    }

    removeMsg(item){
        let msgs=this._communication.getfeedbackMsg();
        for(var i=0;msgs.length;i++){
            if(msgs[i].msgid==item.msgid){
               msgs.splice(i,1);
               break; 
            }
        }
        this._communication.setfeedbackMsg(msgs);
    }
}

export default {
    name: 'msgCenter',
    fn: msgCenter,
    method: 'service'
}