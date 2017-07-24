class ctrl {
    constructor(zAlert, $state, $timeout, $filter, zNotification) {
        'ngInject'

        this._zAlert = zAlert;
        this._state = $state;
        this._timeout = $timeout;
        this._filter = $filter;
        this._zNotification = zNotification;
        // this.AppsList = JSON.parse(sessionStorage.getItem('roleData'));
        this.User = JSON.parse(sessionStorage.getItem('thisUser'));
        this.searchWord = '';
        var region = JSON.parse(sessionStorage.getItem('region')),
            branch = JSON.parse(sessionStorage.getItem('branch'));
        region.unshift({ name: '全部', active: true });
        branch.unshift({ name: '全部', active: true });
        this.chosion = {
            region: region,
            branch: branch
        }
        this.headInfo = {
            title: '角色管理',
            btnGroup: [],
            crumbs: [{
                    name: '首页',
                    router: 'pages'
                },
                {
                    name: '角色管理'
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
        this.filterApp();
        this.getList();


    }
    removeRole(id) {
        var staticList = JSON.parse(sessionStorage.getItem('roleData'));
        for (let i = 0; i < staticList.length; i++) {
            if (id == staticList[i].id) {
                staticList.splice(i, 1);
                sessionStorage.setItem('roleData', JSON.stringify(staticList));
                if (this.User.permission.super) {
                    let allrole = JSON.parse(sessionStorage.getItem('allroleData'));
                    for (let i = 0; i < allrole.length; i++) {
                        if (id == allrole[i].id) {
                            allrole.splice(i, 1);
                            sessionStorage.setItem('allroleData', JSON.stringify(allrole));
                            break;
                        }
                    }

                }
                this._zNotification.success("删除成功");
                break;
            }
        }

        this.filterApp();
        this.getList();
    }
    filterApp() {
        this.page.page = 1;
        var staticList = JSON.parse(sessionStorage.getItem('roleData'));
        //关键词过滤
        if (this.filtrate.keyword != '') {
            staticList = this._filter('filter')(staticList, this.filtrate.keyword);
        }
        //超级管理员的权限：
        if (this.User.permission.super) {
            staticList.forEach(function(el) {
                if (el.region == "通用") {
                    el.hideRole = false;
                    // el.enbleRemove = true;
                }
            });
            //过滤地区
            if (this.filtrate.region != "全部") {
                staticList = staticList.filter((el) => {
                    if (el.region == this.filtrate.region || el.region == "通用") {
                        return true;
                    }
                });
            }
            //过滤部门
            if (this.filtrate.branch != "全部") {
                staticList = staticList.filter((el) => {
                    if (el.branch == this.filtrate.branch || el.branch == "通用") {
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
            this.page.total = this.AppsList.length;
        }, 250)


    }
    changePage() {
        this.getList();
    }
}

export default ctrl;