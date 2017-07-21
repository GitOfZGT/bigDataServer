import imgsrc from '../../images/registerbg.png';
class Controller {
    constructor($state, $scope, httpServer) {
        "ngInject";
        var thisCtrl = this;
        this._state = $state;
        this.bg = {
            login: imgsrc
        }
        thisCtrl.logindata = {};
        thisCtrl.registerdata = {};
        thisCtrl.loginReset = () => {
            thisCtrl.logindata.username = '';
            thisCtrl.logindata.password = '';
        }
        thisCtrl.registerReset = () => {
            thisCtrl.registerdata.username = '';
            thisCtrl.registerdata.password1 = '';
            thisCtrl.registerdata.password2 = '';
            thisCtrl.registerdata.email = '';
            thisCtrl.registerdata.mobile = '';
        }
        this.superRole = {
            "id": 1,
            "roleName": "超级管理员",
            "permission": {
                "appManage": true,
                "userManage": true,
                "roleManage": true,
                "super": true,
                "admin": true
            },
            "enbleRemove": false
        };
    }
    login() {
        let users = JSON.parse(sessionStorage.getItem('userData'));
        for (var i = 0; i < users.length; i++) {
            var el = users[i];
            if (el.userName == this.logindata.username && el.password == this.logindata.password) {
                //当前用户获取对应权限
                var roles = JSON.parse(sessionStorage.getItem('allroleData'));
                var thisBranchRole = [];
                if (el.roleName == '超级管理员') {
                    el.permission = this.superRole.permission;
                    roles.shift();
                    sessionStorage.setItem('roleData', JSON.stringify(roles));
                } else {
                    for (var j = 0; j < roles.length; j++) {
                        if ((roles[j].region == undefined && roles[j].branch == undefined && el.roleName == roles[j].roleName) || (el.region == roles[j].region && el.branch == roles[j].branch && el.roleName == roles[j].roleName)) {
                            el.permission = roles[j].permission;
                            break;
                        }

                        if (el.region == roles[j].region && el.branch == roles[j].branch) {
                            thisBranchRole.push(roles[j]);
                        }
                        thisBranchRole = roles.slice(1, 3).concat(thisBranchRole);
                        sessionStorage.setItem('roleData', JSON.stringify(thisBranchRole));
                    }
                }
                sessionStorage.setItem('thisUser', JSON.stringify(el));
                this._state.go('pages');
                break;
            } else {
                this.loginerror = true;
            }
        }

    }
    register() {

    }
    focus() {
        this.loginerror = false;
    }
}

export default Controller;