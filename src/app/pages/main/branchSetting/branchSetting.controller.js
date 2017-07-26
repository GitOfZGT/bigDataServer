class ctrl {
    constructor(zAlert, $state, $timeout, $filter, zNotification) {
        'ngInject'

        this._zAlert = zAlert;
        this._state = $state;
        this._timeout = $timeout;
        this._filter = $filter;
        this._zNotification = zNotification;
        // this.AppsList = JSON.parse(localStorage.getItem('userData'));
        this.thisUser = JSON.parse(sessionStorage.getItem('thisUser'));
        this.super = this.thisUser.permission.super;
        this.searchWord = '';
        this.region = JSON.parse(localStorage.getItem('region'));


        this.chosion = {
            region: this.region,
            branch: []
        }
        this.headInfo = {
            title: '部门管理',
            btnGroup: [],
            crumbs: [{
                    name: '首页',
                    router: 'pages'
                },
                {
                    name: '部门管理'
                }
            ],
            hideBack: true
        }

        this.page = {
            page: 1,
            page_size: 6,
            total: 0
        }

        //筛选项：
        this.filtrate = {
            keyword: '',
            region: '',
            branch: '',
        }
        this.addData = {
            branch: ''
        }
        this.selectRegion('region', this.region[0]);
    }
    getBranch() {
        let branch = JSON.parse(localStorage.getItem('branch'));
        branch = branch.filter((el) => {
            if (this.filtrate.region == el.region) {
                return true;
            }
        })
      
        this.chosion.branch = branch;
        this.selectBranch('branch', branch[0]);
    }
    selectRegion(key, item) {
        this.setSeartionActive(key, item);
        this.filtrate.region = item.name;
        this.getBranch();

    }
    selectBranch(key, item) {
        this.setSeartionActive(key, item);
        this.filtrate.branch = item.name;

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
    addBranch() {
        this.showAdd = !this.showAdd;
    }
    add() {
        let branch = JSON.parse(localStorage.getItem('branch'));
        branch.push({
            name: this.addData.branch,
            region: this.filtrate.region
        });
        localStorage.setItem('branch', JSON.stringify(branch));
        this.showAdd = false;
        this.getBranch();
        this._zNotification.success('添加成功')
    }
    removeBranch(item) {
        this._zAlert.open({
            title: '这个部门吗',
            action: '删除',
            onAction: () => {
                let branch = JSON.parse(localStorage.getItem('branch'));
                for (var i = 0; i < branch.length; i++) {
                    if (item.name == branch[i].name && item.region == this.filtrate.region) {
                        branch.splice(i, 1);
                        this._zNotification.success('删除成功');
                        localStorage.setItem('branch', JSON.stringify(branch));
                        this.getBranch();
                        break;
                    }
                }
            }
        })
    }
}

export default ctrl;