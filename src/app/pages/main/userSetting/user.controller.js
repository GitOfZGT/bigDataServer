class ctrl {
    constructor(ApiUser, zAlert, $state, $timeout, $filter, zNotification) {
        'ngInject'
        this._ApiUser = ApiUser;
        this._zAlert = zAlert;
        this._state = $state;
        this._timeout = $timeout;
        this._filter = $filter;
        this._zNotification = zNotification;
        this.AppsList = JSON.parse(sessionStorage.getItem('userData'));
        this.thisUser= JSON.parse(sessionStorage.getItem('thisUser'));
        this.super=this.thisUser.permission.super;
        this.searchWord = '';

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
            keyword: ''
        }
        this.filterApp();
        this.getList();

    }
    getuserData() {
        let staticList = JSON.parse(sessionStorage.getItem('userData'));
      
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
    removeRole(id) {
        var staticList = JSON.parse(sessionStorage.getItem('userData'));
        for (let i = 0; i < staticList.length; i++) {
            if (id == staticList[i].id) {
                staticList.splice(i, 1);
                sessionStorage.setItem('userData', JSON.stringify(staticList));
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
        this.AppsList = staticList;
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