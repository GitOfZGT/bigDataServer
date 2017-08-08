class ctrl {
    constructor(zAlert, $scope, $state, $timeout, $filter, zNotification, approveCenter, communication) {
        'ngInject'
        this._approveCenter = approveCenter;
        this._communication = communication;
        this._zAlert = zAlert;
        this._state = $state;
        this._timeout = $timeout;
        this._filter = $filter;
        this._zNotification = zNotification;
        this.thisUser = JSON.parse(sessionStorage.getItem('thisUser'));
        this.super = this.thisUser.permission.super;

        this.headInfo = {
            title: '审批中心',
            btnGroup: [],
            crumbs: [{
                    name: '首页',
                    router: 'pages'
                },
                {
                    name: '审批中心'
                }
            ],
            hideBack: true
        }

        this.page = {
            page: 1,
            page_size: 6,
            total: 0
        }
        this.getMsgs();
        this.getList();

    }
    removeMsg(item) {
        //去掉消息
        let msgs = this._communication.getApplyForMsg();
        for (var i = 0; i < msgs.length; i++) {
            if (msgs[i].msgid == item.msgid) {
                msgs.splice(i, 1);
                console.log('消息',msgs[i]);
                break;
            }
        }
        this._communication.setApplyForMsg(msgs);
    }
    addApp(item,isAdd) {
        //用户添加可用应用
        let users = JSON.parse(localStorage.getItem('userData'));

        for (var i = 0; users.length; i++) {
            if (users[i].id == item.user.id) { //申请的用户
                if(isAdd){
                users[i].useApp.push(item.app.id); //添加可用的应用
                }
                users[i].applyApp.splice(users[i].applyApp.indexOf(item.app.id),1);//去掉申请应用
                console.log('申请应用',users[i].applyApp);
                break;
            }
        }
        localStorage.setItem('userData', JSON.stringify(users));
    }
    actionApprove(item) {
        item.approveUser = this.thisUser;
        let list = this._approveCenter.getApproves();
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == item.id) {
                list.splice(i, 1, item);
                break;
            }
        }
        console.log(list);
        this._approveCenter.setApproves(list);
    }
    approve(item) {
        this._zAlert.open({
            title: '',
            action: '批准',
            onAction: () => {
                item.status = 2;
                this.actionApprove(item);
                this.addApp(item,true);
                this.removeMsg(item);
                this._communication.savefeedbackMsg(item,'1');
            }
        })

    }
    refuse(item) {
        this._zAlert.open({
            title: '',
            action: '拒绝',
            onAction: () => {
                item.status = 3;
                this.actionApprove(item);
                this.addApp(item);
                this.removeMsg(item);
                this._communication.savefeedbackMsg(item,'2');
            }
        })
    }
    getMsgs() {
        let list = this._approveCenter.getApproves();
        list = list.filter((el) => {
            if (el.app.region == this.thisUser.region && el.app.branch == this.thisUser.branch) {
                return true;
            }
        });
        this.mylist = list;
    }
    getList() {
        this.msgList = null;
        this._timeout(() => {
            var limit = this.page.page_size, //个数
                begin = this.page.page_size * (this.page.page - 1); //从哪开始
            var result = this._filter('limitTo')(this.mylist, limit, begin);
            this.msgList = result;
            this.page.total = this.mylist.length;
        }, 250)
    }
    changePage() {
        this.getList();
    }

}

export default ctrl;