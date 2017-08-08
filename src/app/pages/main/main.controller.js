import navlist from './user.nav.view.html';
import msgHtml from './msg.list.view.html';

class Controller {
    constructor($scope, $location,$interval, $state, iframeWin, msgCenter,appDetails) {
        "ngInject";

        var thisCtrl = this;
        this._iframeWin = iframeWin;
         this._appDetails=appDetails;
         this.appDetailInfo=this._appDetails.detailInfo;
        let user = JSON.parse(sessionStorage.getItem('thisUser'));
        this.power = user.roleName;
        this.navurl = navlist;
        this.msgHtml=msgHtml;
        // console.log(user.permission)
        let linkdata = [{
                "link": "#/main/apps",
                "name": "应用服务共享中心",
                "icon": "fa-ticket",
            }, {
                liner: true
            },
            {
                "link": "#/main/myapp",
                "name": "可用的应用服务",
                "icon": "fa-life-ring",
            },
            {
                "link": "#/main/loveapp",
                "name": "收藏的应用服务",
                "icon": "fa-heart-o",
            },
            {
                "link": "#/main/footprint",
                "name": "访问历史",
                "icon": "fa-paw",
            }
        ];
        this.admin = "大数据应用服务框架";
        let adds = [];
        if (user.permission.admin && sessionStorage.getItem('entry') == "admin") {
            this.admin = "大数据应用服务框架(后台管理)";
            if (user.permission.appManage) {
                adds.push({
                    "link": "#/main/appSetting",
                    "name": "应用服务管理",
                    "icon": "fa-ticket",
                })
            }
            if (user.permission.userManage) {
                adds.push({
                    "link": "#/main/user",
                    "name": "用户管理",
                    "icon": "fa-user-circle-o",
                })
            }
            if (user.permission.roleManage) {
                adds.push({
                    "link": "#/main/role",
                    "name": "角色管理",
                    "icon": "fa-user-secret",
                })
            }
            if (user.permission.branchManage) {
                adds.push({
                    "link": "#/main/branchSetting",
                    "name": "部门管理",
                    "icon": "fa-street-view",
                })
            }
            if (user.permission.approveManage) {
                adds.push({
                    "link": "#/main/approveCenter",
                    "name": "审批中心",
                    "icon": "fa-sun-o",
                })
            }
            if (adds.length > 0) {
                linkdata.push({
                    liner: true
                })
            }
            thisCtrl.linkdata = adds;
        } else {
            thisCtrl.linkdata = linkdata;
        }
        //消息
        let getLen = () => {
            $scope.$root.myMsgs= msgCenter.getMsgs();
            let len =$scope.$root.myMsgs.length;
            if (len > 0) {
                this.msgLen = len;
            } else {
                this.msgLen = null;
            }
            console.log('消息数',len)
        }
        getLen();

      $scope.$root.msgIterval= $interval(getLen,5000);//每隔5秒获取一次消息

    }
    closeIframeWin() {
        this._iframeWin.close();
    }
    closeAppDetail(){
        this._appDetails.close();
    }
}

export default Controller;