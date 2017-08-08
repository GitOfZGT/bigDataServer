class communication {
    constructor(zNotification, $filter, approveCenter) {
        'ngInject'
        this._zNotification = zNotification;
        this._approveCenter = approveCenter;
        this._filter = $filter;
    }
    getMsgid() {
        let approve = this._approveCenter.getApproves();
        //唯一id:
        let id = 0;
        if (approve.length > 0) {
            approve.forEach((el) => {
                if (el.msgid > id) {
                    id = el.msgid;
                }
            })
        }
        return id;
    }
    saveApplyForMsg(item) {
        let user = JSON.parse(sessionStorage.getItem('thisUser'));
        let msgs = this.getApplyForMsg();

        //消息数据：
        let apply = {
            msgid: this.getMsgid()+1,
            user,
            app: item,
            type: 'apply',
            createTime: this._filter('date')(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss')
        }
        this._approveCenter.setList(apply); //审批数据添加一条
        msgs.push(apply);
        this.setApplyForMsg(msgs); //申请消息添加一条

        let users = JSON.parse(localStorage.getItem('userData'));
        item.applyStatus = 1; //申请中
        user.applyApp.push(item.id);
        for (var i = 0; users.length; i++) {
            if (users[i].id == user.id) {
                users.splice(i, 1, user);
                break;
            }
        }
        sessionStorage.setItem('thisUser', JSON.stringify(user));
        localStorage.setItem('userData', JSON.stringify(users));
        this._zNotification.success('已提交申请。');
    }
    setApplyForMsg(list) {
        localStorage.setItem('applyForMsg', JSON.stringify(list));
    }
    getApplyForMsg() {
        return JSON.parse(localStorage.getItem('applyForMsg'));
    }
    receiveApplyMsg() {
            let user = JSON.parse(sessionStorage.getItem('thisUser'));
            let msgs = this.getApplyForMsg();
            if (user.permission.approveManage) {
                msgs = msgs.filter((el) => {
                    if (el.app.region == user.region && el.app.branch == user.branch) {
                        return true;
                    }
                });
                console.log(msgs)
                return msgs;
            } else {
                return [];
            }

        }
        //反馈消息
    setfeedbackMsg(list) {
        localStorage.setItem('feedbackMsg', JSON.stringify(list));
    }
    getfeedbackMsg() {
        return JSON.parse(localStorage.getItem('feedbackMsg'));
    }
    savefeedbackMsg(item,action) {
        let msgs = this.getfeedbackMsg();
        //消息数据：
        let apply = {
            msgid: this.getMsgid(),
            user: item.user,
            app: item.app,
            type: 'feedback',
            createTime: this._filter('date')(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss'),
            action
        }
        msgs.push(apply);
        this.setfeedbackMsg(msgs); //反馈消息添加一条
    }
    receivefeedbackMsg() {
        let user = JSON.parse(sessionStorage.getItem('thisUser'));
        let msgs = this.getfeedbackMsg();
        msgs = msgs.filter((el) => {
            if (el.user.id == user.id) {
                return true;
            }
        });
        return msgs;
    }
}

export default {
    name: 'communication',
    fn: communication,
    method: 'service'
}