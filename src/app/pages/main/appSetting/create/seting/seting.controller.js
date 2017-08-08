class ctrl {
    constructor($scope, $filter,$state,zNotification) {
        'ngInject'
        this._scope = $scope;
        this._filter = $filter;
        this._zNotification = zNotification;
        $scope.$parent.vm.step = 2;
        this.app = $scope.$parent.app;
        if(!this.app){
            $state.go('pages.appcreate.base');
            return;
        }
        this.setting = '1';
        this.region = JSON.parse(localStorage.getItem('region'));
        this.User = JSON.parse(sessionStorage.getItem('thisUser'));
        // region.unshift({ name: '全部', active: true });
        // branch.unshift({ name: '全部', active: true });
        this.chosion = {
            region: this.region,
            branch: [],
            hasSelet: []
        }
        this.btnName = '应用接入';
        this.filterWord = {
            region: ''
        }
        this.selectRegion('region',this.region[0]);
    }
     getBranch() {
        let branch = JSON.parse(localStorage.getItem('branch'));
        branch = branch.filter((el) => {
            if (this.filterWord.region == el.region&&!(this.User.region==el.region&&this.User.branch==el.name)) {
                return true;
            }
        })
        angular.forEach(branch, (el) => {
            el.checked = false;
            for (var i = 0; i < this.chosion.hasSelet.length; i++) {
                if (this.chosion.hasSelet[i].region == this.filterWord.region && this.chosion.hasSelet[i].branch == el.name) {
                    el.checked = true;
                    break;
                }
            }
        })
        this.chosion.branch = branch;
        // this.selectBranch('branch', branch[0]);
    }
    seted(value) {
        if (value == '1') {
            this.selectting = false;
        } else if (value = '2') {
            this.selectting = true;
        }
    }

    removeBranch(item) {
        for (let i = 0; i < this.chosion.hasSelet.length; i++) {
            if (this.chosion.hasSelet[i].region == item.region && this.chosion.hasSelet[i].branch == item.branch) {
                this.chosion.hasSelet.splice(i, 1);
                break;
            }
        }
        if (item.region == this.filterWord.region) {
            for (var i = 0; i < this.chosion.branch.length; i++) {
                if (this.chosion.branch[i].name == item.branch) {
                    this.chosion.branch[i].checked = false;
                    break;
                }
            }
        }
    }
    selectRegion(key, item) {
        this.setSeartionActive(key, item);
        this.filterWord.region = item.name;
        this.getBranch();
    }
    selectBranch(checked, item) {
        if (checked) {
            this.chosion.hasSelet.push({
                region: this.filterWord.region,
                branch: item.name
            })
        } else {

            for (let i = 0; i < this.chosion.hasSelet.length; i++) {
                if (this.chosion.hasSelet[i].region == this.filterWord.region && this.chosion.hasSelet[i].branch == item.name) {
                    this.chosion.hasSelet.splice(i, 1);
                    break;
                }
            }
        }

    }
    setSeartionActive(key, item) {
        for (let i = 0; i < this.chosion[key].length; i++) {
            if (this.chosion[key][i].active) {
                this.chosion[key][i].active = false;
                break;
            }
        }
        item.active = true;
    }
    create() {
        if(this.btnLoading)return;
        this.btnLoading = true;
        setTimeout(() => {
            var apps = JSON.parse(localStorage.getItem('appList'));
            var id=0;
            if(apps.length>0)
            apps.forEach((el)=>{
                if(el.id>id){
                    id=el.id;
                }
            });
            var capp = {
                id,
                createTime: this._filter('date')(new Date().getTime(), 'yyyy-MM-dd'),
                use: '用途1',
                region: this.app.region,
                branch: this.app.branch,
                appname: this.app.appName,
                dict: this.app.dict,
                url:this.app.url,
                hasLove: false,
                enabled: false,
               openType:this.app.openType
            }
            if(this.setting==2){
                 capp.openBranch= this.chosion.hasSelet;
            }
            this.User.useApp.push(id);
            var users=JSON.parse(localStorage.getItem('userData'));
            for(var i=0;i<users.length;i++){
                if(this.User.id==users[i].id){
                    users.splice(i,1,this.User);
                    break;
                }
            }
            localStorage.setItem('userData', JSON.stringify(users));
            apps.unshift(capp);
            localStorage.setItem('appList', JSON.stringify(apps));
            this.btnLoading = false;
            this._zNotification.success("应用进入成功");
        }, 250)

    }
}

export default ctrl;