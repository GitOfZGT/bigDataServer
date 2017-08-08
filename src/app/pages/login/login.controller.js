// import imgsrc from '../../images/registerbg.png';

class Controller {;
    constructor($state, $scope,$interval,$stateParams,iframeWin) {
        "ngInject";
       $interval.cancel($scope.$root.msgIterval);
       iframeWin.close();
        var thisCtrl = this;
        this._state = $state;
        this._stateParams=$stateParams;
        let rootCanvas= document.getElementById('rootCanvas');
      
        // this.bg = {
        //     login: imgsrc
        // }
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
        sessionStorage.setItem('entry',this._stateParams.entry)
       this.admin='';
       if(this._stateParams.entry=='admin'){
           this.admin='(后台管理)';

       }
    }
    login() {
        let users = JSON.parse(localStorage.getItem('userData'));
        for (var i = 0; i < users.length; i++) {
            var el = users[i];
            if (el.userName == this.logindata.username && el.password == this.logindata.password) {
                //当前用户获取对应权限
                var roles = JSON.parse(localStorage.getItem('roleData'));
                if (el.roleName == '超级管理员') {
                    let superRole=JSON.parse(localStorage.getItem('superRole'));
                    el.permission = superRole[0].permission;
                } else {
                    for (var j = 0; j < roles.length; j++) {
                        if ((roles[j].region == '通用' && roles[j].branch == '通用' && el.roleName == roles[j].roleName) || (el.region == roles[j].region && el.branch == roles[j].branch && el.roleName == roles[j].roleName)) {
                            el.permission = roles[j].permission;
                            break;
                        }
                    }
                }
                //如果是后台管理页面，没有管理权限，就当用户不存在
                if(this._stateParams.entry=='admin'&&!el.permission.admin){
                    this.errorName='此用户无管理权限。'
                    this.loginerror = true;
                    break;
                }
                var mainChild='myapp';
                if(this._stateParams.entry=='admin'){
                    mainChild='appSetting';
                }
                
                sessionStorage.setItem('thisUser', JSON.stringify(el));
                console.log(el)
                this._state.go('pages.'+mainChild,{entry:this._stateParams.entry});
                break;
            } else {
                this.errorName='用户名或密码不正确。'
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