class ctrl {
    constructor(zAlert,$scope, $state, $timeout, $filter, zNotification,msgCenter) {
        'ngInject'

        this._zAlert = zAlert;
        this._state = $state;
        this._timeout = $timeout;
        this._filter = $filter;
        this._msgCenter=msgCenter;
        this._zNotification = zNotification;
        this.thisUser = JSON.parse(sessionStorage.getItem('thisUser'));
        this.super = this.thisUser.permission.super;

        this.headInfo = {
            title: '消息中心',
            btnGroup: [],
            crumbs: [{
                    name: '首页',
                    router: 'pages'
                },
                {
                    name: '消息中心'
                }
            ],
            hideBack: false
        }

        this.page = {
            page: 1,
            page_size: 6,
            total: 0
        }
        this.msgList=$scope.$root.myMsgs;
        $scope.$watch(()=>$scope.$root.myMsgs,(o,n)=>{
            this.msgList=$scope.$root.myMsgs;
        })
    }
  hasRead(item){
        item.hasRead=true;
        this._msgCenter.removeMsg(item);
  }
}

export default ctrl;