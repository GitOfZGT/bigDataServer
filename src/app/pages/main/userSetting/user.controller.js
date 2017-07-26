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
            // branch = JSON.parse(localStorage.getItem('branch')),
            // use = JSON.parse(localStorage.getItem('use'));
        this.region.unshift({ name: '全部', active: true });
        // branch.unshift({ name: '全部', active: true });
        // use.unshift({ name: '全部', active: true });
        this.chosion = {
            region: this.region,
            branch: []
        }
        this.headInfo = {
            title: '用户管理',
            btnGroup: [],
            crumbs: [{
                    name: '首页',
                    router: 'pages'
                },
                {
                    name: '用户管理'
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
            region: '全部',
            branch: '全部',
        }
          this.selectRegion('region', this.region[0]);
        this.filterApp();
        this.getList();

    }
    getBranch() {
        let branch = JSON.parse(localStorage.getItem('branch'));
        branch = branch.filter((el) => {
            if (this.filtrate.region == el.region) {
                return true;
            }
        })
        branch.unshift({ name: '全部'});
        this.chosion.branch = branch;
         this.selectBranch('branch', branch[0]);
    }
    getuserData() {
        let staticList = JSON.parse(localStorage.getItem('userData'));

        if (this.super) { //超级管理员
            for (let i = 0; i < staticList.length; i++) {
                if (this.thisUser.id == staticList[i].id) {
                    staticList.splice(i, 1);
                    break;
                }
            }
        } else {
            staticList = staticList.filter((el) => {
                if (el.region == this.thisUser.region && el.branch == this.thisUser.branch && el.id != this.thisUser.id) {
                    return true;
                }
            });
        }

        return staticList;
    }
    removeuser(id) {
        var staticList = JSON.parse(localStorage.getItem('userData'));
        for (let i = 0; i < staticList.length; i++) {
            if (id == staticList[i].id) {
                staticList.splice(i, 1);
                localStorage.setItem('userData', JSON.stringify(staticList));
                this._zNotification.success("删除成功");
                break;
            }
        }
        this.filterApp();
        this.getList();
    }
    filterApp() {
        this.page.page = 1;
        var staticList = this.getuserData();
        //关键词过滤
        if (this.filtrate.keyword != '') {
            staticList = this._filter('filter')(staticList, this.filtrate.keyword);
        }
        //超级管理员的权限：
        if (this.super) {
            //过滤地区
            if (this.filtrate.region != "全部") {
                staticList = staticList.filter((el) => {
                    if (el.region == this.filtrate.region) {
                        return true;
                    }
                });
            }
            //过滤部门
            if (this.filtrate.branch != "全部") {
                staticList = staticList.filter((el) => {
                    if (el.branch == this.filtrate.branch) {
                        return true;
                    }
                });
            }
        }
        this.AppsList = staticList;
    }
    selectRegion(key, item) {
        this.setSeartionActive(key, item);
        this.filtrate.region = item.name;
        this.getBranch();
        this.filterApp();
        this.getList();
    }
    selectBranch(key, item) {
        this.setSeartionActive(key, item);
        this.filtrate.branch = item.name;

        this.filterApp();
        this.getList();
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
    keywordClose() {
        this.searchWord = '';
        this.filtrate.keyword = '';
        this.filterApp();
        this.getList();
    }
    search() {
        this.filtrate.keyword = this.searchWord;
        this.filterApp();
        this.getList();

    }
    getList() {
        this.usersList = null;
        this._timeout(() => {
            var limit = this.page.page_size, //个数
                begin = this.page.page_size * (this.page.page - 1); //从哪开始
            var result = this._filter('limitTo')(this.AppsList, limit, begin);
            this.usersList = result;
            // console.log(this.usersList)
            this.page.total = this.AppsList.length;
        }, 250)


    }
    changePage() {
        this.getList();
    }
}

export default ctrl;