import navlist from './user.nav.view.html';

class Controller {
    constructor($scope, $location, $state, httpServer,iframeWin) {
        "ngInject";

        var thisCtrl = this;
        this._iframeWin=iframeWin;
        let user = JSON.parse(sessionStorage.getItem('thisUser'));
        this.power=user.roleName;
        thisCtrl.navurl = navlist;
        console.log(user.permission)
        let linkdata = [{
                "link": "#/main/apps",
                "name": "应用服务共享中心",
                "icon": "fa-cubes",
            }, {
                liner: true
            },
            {
                "link": "#/main/myapp",
                "name": "我的应用",
                "icon": "fa-heart-o",
            },
            {
                "link": "#/main/loveapp",
                "name": "我的收藏",
                "icon": "fa-heart-o",
            },
            {
                "link": "#/main/footprint",
                "name": "我的足迹",
                "icon": "fa-cubes",
            }
        ];
        let adds = [];
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
        if (adds.length > 0) {
            linkdata.push({
                liner: true
            })
        }

        thisCtrl.linkdata=linkdata.concat(adds);
    }
    closeIframeWin(){
        this._iframeWin.close();
    }
}

export default Controller;