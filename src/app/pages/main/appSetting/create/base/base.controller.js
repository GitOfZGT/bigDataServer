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
                urlType: 'Iframe',
                region: this.thisUser.region,
                branch: this.thisUser.branch
            };
        }
       
        if (this.super) {
            var region = JSON.parse(sessionStorage.getItem('region')),
                branch = JSON.parse(sessionStorage.getItem('branch'));
                 region.unshift({ name: '' });
                  branch.unshift({ name: '' });
            this.chosion = {
                region: region,
                branch: branch
            }
        }
        this.btnName = '下一步';

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