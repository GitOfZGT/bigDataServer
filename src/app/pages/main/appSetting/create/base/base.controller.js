class ctrl {
    constructor($scope, $state, $timeout) {
        'ngInject'
        this._state = $state;
        this._timeout = $timeout;
        this._parScope = $scope.$parent;
        this._parScope.vm.step = 1;

        this.thisUser = JSON.parse(sessionStorage.getItem('thisUser'));
        this.super = this.thisUser.permission.super;
        if (this._parScope.app) {
            this.app = this._parScope.app;
        } else {
            this.app = {
                openType: 'iframe',
                region: this.thisUser.region,
                branch: this.thisUser.branch
            };
        }

        if (this.super) {
            //地区选择框
            this.region = JSON.parse(localStorage.getItem('region'));
            this.app.region='';
            this.app.branch='';
            this.region.unshift({ name: '' })
            this.regionSelectList = this.region;
            this.branchSelectList = [{ name: "" }];
            this.getBranch();
        }
        this.btnName = '下一步';

    }
     getBranch() {
        this._timeout(() => {
            let branch = JSON.parse(localStorage.getItem('branch'));
            branch = branch.filter((el) => {
                if (this.app.region == el.region) {
                    return true;
                }
            })
            if (branch.length > 0)
                this.app.branch = '';
            this.branchSelectList = branch;
        })

    }
    next() {
        this.btnLoading = true;
        this._timeout(() => {

            this._parScope.app = this.app;
            this._state.go('pages.appcreate.seting');
            this.btnLoading = false;
        }, 200)

    }
}

export default ctrl;