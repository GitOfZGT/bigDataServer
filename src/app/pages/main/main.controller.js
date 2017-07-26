import navlist from './user.nav.view.html';

class Controller {
    constructor($scope, $location, $state, httpServer, iframeWin) {
        "ngInject";

        var thisCtrl = this;
        this._iframeWin = iframeWin;
        let user = JSON.parse(sessionStorage.getItem('thisUser'));
        this.power = user.roleName;
        thisCtrl.navurl = navlist;
        console.log(user.permission)
        let linkdata = [{
                "link": "#/main/apps",
                "name": "应用服务共享中心",
                "icon": "fa-heart-o",
            }, {
                liner: true
            },
            {
                "link": "#/main/myapp",
                "name": "可用的应用服务",
                "icon": "fa-heart-o",
            },
            {
                "link": "#/main/loveapp",
                "name": "收藏的应用服务",
                "icon": "fa-heart-o",
            },
            {
                "link": "#/main/footprint",
                "name": "访问历史",
                "icon": "fa-heart-o",
            }
        ];
        let adds = [];
        if (user.permission.admin&&sessionStorage.getItem('entry')=="admin") {
            this.admin=true;
            if (user.permission.appManage) {
                adds.push({
                    "link": "#/main/appSetting",
                    "name": "应用服务管理",
                    "icon": "fa-heart-o",
                })
            }
            if (user.permission.userManage) {
                adds.push({
                    "link": "#/main/user",
                    "name": "用户管理",
                    "icon": "fa-heart-o",
                })
            }
            if (user.permission.roleManage) {
                adds.push({
                    "link": "#/main/role",
                    "name": "角色管理",
                    "icon": "fa-heart-o",
                })
            }
            if (user.permission.branchManage) {
                adds.push({
                    "link": "#/main/branchSetting",
                    "name": "部门管理",
                    "icon": "fa-heart-o",
                })
            }
            if (adds.length > 0) {
                linkdata.push({
                    liner: true
                })
            }
             thisCtrl.linkdata = adds;
        }else{
            thisCtrl.linkdata=linkdata;
        }
       
    }
    closeIframeWin() {
        this._iframeWin.close();
    }
}

export default Controller;